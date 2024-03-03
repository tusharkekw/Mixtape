// StepperComponent.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGetTransferSteps } from 'stepper/hooks/useGetTransferSteps';
import { useState } from 'react';
import { platforms } from 'stepper/transfer.utils';
import useConnectPlatform from 'stepper/hooks/useConnectPlatform';

export type Platform = {
  id: string;
  name: string;
};

export default function StepperComponent() {
  const [activeStep, setActiveStep] = useState(
    parseInt(sessionStorage.getItem('activeStep') || '0', 10),
  );
  const [sourcePlatform, setSourcePlatform] = useState<Platform | undefined>(() => {
    const savedPlatform = sessionStorage.getItem('sourcePlatform');
    return savedPlatform ? JSON.parse(savedPlatform) : undefined;
  });

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    sessionStorage.setItem('activeStep', nextStep.toString());
  };
  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    sessionStorage.setItem('activeStep', prevStep.toString());
  };

  const handleReset = () => setActiveStep(0);

  const onSelect = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);

    setSourcePlatform(platform);
    sessionStorage.setItem('sourcePlatform', JSON.stringify(platform));
  };


  //connect with selectedSourcePlatform
  useConnectPlatform(!!sourcePlatform, sourcePlatform?.id);

  const isSelected = (platformId: string) => sourcePlatform?.id === platformId;
  const steps = useGetTransferSteps();

  return (
    <Box sx={{ width: 'sm' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {steps[activeStep].getElement(onSelect, sourcePlatform, handleNext)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
