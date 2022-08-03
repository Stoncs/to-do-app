import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo.jsx';

import './Todos.scss';

export default function Todos({ items, activeItem ,setActiveItem}) {
  return (
    <div className='to-dos'>
      <div className='to-dos__title'>
        <h2>Список целей</h2>
      </div>
      <div className='to-dos__list'>
        {items.map((item) => <Todo key={item.id} item={item} setActiveItem={setActiveItem} activeItem={activeItem} />)}
      </div>
      
    </div>
  );
}

Todos.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.object,
  setActiveItem: PropTypes.func.isRequired,
};

Todos.defaultProps = {
  activeItem: null,
};