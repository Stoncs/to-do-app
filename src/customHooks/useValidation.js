import React from 'react';

// Custom Hook for validation form input states

// For validation extension:
// * add new error message
// * add new useEffect which will update an array with error
// * add new case in validation

// Returns:
// * array of error messages
// * errors states
export default function useValidation(value, validators) {
  // Errors states
  const [isEmptyError, setIsEmpty] = React.useState(false);
  const [isMaxLengthError, setIsMaxLengthError] = React.useState(false);
  const [isMaxLinesError, setIsMaxLinesError] = React.useState(false);

  // Array of error messages
  const [errorMessages, setErrorMessages] = React.useState([]);

  // Error messages
  const emptyErrorMessage = 'Поле не должно быть пустым';
  const maxLengthErrorMessage = (num) => `Длина текста не должна превышать ${num} символов`;
  const maxLineErrorMessage = (num) => `Максимальное количество строк ${num}`;
  
  // ------------------------------------------------------------------
  // Functions that update an array with error messages
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

  // ------------------------------------------------------------------

  React.useEffect(() => {
    // Input field value validations for errors
    for (const validation in validators) {
      switch (validation) {
      case 'maxLength': {
        const maxLength = validators[validation];
        value.length <= maxLength ? setIsMaxLengthError(false) : setIsMaxLengthError(true);
        break;
      }
      case 'isEmpty': 
        value.replace(/[\n ]/g, '').length ? setIsEmpty(false) : setIsEmpty(true);
        break;
      case 'maxLines': {
        const maxLines = validators[validation];
        const lines = value.match(/\n/g) !== null ? value.match(/\n/g).length : 0;
        lines < maxLines ? setIsMaxLinesError(false) : setIsMaxLinesError(true);
      }
      }
    }
  }, [value]);

  return {
    errorMessages,
    isEmptyError,
    isMaxLengthError,
    isMaxLinesError,
  };
};