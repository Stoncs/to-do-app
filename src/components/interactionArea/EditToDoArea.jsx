import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../customHooks';
import './InteractionArea.scss';

const PROGRESS_STATUSES = {
  awaiting: 'Ожидает',
  inProgress: 'В процессе',
  completed: 'Выполнена',
};

const progressList = Object.entries(PROGRESS_STATUSES).map(([, value]) => value);

export default function EditToDoArea({activeItem, saveEditedToDo, setViewingState}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput(activeItem.title , {isEmpty: true});
  const description = useInput(activeItem.description, {isEmpty: true});
  const progress = useInput(activeItem.progress);
  const arrayInputs = [title, description, progress];

  const onClickCancelButton = (e) => {
    e.preventDefault();
    setViewingState();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (arrayInputs.every((input) => input.isEmptyError === false)){
      console.log('edited');
      saveEditedToDo({
        id: activeItem.id,
        title: title.value,
        description: description.value,
        progress: progress.value,
      });
    } 
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>Редактирование цели</h2>
      <div className='edit-form__item'>
        <label htmlFor='title' >Название:</label>
        <div className="edit-form__wrapper">
          <input className={title.errorMessages.length ? 'incorrect-input' : ''} type='text' name='title' value={title.value} onChange={title.onChange} />
          {title.errorMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
        </div>
      </div>
      
      <div className="edit-form__item">
        <label>Описание:</label>
        <div className="edit-form__wrapper">
          <textarea className={description.errorMessages.length ? 'incorrect-input' : ''} name='description' value={description.value} onChange={description.onChange} />
          {description.errorMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
        </div>
      </div>
      
      <div className="edit-form__item edit-form__select">
        <label htmlFor="progress">Прогресс:</label>
        <div className="edit-form__wrapper">
          <select defaultValue={activeItem.progress} onChange={progress.onChange} name="progress">
            { progressList.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className='edit-form__btns'>
        <button type='submit' className='edit-form__btn btn'>Сохранить</button>
        <button onClick={onClickCancelButton} className='edit-form__btn btn btn--white'>Отмена</button>
      </div>

    </form>
  );
}

EditToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
  saveEditedToDo: PropTypes.func.isRequired,
  setViewingState: PropTypes.func.isRequired,
};
