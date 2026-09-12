import type {
  CompetencyAssessment,
  CompetencyStatusLevel,
  EvidenceKind,
  EvidenceReadinessSnapshot,
} from '../types/competency';
import type { EvidenceItem, EvidenceType } from '../types/evidence';

export interface GapMapImprovement {
  skill: string;
  from: CompetencyStatusLevel;
  to: CompetencyStatusLevel;
}

export interface DemoGapMapResult {
  gapMap: CompetencyAssessment[];
  improvements: GapMapImprovement[];
}

const RULE_EXPLANATION =
  'In the real product, this would require AI review and source verification.';

const PROJECT_LIKE_TYPES: EvidenceType[] = ['Project', 'Coursework', 'Internship output'];

function evidenceKindFromType(type: EvidenceType): EvidenceKind {
  switch (type) {
    case 'Project':
      return 'project';
    case 'Coursework':
      return 'coursework';
    case 'Presentation':
      return 'presentation';
    case 'Certificate':
      return 'certificate';
    case 'Internship output':
      return 'internship';
    default:
      return 'other';
  }
}

function mentionsAny(item: EvidenceItem, keywords: string[]): boolean {
  return item.demonstrates.some((skill) =>
    keywords.some((keyword) => skill.toLowerCase().includes(keyword)),
  );
}

function findCompetency(gapMap: CompetencyAssessment[], skillName: string) {
  return gapMap.find((c) => c.skill.toLowerCase() === skillName.toLowerCase());
}

/**
 * Derives a demo Gap Map from a fixed base and the student's current evidence.
 *
 * Only local evidence (added by the student in this session) can move a
 * competency, and only from Missing/Weak up to Moderate — never to Strong.
 * This is a transparent, rule-based stand-in for real AI evidence analysis.
 */
export function buildDemoGapMap(
  base: CompetencyAssessment[],
  evidenceItems: EvidenceItem[],
): DemoGapMapResult {
  const gapMap = base.map((competency) => ({ ...competency }));
  const improvements: GapMapImprovement[] = [];
  const localItems = evidenceItems.filter((item) => item.origin === 'local');

  const upgradeToModerate = (skillName: string, item: EvidenceItem, reason: string) => {
    const competency = findCompetency(gapMap, skillName);
    if (!competency) return;
    // Rule 5: local demo text can only lift Missing/Weak up to Moderate — never to Strong,
    // and never re-lower or repeat an improvement that already happened.
    if (competency.status !== 'missing' && competency.status !== 'weak') return;

    const from = competency.status;
    competency.status = 'moderate';
    competency.evidenceKind = evidenceKindFromType(item.type);
    competency.supportingEvidence = item.title;
    competency.reason = reason;
    improvements.push({ skill: competency.skill, from, to: 'moderate' });
  };

  for (const item of localItems) {
    if (mentionsAny(item, ['statistics'])) {
      upgradeToModerate(
        'Statistics',
        item,
        `You added local demo evidence mentioning statistics. ${RULE_EXPLANATION}`,
      );
    }

    if (mentionsAny(item, ['python'])) {
      const python = findCompetency(gapMap, 'Python');
      if (python?.status === 'weak' && PROJECT_LIKE_TYPES.includes(item.type)) {
        python.status = 'moderate';
        python.evidenceKind = evidenceKindFromType(item.type);
        python.supportingEvidence = item.title;
        python.reason = `You added local demo evidence (${item.type.toLowerCase()}) mentioning Python. ${RULE_EXPLANATION}`;
        improvements.push({ skill: 'Python', from: 'weak', to: 'moderate' });
      }
      // Certificate-type local evidence mentioning Python leaves it Weak by design.
    }

    if (
      mentionsAny(item, [
        'business interpretation',
        'business impact',
        'interpretation',
        'decision-making',
        'decision making',
      ])
    ) {
      upgradeToModerate(
        'Business impact',
        item,
        `You added local demo evidence describing interpretation or decision-making. ${RULE_EXPLANATION}`,
      );
    }

    if (mentionsAny(item, ['data cleaning'])) {
      const dataCleaning = findCompetency(gapMap, 'Data cleaning');
      if (dataCleaning && dataCleaning.status === 'moderate') {
        dataCleaning.supportingEvidence = dataCleaning.supportingEvidence
          ? `${dataCleaning.supportingEvidence}, ${item.title}`
          : item.title;
        dataCleaning.reason = `${dataCleaning.reason} Your local demo evidence "${item.title}" also mentions data cleaning.`;
      }
    }
  }

  return { gapMap, improvements };
}

/** Recomputes the Evidence Readiness Snapshot counts from a Gap Map. */
export function buildReadinessSnapshot(gapMap: CompetencyAssessment[]): EvidenceReadinessSnapshot {
  return {
    strongCount: gapMap.filter((c) => c.status === 'strong').length,
    moderateCount: gapMap.filter((c) => c.status === 'moderate').length,
    weakCount: gapMap.filter((c) => c.status === 'weak').length,
    criticalGapCount: gapMap.filter((c) => c.status === 'missing').length,
  };
}
