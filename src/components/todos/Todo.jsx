import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';

const PROGRESS_STATUSES = {
  awaiting: 'Ожидает',
  inProgress: 'В процессе',
  completed: 'Выполнена',
};

export default function Todo({item, activeItem, setActiveItem}) {
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
  const onClickToDo = (item) => {
    setActiveItem(item);
  };
  return (
    <div className={'to-do-item }'} onClick={() => onClickToDo(item)}>
      <div className={`to-do-item__text ${getClassNames()}`}>
        <p>{item.title}</p>
      </div>
    </div>
  );
}

Todo.propTypes = {
  item: PropTypes.object.isRequired,
  activeItem: PropTypes.object,
  setActiveItem: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  activeItem: null
};