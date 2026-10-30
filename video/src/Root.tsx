import React from 'react';
import { Composition } from 'remotion';
import { A2UIMotion } from './A2UIMotion';
import { SalesPulzeMotion } from './salespulze/SalesPulzeMotion';
import { SalesAIMotion } from './salesai/SalesAIMotion';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="A2UIMotion"
        component={A2UIMotion}
        durationInFrames={1200}
        fps={30}
        width={1600}
        height={900}
      />
      <Composition
        id="SalesPulzeMotion"
        component={SalesPulzeMotion}
        durationInFrames={1200}
        fps={30}
        width={1600}
        height={900}
      />
      <Composition
        id="SalesAIMotion"
        component={SalesAIMotion}
        durationInFrames={1200}
        fps={30}
        width={1600}
        height={900}
      />
    </>
  );
};
