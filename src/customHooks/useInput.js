import React from 'react';

import { useValidation } from './';

// Custom Hook for Form input States
// Returns: 
// * value of input field, 
// * functions (onChange, onBlur), 
// * state (isDirty) and dispatch (setDirty)
// * array of error messages and error states
export default function useInput(initialValue, validations) {
  // Value of input
  const [value, setValue] = React.useState(initialValue);

  // Has the user visited the input field?
  const [isDirty, setDirty] = React.useState(false);

  // Validator
  const valid = useValidation(value, validations);

  // Update value on user input
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // After the user exits the input field set dirty = true
  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    setDirty,
    ...valid,
  };
};
