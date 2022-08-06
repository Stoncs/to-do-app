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

export default function NewToDoArea({stateApp, setStateApp, STATE_EMPTY, addNewToDo}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput('', {isEmpty: true});
  const description = useInput('', {isEmpty: true});
  const progress = useInput(PROGRESS_STATUSES.awaiting);


  // function for submit form
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.isEmptyError && !description.isEmptyError && !progress.isEmptyError){
      addNewToDo({
        id: Date.now(),
        title: title.value,
        description: description.value,
        progress: progress.value,
      });
    }
  };

  // function for cancel button
  const onCancel = (e) => {
    e.preventDefault();
    setStateApp(STATE_EMPTY);
  };

  // radio buttons to check progress
  // 0 - completed
  // 1 - in progress
  // 2 - waiting

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>{stateApp}</h2>
      <div className='edit-form__item'>
        <label htmlFor='title' >Название:</label>
        <div className="edit-form__wrapper">
          <input className={(title.errorsMessages.length && title.isDirty) ? 'incorrect-input' : ''} type='text' name='title' value={title.value} onChange={title.onChange} />
          {title.isDirty && title.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
        </div>
      </div>
      
      <div className="edit-form__item">
        <label>Описание:</label>
        <div className="edit-form__wrapper">
          <textarea className={(description.errorsMessages.length && description.isDirty) ? 'incorrect-input' : ''} name='description' value={description.value} onChange={description.onChange} onBlur={description.onBlur} />
          {description.isDirty && description.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
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
