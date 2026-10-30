import React from 'react';
import { Sequence } from 'remotion';
import { Scene1Title } from './scenes/Scene1Title';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3Idea } from './scenes/Scene3Idea';
import { Scene4Cockpit } from './scenes/Scene4Cockpit';
import { Scene5ToolsInside } from './scenes/Scene5ToolsInside';
import { Scene6Partnership } from './scenes/Scene6Partnership';
import { Scene7Close } from './scenes/Scene7Close';

export const SalesAIMotion: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#FAFAF9' }}>
      {/* Scene 1: 0:00 to 0:04 (0 to 120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Title />
      </Sequence>

      {/* Scene 2: 0:04 to 0:11 (120 to 330 frames) */}
      <Sequence from={120} durationInFrames={210}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: 0:11 to 0:17 (330 to 510 frames) */}
      <Sequence from={330} durationInFrames={180}>
        <Scene3Idea />
      </Sequence>

      {/* Scene 4: 0:17 to 0:25 (510 to 750 frames) */}
      <Sequence from={510} durationInFrames={240}>
        <Scene4Cockpit />
      </Sequence>

      {/* Scene 5: 0:25 to 0:32 (750 to 960 frames) */}
      <Sequence from={750} durationInFrames={210}>
        <Scene5ToolsInside />
      </Sequence>

      {/* Scene 6: 0:32 to 0:37 (960 to 1110 frames) */}
      <Sequence from={960} durationInFrames={150}>
        <Scene6Partnership />
      </Sequence>

      {/* Scene 7: 0:37 to 0:40 (1110 to 1200 frames) */}
      <Sequence from={1110} durationInFrames={90}>
        <Scene7Close />
      </Sequence>
    </div>
  );
};
