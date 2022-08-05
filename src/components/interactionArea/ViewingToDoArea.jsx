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

  const _getInformation = (obj) => {
    const array = [];
    for (let i in obj) {
      if (i !== 'id') {
        array.push(<div key={i}>{obj[i]}</div>);
      }
    }
    return array;
  };

  return (
    <div>
      <h2>VIEWING</h2>
      {_getInformation(activeItem)}
      <button onClick={onClickEditButton} className='btn'>Редактировать</button>
      <button onClick={onClickDeleteButton} className='btn'>Удалить</button> 
    </div>
  );
}

ViewingToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
  editToDo: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
};
