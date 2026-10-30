import React from 'react';
import { Sequence } from 'remotion';
import { Scene1Title } from './scenes/Scene1Title';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3Idea } from './scenes/Scene3Idea';
import { Scene4Catalogue } from './scenes/Scene4Catalogue';
import { Scene5E2EFlow } from './scenes/Scene5E2EFlow';
import { Scene6Schema } from './scenes/Scene6Schema';
import { Scene7Control } from './scenes/Scene7Control';
import { Scene8Close } from './scenes/Scene8Close';

export const A2UIMotion: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
      {/* Scene 1: 0 to 120 (0:00 - 0:04) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Title />
      </Sequence>

      {/* Scene 2: 120 to 300 (0:04 - 0:10) */}
      <Sequence from={120} durationInFrames={180}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: 300 to 480 (0:10 - 0:16) */}
      <Sequence from={300} durationInFrames={180}>
        <Scene3Idea />
      </Sequence>

      {/* Scene 4: 480 to 660 (0:16 - 0:22) */}
      <Sequence from={480} durationInFrames={180}>
        <Scene4Catalogue />
      </Sequence>

      {/* Scene 5: 660 to 870 (0:22 - 0:29) */}
      <Sequence from={660} durationInFrames={210}>
        <Scene5E2EFlow />
      </Sequence>

      {/* Scene 6: 870 to 1020 (0:29 - 0:34) */}
      <Sequence from={870} durationInFrames={150}>
        <Scene6Schema />
      </Sequence>

      {/* Scene 7: 1020 to 1140 (0:34 - 0:38) */}
      <Sequence from={1020} durationInFrames={120}>
        <Scene7Control />
      </Sequence>

      {/* Scene 8: 1140 to 1200 (0:38 - 0:40) */}
      <Sequence from={1140} durationInFrames={60}>
        <Scene8Close />
      </Sequence>
    </div>
  );
};
