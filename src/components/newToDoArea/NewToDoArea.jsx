import React from 'react';
import PropTypes from 'prop-types';

import './NewToDoArea.scss';

import { useInput } from '../../customHooks';

export default function NewToDoArea({stateApp, setStateApp, STATE_EMPTY, onClickSaveButton}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput('', {isEmpty: true});
  const description = useInput('', {isEmpty: true});
  const progress = useInput('', {isEmpty: true});

  // flag for showing errors (after submit if input values have errors => true, else => false)
  const [showErrors, setShowErrors] = React.useState(false);

  // function for submit form
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.isEmptyError && !description.isEmptyError && !progress.isEmptyError){
      setShowErrors(false);
      onClickSaveButton({
        id: Date.now(),
        title: title.value,
        descripition: description.value,
        progress: progress.value,
      });
    } else {
      setShowErrors(true);
    }
  };

  // function for cancel button
  const onCancel = () => {
    setStateApp(STATE_EMPTY);
  };

  // radio buttons to check progress
  // 0 - completed
  // 1 - in progress
  // 2 - waiting
  const _getRadioButtons = () => {
    const radioBtns = [];
    
    for (let i = 0; i < 3; i++) {
      radioBtns.push(<input key={i} type='radio' name='progress' onChange={progress.onChange} value={i} />);
    }
    return (
      <div className='edit-from__radio-btns'>
        {radioBtns.map((item) => item)}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>{stateApp}</h2>
      <label>
        <p>Название:</p>
        <input type='text' name='title' value={title.value} onChange={title.onChange}/>
      </label>
      {showErrors && title.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      <label>
        <p>Описание:</p>
        <textarea name='description' value={description.value} onChange={description.onChange}/>
      </label>
      {showErrors && description.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      <label>
        <p>Прогресс:</p>
        {_getRadioButtons()}
      </label>
      {showErrors && progress.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      <div className='edit-form__btns'>
        <button type='submit' className='btn'>Сохранить</button>
        <button className='btn btn--white' onClick={onCancel}>Отменить</button>
      </div>

    </form>
  );
}

// types of props
NewToDoArea.propTypes = {
  stateApp: PropTypes.string.isRequired,
  setStateApp: PropTypes.func.isRequired,
  STATE_EMPTY: PropTypes.string.isRequired,
  onClickSaveButton: PropTypes.func.isRequired,
};
