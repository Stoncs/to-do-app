import React from 'react';

// Custom Hook for validation form input states
export default function useValidation(value, validators) {
  // array of errors messages necessary in case of complication of verification
  const [errorMessages, setErrorMessages] = React.useState([]);

  // states of input
  const [isEmptyError, setIsEmpty] = React.useState(false);
  const [isMaxLengthError, setIsMaxLengthError] = React.useState(false);
  const [isMaxLinesError, setIsMaxLinesError] = React.useState(false);

  // for validation extension add new useEffect which will add the error message to the array
  React.useEffect(() => {
    if (isEmptyError) setErrorMessages([...errorMessages, emptyErrorMessage]);
    else setErrorMessages([...errorMessages.filter((errorMesage) => errorMesage !== emptyErrorMessage)]);
  }, [isEmptyError]);

  React.useEffect(() => {
    if (isMaxLengthError) setErrorMessages([...errorMessages, maxLengthErrorMessage(validators['maxLength'])]);
    else setErrorMessages([...errorMessages.filter((errorMesage) => errorMesage !== maxLengthErrorMessage(validators['maxLength']))]);
  }, [isMaxLengthError]);

  React.useEffect(() => {
    if (isMaxLinesError) setErrorMessages([...errorMessages, maxLineErrorMessage(validators['maxLines'])]);
    else setErrorMessages([...errorMessages.filter((errorMesage) => errorMesage !== maxLineErrorMessage(validators['maxLines']))]);
  }, [isMaxLinesError]);

  const emptyErrorMessage = 'Поле не должно быть пустым';
  const maxLengthErrorMessage = (num) => `Длинна текста не должна превышать ${num} символов`;
  const maxLineErrorMessage = (num) => `Максимальное количество новых строк ${num}`;

  React.useEffect(() => {
    
    for (const validation in validators) {
      // for validation extension add new case
      switch (validation) {
      case 'maxLength': {
        const maxLength = validators[validation];
        // console.log(value.trim().length, maxLength);
        value.length <= maxLength ? setIsMaxLengthError(false) : setIsMaxLengthError(true);
        break;
      }
      case 'isEmpty': 
        value.replace(/[\n ]/g, '') ? setIsEmpty(false) : setIsEmpty(true);
        break;
      case 'maxLines': {
        const maxLines = validators[validation];
        value.match(/\n/g || []) <= maxLines ? setIsMaxLinesError(false) : setIsMaxLinesError(true);
      }
      }
      

    }
  }, [value]);

  return {
    errorMessages,
    isEmptyError,
    isMaxLengthError: isMaxLengthError,
  };
};