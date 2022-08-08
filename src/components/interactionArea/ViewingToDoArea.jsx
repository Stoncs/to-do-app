import React from 'react';

import './InteractionArea.scss';

export default function ViewingToDoArea({ 
  items, setItems, 
  activeItem, setActiveItem, 
  stateApp, setEmptyState, setEditingState, 
  NO_ACTIVE_ITEM }) {
    
  // Function on click delete button
  const deleteActiveItem = () => {
    setItems([
      ...items.filter((item) => item.id !== activeItem.id)
    ]);
    setActiveItem(NO_ACTIVE_ITEM);
    setEmptyState();
  };

  // Function on click edit button
  const editActiveItem = () => {
    setEditingState();
  };

  return (
    <div className='view-panel'>
      <h2>{stateApp}</h2>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Название: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.title}</div>
        </div>
      </div>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Описание: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.description.split('\n').map((line, index) => <p key={ index } >{ line }</p>)}</div>
        </div>
      </div>
      <div className='view-panel__item'>
        <div className='view-panel__label'>Прогресс: </div>
        <div className="view-panel__wrapper">
          <div className='view-panel__text'>{activeItem.progress}</div>
        </div>
      </div>
      <div className='view-panel__btns'>
        <button onClick={editActiveItem} className='view-panel__btn btn'>Редактировать</button>
        <button onClick={deleteActiveItem} className='view-panel__btn btn btn--red'>Удалить</button> 
      </div>
    </div>
  );
}
