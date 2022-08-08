import React from 'react';
import PropTypes from 'prop-types';

import './InteractionArea.scss';

import { useInput } from '../../customHooks';

const PROGRESS_STATUSES = {
  awaiting: 'Ожидает',
  inProgress: 'В процессе',
  completed: 'Выполнена',
};

const progressList = Object.entries(PROGRESS_STATUSES).map(([, value]) => value);

const maxLengthTitle = 50;
const maxLengthDescription = 300;
const maxLinesDescription = 5;

export default function NewToDoArea({stateApp, setStateApp, STATE_EMPTY, addNewToDo}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput('', {isEmpty: true, maxLength: maxLengthTitle});
  const description = useInput('', {isEmpty: true, maxLength: maxLengthDescription, maxLines: maxLinesDescription});
  const progress = useInput(PROGRESS_STATUSES.awaiting);
  const arrayInputs = [title, description, progress];

  const $title = React.useRef();
  const $description = React.useRef();

  React.useEffect(() => {
    if ((title.isEmptyError || title.isMaxLengthError) && title.isDirty) {$title.current.style.color = 'red';}
    else {$title.current.style.color = 'black';}
  }, [title]);

  React.useEffect(() => {
    if ((description.isEmptyError || description.isMaxLengthError || description.isMaxLinesError) && description.isDirty) {$description.current.style.color = 'red';}
    else {$description.current.style.color = 'black';}
  }, [description]);
  
  // function for submit form
  const onSubmit = (e) => {
    e.preventDefault();
    // an array that contains the number of error messages of each input field
    const lengthsErrorMessages = arrayInputs.map((input) => input.errorMessages.length);
    if (lengthsErrorMessages.every((length) => length === 0)) {
      addNewToDo({
        id: Date.now(),
        title: title.value,
        description: description.value,
        progress: progress.value,
      });
    } else {
      arrayInputs.forEach((input) => input.setDirty(true));
    }
  };

  // function for cancel button
  const onCancel = (e) => {
    e.preventDefault();
    setStateApp(STATE_EMPTY);
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>{stateApp}</h2>
      <div className='edit-form__item'>
        <label htmlFor='title' >Название:</label>
        <div className="edit-form__wrapper">
          {/* {console.log(title.errorMessages.length, title.isDirty)} */}
          <input ref={$title} maxLength={maxLengthTitle + 1} className={(title.errorMessages.length && title.isDirty) ? 'incorrect-input' : ''} type='text' name='title' value={title.value} onChange={title.onChange} onBlur={title.onBlur} />
          {title.isDirty && title.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
        </div>
      </div>
      
      <div className="edit-form__item">
        <label>Описание:</label>
        <div className="edit-form__wrapper">
          <textarea ref={$description} maxLength={maxLengthDescription + 1} className={(description.errorMessages.length && description.isDirty) ? 'incorrect-input' : ''} name='description' value={description.value} onChange={description.onChange} onBlur={description.onBlur} />
          {description.isDirty && description.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
        </div>
      </div>
      
      <div className="edit-form__item edit-form__select">
        <label htmlFor="progress">Прогресс:</label>
        <div className="edit-form__wrapper">
          <select defaultValue={PROGRESS_STATUSES.awaiting} onChange={progress.onChange} name="progress">
            { progressList.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className='edit-form__btns'>
        <button type='submit' className='edit-form__btn btn'>Сохранить</button>
        <button onClick={onCancel} className='edit-form__btn btn btn--white'>Отмена</button>
      </div>
    </form>
  );
}

// types of props
NewToDoArea.propTypes = {
  stateApp: PropTypes.string.isRequired,
  setStateApp: PropTypes.func.isRequired,
  STATE_EMPTY: PropTypes.string.isRequired,
  addNewToDo: PropTypes.func.isRequired,
};
