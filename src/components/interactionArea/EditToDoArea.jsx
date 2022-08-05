import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../customHooks';
import './InteractionArea.scss';

export default function EditToDoArea({activeItem, saveEditedToDo, setViewingState}) {
  // variables storing the state of inputs (also store errors)
  const title = useInput(activeItem.title , {isEmpty: false});
  const description = useInput(activeItem.description, {isEmpty: true});
  const progress = useInput(activeItem.progress, {isEmpty: true});

  // flag for showing errors (after submit if input values have errors => true, else => false)
  const [showErrors, setShowErrors] = React.useState(false);

  const onClickCancelButton = (e) => {
    e.preventDefault();
    setViewingState();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.isEmptyError && !description.isEmptyError && !progress.isEmptyError){
      setShowErrors(false);
      saveEditedToDo({
        id: activeItem.id,
        title: title.value,
        description: description.value,
        progress: progress.value,
      });
    } else {
      setShowErrors(true);
    }

  };

  // 0 - completed
  // 1 - in progress
  // 2 - waiting
  const _getRadioButtons = () => {
    const btns = [];
    for (let i = 0; i < 3; i++) {
      if (i === activeItem.progress) {
        btns.push(<input key={i} type='radio' name='progress' value={i} onChange={progress.onChange} checked />);
      }
      else{
        btns.push(<input key={i} type='radio' name='progress' value={i} onChange={progress.onChange} />);
      }
    }
    return (
      <div className='edit-from__radio-btns'>
        {btns.map((item) => item)}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className='edit-form'>
      <h2>Редактирование цели</h2>
      <label>
        <p>Название:</p>
        <input type='text' name='title' value={title.value} onChange={title.onChange}/>
        {showErrors && title.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      </label>
      <label>
        <p>Описание:</p>
        <textarea name='description' value={description.value} onChange={description.onChange} />
        {showErrors && description.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      </label>
      <label>
        <p>Прогресс:</p>
        {_getRadioButtons()}
        {showErrors && progress.errorsMessages.map((errorMessage, index) => <p key={index}>{errorMessage}</p>)}
      </label>

      <div className='edit-form__btns'>
        <button type='submit' className='btn'>Сохранить</button>
        <button onClick={onClickCancelButton} className='btn btn--white'>Отмена</button>
      </div>

    </form>
  );
}

EditToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
  saveEditedToDo: PropTypes.func.isRequired,
  setViewingState: PropTypes.func.isRequired,
};
