interface Question {
    type: 'text' | 'checkbox' | 'dropdown';
    text: string;
    options?: string[];
    required: boolean;
  }
  
  const questions: Question[] = [
    {
      type: 'text',
      text: 'What is your name?',
      required: true,
    },
    {
      type: 'checkbox',
      text: 'Which fruits you want to be added in your shake?',
      options: ['strawberries', 'blueberries', 'mangoes', 'bananas' , 'pineapple'],
      required: false,
    },
    {
      type: 'dropdown',
      text: 'Please select the size ',
      options: ['Small', 'Medium', 'Large'],
      required: true,
    },
  ];
  
  export default questions;