import React from 'react';

import Todo from './Todo.jsx';

import './Todos.scss';
import { SearchInput } from '../index.js';

export default function Todos({ items, PROGRESS_STATUSES }) {
  // Value of the search input
  const [valueSearchInput, setValueSearchInput] = React.useState('');
  // Object for set filtering
  const progressStatusesForInput = {
    all: 'Всем', 
    ...PROGRESS_STATUSES,
  };

  // selectedProgressObject - Object
  const [selectedProgressObject, setSelectedProgressObject] = React.useState({all: 'Всем'});

  const filterFunction = (item) => {
    // Get value of selected progress
    const valueSelectedProgress = Object.entries(selectedProgressObject)[0][1];
    
    if (valueSelectedProgress === progressStatusesForInput.all) {
      // Filtering on all elements
      return item.title.toLowerCase().includes(valueSearchInput);
    } else {
      // Filtering by elements of only the selected progress
      return item.progress === valueSelectedProgress && item.title.toLowerCase().includes(valueSearchInput);
    }
  };

  const filteredItems = items.filter((item) => filterFunction(item));

  return (
    <div className='to-dos'>
      <div className='to-dos__header'>
        <h2>Список целей</h2>
        <SearchInput 
          setValueSearchInput={setValueSearchInput} 
          objFilterItems={progressStatusesForInput} 
          selectedFilterItemObject={selectedProgressObject}
          setSelectedFilterItemObject={setSelectedProgressObject}
        />
      </div>
      <div className='to-dos__list'>
        {filteredItems.map((item) => <Todo key={item.id} item={item}/>)}
      </div>
    </div>
  );
}
