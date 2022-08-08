import React from 'react';

import './InteractionArea.scss';

import { useInput } from '../../customHooks';


export default function NewToDoArea({
  items, setItems,
  stateApp, setEmptyState, setViewingState,
  setActiveItem,
  PROGRESS_STATUSES, MAX_LENGTH_TITLE, MAX_LENGTH_DESCRIPTION, MAX_LINES_DESCRIPTION }) {

  // Variables storing the state of inputs (also store errors)
  const title = useInput('', {isEmpty: true, maxLength: MAX_LENGTH_TITLE});
  const description = useInput('', {isEmpty: true, maxLength: MAX_LENGTH_DESCRIPTION, maxLines: MAX_LINES_DESCRIPTION});
  const progress = useInput(PROGRESS_STATUSES.awaiting);

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

  // To change the color of characters in the description input field
  React.useEffect(() => {
    if ((description.isEmptyError || description.isMaxLengthError || description.isMaxLinesError) && description.isDirty) {$description.current.style.color = 'red';}
    else {$description.current.style.color = 'black';}
  }, [description]);
  
  // Function for adding new to do
  const addNewToDo = () => {
    const newItem = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      progress: progress.value,
    };
    setItems([
      ...items,
      newItem
    ]);
    setActiveItem(newItem);
    setViewingState();
  };

  // Function on submit form
  const onSubmit = (e) => {
    e.preventDefault();

    // An array that contains the number of error messages of each input field
    const lengthsErrorMessages = arrayInputs.map((input) => input.errorMessages.length);
    // If there are no errors, save the new to do
    if (lengthsErrorMessages.every((length) => length === 0)) {
      addNewToDo();
    } else {
      // Otherwise, we make all the fields dirty so that the user can see the errors for sure.
      arrayInputs.forEach((input) => input.setDirty(true));
    }
  };

  // Function on click cancel button
  const onCancel = () => {
    setEmptyState();
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>{stateApp}</h2>
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
          { description.isDirty && description.errorMessages.map((errorMessage, index) => <div className='edit-form__error' key={index}>{errorMessage}</div>) }
        </div>
      </div>
      <div className="edit-form__item edit-form__select">
        <label htmlFor="progress">Прогресс:</label>
        <div className="edit-form__wrapper">
          <select 
            name="progress" 
            defaultValue={PROGRESS_STATUSES.awaiting} 
            onChange={progress.onChange} 
          >
            { progressList.map((item) => <option value={item} key={item}>{item}</option>) }
          </select>
        </div>
      </div>

      <div className='edit-form__btns'>
        <button type='submit' className='edit-form__btn btn' >Сохранить</button>
        <button className='edit-form__btn btn btn--white' onClick={onCancel} >Отмена</button>
      </div>
    </form>
  );
}
