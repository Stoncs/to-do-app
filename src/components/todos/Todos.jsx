import React from 'react';

import Todo from './Todo.jsx';

import './Todos.scss';
import { SearchInput } from '../index.js';

export default function Todos({ items, PROGRESS_STATUSES }) {
  const [valueSearchInput, setValueSearchInput] = React.useState('');
  const arrayProgressStatusesForInput = ['Всем', ...Object.values(PROGRESS_STATUSES)];

  const [selectedProgress, setSelectedProgress] = React.useState(arrayProgressStatusesForInput[0]); 

  const filterFunction = (item) => {
    if (selectedProgress === arrayProgressStatusesForInput[0]) {
      return item.title.toLowerCase().includes(valueSearchInput);
    } else {
      return item.progress === selectedProgress && item.title.toLowerCase().includes(valueSearchInput);
    }
  };
  const filteredItems = items.filter((item) => filterFunction(item));

  return (
    <div className='to-dos'>
      <div className='to-dos__header'>
        <h2>Список целей</h2>
        <SearchInput 
          setValueSearchInput={setValueSearchInput} 
          filterItems={arrayProgressStatusesForInput} 
          selectedFilterItem={selectedProgress}
          setSelectedFilterItem={setSelectedProgress}
        />
      </div>
      <div className='to-dos__list'>
        {filteredItems.map((item) => <Todo key={item.id} item={item}/>)}
      </div>
    </div>
  );
}
