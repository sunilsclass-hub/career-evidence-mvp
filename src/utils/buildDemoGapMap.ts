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

const TIER_RANK: Record<CompetencyStatusLevel, number> = {
  missing: 0,
  weak: 1,
  moderate: 2,
  strong: 3,
};

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

/**
 * The core rule: evidence SOURCE TYPE decides the tier, not what the
 * student typed as the skill. A project only reaches Strong when it has a
 * shareable output — otherwise it sits alongside coursework/presentations
 * at Moderate. A certificate alone is Weak. This is what makes the Gap Map
 * credible: a class assignment can never outrank a demonstrated project.
 */
function tierForEvidence(item: EvidenceItem): Exclude<CompetencyStatusLevel, 'missing'> {
  switch (item.type) {
    case 'Project':
      return item.hasOutput ? 'strong' : 'moderate';
    case 'Certificate':
      return 'weak';
    case 'Coursework':
    case 'Presentation':
    case 'Internship output':
    case 'Other':
      return 'moderate';
  }
}

const MODERATE_REASON: Partial<Record<EvidenceKind, string>> = {
  project: 'A project without a shareable output shows effort, but nothing others can verify.',
  coursework: 'Coursework shows exposure, not independent application.',
  presentation: 'A presentation shows communication, not sustained independent work.',
  internship: 'An internship task shows exposure, not an independently verified output.',
};

function reasonForTier(tier: CompetencyStatusLevel, evidenceKind: EvidenceKind): string {
  switch (tier) {
    case 'strong':
      return 'Backed by a project with a shareable output.';
    case 'weak':
      return 'A certificate alone is weaker evidence than a demonstrated project.';
    case 'missing':
      return 'Nothing in your vault supports this yet.';
    case 'moderate':
      return (
        MODERATE_REASON[evidenceKind] ??
        'This shows exposure, not independent, verifiable application yet.'
      );
  }
}

/**
 * Derives a Gap Map for a fixed list of target skills from whatever
 * evidence is currently in the vault. Every skill is scored from the
 * single best piece of supporting evidence for it, using the source-type
 * rule above — this is the whole rule engine, applied uniformly to sample
 * and locally-added evidence alike.
 */
export function buildGapMap(
  targetSkills: string[],
  evidenceItems: EvidenceItem[],
): CompetencyAssessment[] {
  return targetSkills.map((skill) => {
    const supporting = evidenceItems.filter((item) =>
      item.demonstrates.some((demonstrated) => demonstrated.toLowerCase() === skill.toLowerCase()),
    );

    if (supporting.length === 0) {
      return {
        skill,
        status: 'missing',
        evidenceKind: 'none',
        reason: reasonForTier('missing', 'none'),
      };
    }

    let best: { item: EvidenceItem; tier: CompetencyStatusLevel } | undefined;
    for (const item of supporting) {
      const tier = tierForEvidence(item);
      if (!best || TIER_RANK[tier] > TIER_RANK[best.tier]) {
        best = { item, tier };
      }
    }

    const { item, tier } = best as { item: EvidenceItem; tier: CompetencyStatusLevel };
    const evidenceKind = evidenceKindFromType(item.type);

    return {
      skill,
      status: tier,
      evidenceKind,
      supportingEvidence: item.title,
      reason: reasonForTier(tier, evidenceKind),
    };
  });
}

/**
 * Compares the Gap Map before and after local evidence, so the screen can
 * show what actually changed. The sample-only picture is the baseline;
 * everything (sample + local) is the current picture. Same rule, applied
 * twice — no separate keyword logic for local evidence.
 */
export function buildDemoGapMap(
  targetSkills: string[],
  evidenceItems: EvidenceItem[],
): DemoGapMapResult {
  const sampleOnly = evidenceItems.filter((item) => item.origin === 'sample');
  const baseline = buildGapMap(targetSkills, sampleOnly);
  const current = buildGapMap(targetSkills, evidenceItems);

  const improvements: GapMapImprovement[] = [];
  current.forEach((competency, index) => {
    const before = baseline[index]?.status;
    if (before && before !== competency.status) {
      improvements.push({ skill: competency.skill, from: before, to: competency.status });
    }
  });

  return { gapMap: current, improvements };
}

/** Recomputes the Evidence Readiness Snapshot counts from a Gap Map. */
export function buildReadinessSnapshot(
  gapMap: CompetencyAssessment[],
): EvidenceReadinessSnapshot {
  return {
    strongCount: gapMap.filter((c) => c.status === 'strong').length,
    moderateCount: gapMap.filter((c) => c.status === 'moderate').length,
    weakCount: gapMap.filter((c) => c.status === 'weak').length,
    criticalGapCount: gapMap.filter((c) => c.status === 'missing').length,
  };
}
