import React from 'react';

import { useValidation } from './';
// Custom Hook for Form input States
export default function useInput(initialValue, validations) {
  // value of input
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setDirty] = React.useState(false);
  // validator
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

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
