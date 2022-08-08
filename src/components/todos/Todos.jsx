import React from 'react';

import Todo from './Todo.jsx';

import './Todos.scss';

export default function Todos({ items }) {
  return (
    <div className='to-dos'>
      <div className='to-dos__title'>
        <h2>Список целей</h2>
      </div>
      <div className='to-dos__list'>
        {items.map((item) => <Todo key={item.id} item={item}/>)}
      </div>
    </div>
  );
}
