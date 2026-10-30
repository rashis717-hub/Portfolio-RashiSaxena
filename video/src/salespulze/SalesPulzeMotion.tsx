import React from 'react';
import { Sequence } from 'remotion';
import { Scene1Title } from './scenes/Scene1Title';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3IntelHub } from './scenes/Scene3IntelHub';
import { Scene4Hierarchy } from './scenes/Scene4Hierarchy';
import { Scene5Trust } from './scenes/Scene5Trust';
import { Scene6AdminCost } from './scenes/Scene6AdminCost';
import { Scene7BrandEveryScreen } from './scenes/Scene7BrandEveryScreen';
import { Scene8Close } from './scenes/Scene8Close';

export const SalesPulzeMotion: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
      {/* Scene 1: 0:00 to 0:04 (0 to 120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Title />
      </Sequence>

      {/* Scene 2: 0:04 to 0:10 (120 to 300 frames) */}
      <Sequence from={120} durationInFrames={180}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: 0:10 to 0:17 (300 to 510 frames) */}
      <Sequence from={300} durationInFrames={210}>
        <Scene3IntelHub />
      </Sequence>

      {/* Scene 4: 0:17 to 0:23 (510 to 690 frames) */}
      <Sequence from={510} durationInFrames={180}>
        <Scene4Hierarchy />
      </Sequence>

      {/* Scene 5: 0:23 to 0:29 (690 to 870 frames) */}
      <Sequence from={690} durationInFrames={180}>
        <Scene5Trust />
      </Sequence>

      {/* Scene 6: 0:29 to 0:34 (870 to 1020 frames) */}
      <Sequence from={870} durationInFrames={150}>
        <Scene6AdminCost />
      </Sequence>

      {/* Scene 7: 0:34 to 0:38 (1020 to 1140 frames) */}
      <Sequence from={1020} durationInFrames={120}>
        <Scene7BrandEveryScreen />
      </Sequence>

      {/* Scene 8: 0:38 to 0:40 (1140 to 1200 frames) */}
      <Sequence from={1140} durationInFrames={60}>
        <Scene8Close />
      </Sequence>
    </div>
  );
};
