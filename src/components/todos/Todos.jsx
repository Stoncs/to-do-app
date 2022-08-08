import React from 'react';

import Todo from './Todo.jsx';

import './Todos.scss';

export default function Todos({ items }) {
  const [valueSearchInput, setValueSearchInput] = React.useState('');
  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(valueSearchInput));
  return (
    <div className='to-dos'>
      <div className='to-dos__header'>
        <h2>Список целей</h2>
        <form className='to-dos__form'>
          <input 
            type="text"
            className='to-dos__search-input'
            placeholder='Поиск...'
            onChange={(e) => setValueSearchInput(e.target.value)}
          />
        </form>
      </div>
      <div className='to-dos__list'>
        {filteredItems.map((item) => <Todo key={item.id} item={item}/>)}
      </div>
    </div>
  );
}
