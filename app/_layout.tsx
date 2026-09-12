import { Stack } from 'expo-router';

import { EvidenceProvider } from '../src/state/EvidenceContext';

export default function RootLayout() {
  return (
    <EvidenceProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F7F8FB' },
        }}
      />
    </EvidenceProvider>
  );
}
