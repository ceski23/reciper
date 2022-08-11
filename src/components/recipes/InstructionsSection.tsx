/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { FC, useState } from 'react';

import { RecipeStep } from 'components/recipes/RecipeStep';

import { RecipeInstruction } from 'services/recipes';

export interface InstructionsGroup {
  group?: string;
  instructions: RecipeInstruction[];
}

interface InstructionsSectionProps {
  instructionsGroup: InstructionsGroup;
}

export const InstructionsSection: FC<InstructionsSectionProps> = ({
  instructionsGroup,
}) => {
  const [doneSteps, setDoneSteps] = useState<number[]>([]);

  const handleStepClicked = (idx: number) => {
    if (doneSteps.includes(idx)) {
      setDoneSteps(doneSteps.filter((i) => i !== idx));
    } else {
      setDoneSteps([...doneSteps, idx]);
    }
  };

  return (
    <>
      <h2>{instructionsGroup.group || 'Instrukcje'}</h2>

      <RecipeSteps>
        {instructionsGroup.instructions.map((ins, idx) => (
          <RecipeStep
          // eslint-disable-next-line react/no-array-index-key
            key={idx}
            stepNumber={idx + 1}
            instruction={ins.text}
            done={doneSteps.includes(idx)}
            onClick={() => handleStepClicked(idx)}
          />
        ))}
      </RecipeSteps>
    </>
  );
};

const RecipeSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;
