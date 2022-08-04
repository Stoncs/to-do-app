import React from 'react';

// Custom Hook for validation form input states
export default function useValidation(value, validators) {
  // array of errors messages necessary in case of complication of verification
  const [errorsMessages, setErrorsMessages] = React.useState([]);

  // states of input
  const [isEmpty, setEmpty] = React.useState(true);

  const setEmptyError = (valueError) => {
    const emptyErrorMessage = 'Поле не должно быть пустым';

    setEmpty(valueError);
    if (valueError) {
      setErrorsMessages([
        ...errorsMessages,
        'Поле не должно быть пустым'
      ]);
    } else {
      setErrorsMessages([
        ...errorsMessages.filter((error) => error !== emptyErrorMessage)
      ]);
    }
  };

  React.useEffect(() => {
    for (const validation in validators) {

      // for validation extension add new case
      switch (validation) {
      case 'isEmpty':
        value ? setEmptyError(false) : setEmptyError(true);
        break;
      }
    }
  }, [value]);

  return {
    errorsMessages,
    isEmptyError: isEmpty
  };
};