"use client";
import { useState, useEffect, Fragment } from 'react';
import useSWR from 'swr';
import { fetcherWithTotal, fetcher } from '@/libs/axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BorderAll } from '@mui/icons-material';
import UploadGame from './uploadGame';
import GameInfo from './gameInfo';
import ResultView from './resultView';
import { BaseResponse, GameDataModel, ResGameDataModel } from '@/types/base';
import { CategoryModel, GenreModel } from '../../types/games';

const steps = ['Upload Game', 'Game Information', 'Completed'];

const GameCreateContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [gameInfo, setGameInfo] = useState<GameDataModel>();
  const [resultData, setResultData] = useState<ResGameDataModel>();

  const { data: categoryData, error: cetegoriesFetchError } = useSWR<
    BaseResponse<CategoryModel[]>
  >(`/games/categories`, fetcherWithTotal);
  const { data: genresData, error: genresFetchError } = useSWR<
    BaseResponse<GenreModel[]>
  >(`/games/genres`, fetcherWithTotal);

  if ( cetegoriesFetchError || genresFetchError)
    return <div>Error fetching data</div>;

  const isStepOptional = (step: number) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  

  if ( !categoryData || !genresData) return <div>Loading...</div>;
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }} color={"black"}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography color="primary" sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <UploadGame
              toNext={handleNext}
              setGameInfo={setGameInfo}
            />
          )}
          {activeStep === 1 && gameInfo && (
            <GameInfo
              categoriesData={categoryData.data}
              genresData={genresData.data}
              gameInfo={gameInfo}
              toNext={handleNext}
              setResultData={setResultData}
            />
          )}
          {activeStep === 2 && (
            <ResultView
              data={resultData}
            />
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default GameCreateContent;