import React from 'react';
import PropTypes from 'prop-types';

import './InteractionArea.scss';

export default function ViewingToDoArea({activeItem, editToDo, deleteToDo}) {
  const onClickDeleteButton = () => {
    deleteToDo(activeItem.id);
  };

  const onClickEditButton = () => {
    editToDo();
  };

  // const _getInformation = (obj) => {
  //   const array = [];
  //   for (let i in obj) {
  //     if (i !== 'id') {
  //       array.push(<div className='view-panel__item' key={obj[i]}>{obj[i]}</div>);
  //     }
  //   }
  //   return array;
  // };

  return (
    <div className='view-panel'>
      <h2>Просмотр цели</h2>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Название: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.title}</div>
        </div>
      </div>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Описание: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.description.split('\n').map((line, index) => <p key={index} >{line}</p>)}</div>
        </div>
      </div>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Прогресс: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.progress}</div>
        </div>
      </div>

      <div className='view-panel__btns'>
        <button onClick={onClickEditButton} className='view-panel__btn btn'>Редактировать</button>
        <button onClick={onClickDeleteButton} className='view-panel__btn btn btn--red'>Удалить</button> 
      </div>
    </div>
  );
}

ViewingToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
  editToDo: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
};
