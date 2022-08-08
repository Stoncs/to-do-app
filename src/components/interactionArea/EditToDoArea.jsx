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

const maxLengthTitle = 50;
const maxLengthDescription = 300;
const maxLinesDescription = 5;

export default function EditToDoArea({activeItem, saveEditedToDo, setViewingState}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput(activeItem.title , {isEmpty: true, maxLength: maxLengthTitle});
  const description = useInput(activeItem.description, {isEmpty: true, maxLength: maxLengthDescription, maxLines: maxLinesDescription});
  const progress = useInput(activeItem.progress);
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

  const onClickCancelButton = () => {
    setViewingState();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const lengthsErrorMessages = arrayInputs.map((input) => input.errorMessages.length);
    if (lengthsErrorMessages.every((length) => length === 0)){
      saveEditedToDo({
        id: activeItem.id,
        title: title.value,
        description: description.value,
        progress: progress.value,
      });
    } else {
      arrayInputs.forEach((input) => input.setDirty(true));
    }
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>Редактирование цели</h2>
      <div className='edit-form__item'>
        <label htmlFor='title' >Название:</label>
        <div className="edit-form__wrapper">
          <input ref={$title} maxLength={maxLengthTitle} className={title.errorMessages.length ? 'incorrect-input' : ''} type='text' name='title' value={title.value} onChange={title.onChange} onBlur={title.onBlur} onPaste={e => e.preventDefault()}/>
          {title.isDirty && title.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
        </div>
      </div>
      
      <div className="edit-form__item">
        <label>Описание:</label>
        <div className="edit-form__wrapper">
          <textarea ref={$description} maxLength={maxLengthDescription + 1} className={description.errorMessages.length ? 'incorrect-input' : ''} name='description' value={description.value} onChange={description.onChange} onBlur={description.onBlur} onPaste={e => e.preventDefault()} />
          {description.isDirty && description.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
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
