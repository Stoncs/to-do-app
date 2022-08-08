import React from 'react';
import Context from '../../Context';

import './Todo.scss';


export default function Todo({ item }) {
  const {
    activeItem, setActiveItem, 
    stateApp, setViewingState,
    LIST_APP_STATES, PROGRESS_STATUSES
  } = React.useContext(Context);

  // Function on click to do item
  const selectItem = (currentItem) => {
    // If the user is editing or creating a new to do and has not saved it, a confirmation of the action is required
    if (stateApp === LIST_APP_STATES.ADDING) {
      if (!confirm('Вы не сохранили новую цель. Вы уверены, что хотите выйти?')) return;
    } 
    if (stateApp === LIST_APP_STATES.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    // Set new active item ans set state app = viewing
    setActiveItem(currentItem);
    setViewingState();
  };

  // Function to get class names for to do item
  const getClassNames = () => {
    let result;
    switch (item.progress) {
    case PROGRESS_STATUSES.awaiting: {
      result = item.id !== activeItem.id ? 'to-do-item__awaiting' : 'to-do-item__awaiting to-do-item__awaiting-active';
      break;
    }
    case PROGRESS_STATUSES.inProgress: {
      result = item.id !== activeItem.id ? 'to-do-item__in-progress' : 'to-do-item__in-progress to-do-item__in-progress-active';
      break;
    }
    default: {
      result = item.id !== activeItem.id ? 'to-do-item__completed' : 'to-do-item__completed to-do-item__completed-active';
      break;
    }
    }
    return result;
  };

  return (
    <div className='to-do-item' onClick={() => selectItem(item)}>
      <div className={`to-do-item__text ${getClassNames()}`}>
        <p>{item.title}</p>
      </div>
    </div>
  );
}
