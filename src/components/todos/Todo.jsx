import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';

export default function Todo({item, activeItem, setActiveItem}) {
  const onClickToDo = (item) => {
    setActiveItem(item);
  };
  return (
    <div className={`to-do-item ${item.id === activeItem.id ? 'to-do-item__active' : ''}`} onClick={() => onClickToDo(item)}>
      <div className='to-do-item__text'>
        <p>{item.text}</p>
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