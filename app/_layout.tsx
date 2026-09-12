import { Stack } from 'expo-router';

import { EvidenceProvider } from '../src/state/EvidenceContext';
import { TargetJobProvider } from '../src/state/TargetJobContext';

export default function RootLayout() {
  return (
    <TargetJobProvider>
      <EvidenceProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F7F8FB' },
          }}
        />
      </EvidenceProvider>
    </TargetJobProvider>
  );
}
