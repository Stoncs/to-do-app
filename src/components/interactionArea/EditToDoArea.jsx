import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../customHooks';
import './InteractionArea.scss';

export default function EditToDoArea({
  items, setItems,
  activeItem, setActiveItem,
  setViewingState, 
  PROGRESS_STATUSES, MAX_LENGTH_TITLE, 
  MAX_LENGTH_DESCRIPTION, MAX_LINES_DESCRIPTION }) {

  // Variables storing the state of inputs (also store errors)
  const title = useInput(activeItem.title , {isEmpty: true, maxLength: MAX_LENGTH_TITLE});
  const description = useInput(activeItem.description, {isEmpty: true, maxLength: MAX_LENGTH_DESCRIPTION, maxLines: MAX_LINES_DESCRIPTION});
  const progress = useInput(activeItem.progress);

  // An array that stores all the states of the input fields
  const arrayInputs = [title, description, progress];

  // References to input field DOM-elements
  const $title = React.useRef();
  const $description = React.useRef();

  // Get values of progress statuses object
  const progressList = Object.entries(PROGRESS_STATUSES).map(([, value]) => value);
    
  // To change the color of characters in the title input field
  React.useEffect(() => {
    if ((title.isEmptyError || title.isMaxLengthError) && title.isDirty) {$title.current.style.color = 'red';}
    else {$title.current.style.color = 'black';}
  }, [title]);

  // To change the color of characters in the title input field
  React.useEffect(() => {
    if ((description.isEmptyError || description.isMaxLengthError || description.isMaxLinesError) && description.isDirty) {$description.current.style.color = 'red';}
    else {$description.current.style.color = 'black';}
  }, [description]);

  // Function for saving the edited to do
  const saveEditedToDo = () => {
    const editedItem = {
      id: activeItem.id,
      title: title.value,
      description: description.value,
      progress: progress.value,
    };
    setItems([
      ...items.map((item) => item.id !== editedItem.id ? item : editedItem),
    ]);
    setActiveItem(editedItem);
    setViewingState();
  };
    
  // Function on submit form
  const onSubmit = (e) => {
    e.preventDefault();
    
    // An array that contains the number of error messages of each input field
    const lengthsErrorMessages = arrayInputs.map((input) => input.errorMessages.length);
    // If there are no errors, save the edited to do
    if (lengthsErrorMessages.every((length) => length === 0)){
      saveEditedToDo();
    }
  };

  // On click cancel button
  const onCancel = () => {
    setViewingState();
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>Редактирование цели</h2>
      <div className='edit-form__item'>
        <label htmlFor='title' >Название:</label>
        <div className="edit-form__wrapper">
          <input 
            type='text' 
            name='title' 
            value={title.value} 
            className={(title.errorMessages.length && title.isDirty) ? 'incorrect-input' : ''} 
            maxLength={MAX_LENGTH_TITLE + 1} 
            ref={$title} 
            onChange={title.onChange} 
            onBlur={title.onBlur} 
            onPaste={e => e.preventDefault()} 
          />
          {title.isDirty && title.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
        </div>
      </div>
      
      <div className="edit-form__item">
        <label>Описание:</label>
        <div className="edit-form__wrapper">
          <textarea 
            name='description' 
            value={description.value} 
            className={(description.errorMessages.length && description.isDirty) ? 'incorrect-input' : ''} 
            maxLength={MAX_LENGTH_DESCRIPTION + 1} 
            ref={$description} 
            onChange={description.onChange} 
            onBlur={description.onBlur} 
            onPaste={e => e.preventDefault()}
          />
          {description.isDirty && description.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>)}
        </div>
      </div>
      
      <div className="edit-form__item edit-form__select">
        <label htmlFor="progress">Прогресс:</label>
        <div className="edit-form__wrapper">
          <select 
            name="progress"
            defaultValue={activeItem.progress} 
            onChange={progress.onChange} 
          >
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

EditToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
  saveEditedToDo: PropTypes.func.isRequired,
  setViewingState: PropTypes.func.isRequired,
};
