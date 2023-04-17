import { useState } from 'react';
// import { useNavigate  } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import questions, { Question } from './question.tsx';
import React from 'react';

interface Answers {
  [key: number]: string[] | any;
}

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    // validate mandatory questions and fields before moving to the next question
  
    //check 
    const currentAnswer = answers[currentQuestionIndex];
    if (currentQuestion.required && !currentAnswer) {
      setErrors([...errors, `${currentQuestion.text} is required.`]);
      return;
    }
    // if (currentQuestion.type === 'checkbox' && currentQuestion.required && currentAnswer.length === 0) {
    //   setErrors([...errors, `${currentQuestion.text} is required.`]);
    //   return;
    // }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setErrors([]);
  };
  
  const handleAnswerChange = (questionIndex: number, answer: string[] | string) => {
    // clear the error if the answer is valid
    if (errors.includes(`${currentQuestion.text} is required.`)) {
      setErrors(errors.filter((error) => error !== `${currentQuestion.text} is required.`));
    }
    setAnswers({ ...answers, [questionIndex]: answer });
    
  };
  
  const handleSubmit = () => {
    // validate mandatory questions and fields before submitting
    const mandatoryQuestions = questions.filter((question) => question.required);
    const mandatoryQuestionIndexes = mandatoryQuestions.map((question) => questions.indexOf(question));
    const missingMandatoryAnswers = mandatoryQuestionIndexes.filter(
      (questionIndex) => !answers[questionIndex]
    );
    if (missingMandatoryAnswers.length > 0) {
      setErrors(missingMandatoryAnswers.map((questionIndex) => `${questions[questionIndex].text} is required.`));
      return;
    }
    // submit the answers to the API
    console.log(answers);
    // Once the backend api developed use we can post the data to endpoint
    // const response = await fetch('/api/answers', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(answers),
    // });
  };


console.log("dasd",currentQuestionIndex);
console.log("questions",questions[currentQuestionIndex]);
  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <center><Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
      <br/>
      <Typography variant="h4" component="h2">
        Software Developer Questinarrie Project
      </Typography>
      <br/>
     <Typography variant="h4" component="h2">
        {currentQuestion.text}
      </Typography>
      <br/>
      {currentQuestion.type === 'text' && (
        <TextField
          value={answers[0]}
          onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
          variant="outlined"
        />
      )}
      {currentQuestion.type === 'checkbox' && (
        <FormControl variant="outlined">
          {currentQuestion.options?.map((option) => (
            
            <FormControlLabel
              key={option}
              label={option}
              control={
                <Checkbox
                  onChange={(e) =>
                    handleAnswerChange(
                      currentQuestionIndex,
                      answers[currentQuestionIndex]
                        ? [...answers[currentQuestionIndex], e.target.value]
                        : [e.target.value]
                    )
                  }
                />
              }
              value={option}
            />
          ))}
        </FormControl>
      )}
      {currentQuestion.type === 'dropdown' && (
        // <><FormControl fullWidth>
        //   <InputLabel id="demo-simple-select-label">Age</InputLabel>
        //   <Select
        //     labelId="demo-simple-select-label"
        //     id="demo-simple-select"
           
        //     label="Age"
           
        //   >
        //     <MenuItem value={10}>Ten</MenuItem>
        //     <MenuItem value={20}>Twenty</MenuItem>
        //     <MenuItem value={30}>Thirty</MenuItem>
        //   </Select>
        // </FormControl>
        <FormControl >
            <InputLabel>{currentQuestion.text}</InputLabel>
            <Select onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)} style={{width : '500px'}} >
              {currentQuestion.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      )}
      <Box mt={4}>
      <br/>
        {currentQuestionIndex > 0 && (
          <Button variant="contained" color="primary" onClick={handleBack} style={{ marginLeft: 'auto' ,marginRight: '10px' }} >
            Back
          </Button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext} style={{ marginLeft: 'auto' ,marginRight: '10px' }}>
            Next
          </Button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: 'auto' ,marginRight: '10px'}}>
            Submit 
          </Button>
        )}
      </Box>
    </Box></center>
  );
};

export default Questionnaire;