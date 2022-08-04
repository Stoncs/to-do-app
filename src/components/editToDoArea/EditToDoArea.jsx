import React from 'react';
import PropTypes from 'prop-types';

import './EditToDoArea.scss';

export default function EditToDoArea({activeItem, stateApp, listStatesApp, onClickSaveButton}) {
  // 0 - completed
  // 1 - in progress
  // 2 - waiting
  const _getRadioButtons = () => {
    const btns = [];

    if (stateApp === listStatesApp.ADDING) {
      for (let i = 0; i < 3; i++) {
        btns.push(<input key={i} type='radio' name='progress' value={i} />);
      }
      return (
        <div className='edit-from__radio-btns'>
          {btns.map((item) => item)}
        </div>
      );
    } else {
      for (let i = 0; i < 3; i++) {
        if (i === activeItem.progress)
          btns.push(<input key={i} type='radio' name='progress' value={i} selected />);
        else
          btns.push(<input key={i} type='radio' name='progress' value={i} />);
      }
      return (
        <div className='edit-from__radio-btns'>
          {btns.map((item) => item)}
        </div>
      );
    }
  };

  return (
    <form action={onClickSaveButton} className='edit-form'>
      <h2>{stateApp}</h2>
      <label>
        <p>Название:</p>
        { stateApp === listStatesApp.ADDING 
          ? <input type='text' name='title' />
          : <input type='text' name='title' value={activeItem.title}/>
        }
      </label>
      <label>
        <p>Описание:</p>
        { stateApp === listStatesApp.ADDING 
          ? <textarea name='description' />
          : <textarea name='description' value={activeItem.description}/>
        }
      </label>
      <label>
        <p>Прогресс:</p>
        {_getRadioButtons()}
      </label>

      {activeItem !== null ? activeItem.id : ''}
      <div className='edit-form__btns'>
        <button type='submit' className='btn'>Сохранить</button>
        <button className='btn btn--white'>Отменить</button>
      </div>

    </form>
  );
}

EditToDoArea.propTypes = {
  activeItem: PropTypes.object,
  stateApp: PropTypes.string.isRequired,
  listStatesApp: PropTypes.object.isRequired,
  onClickSaveButton: PropTypes.func.isRequired,
};

EditToDoArea.defaultProps = {
  activeItem: null,
};