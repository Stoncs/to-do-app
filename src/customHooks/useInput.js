import React from 'react';

import { useValidation } from './';
// Custom Hook for Form input States
export default function useInput(initialValue, validations) {
  // value of input
  const [value, setValue] = React.useState(initialValue);
  // validator
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    ...valid,
  };
};
