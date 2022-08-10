import React from 'react';

import Todo from './Todo.jsx';

import './Todos.scss';
import { SearchInput } from '../index.js';

export default function Todos({ items, PROGRESS_STATUSES, PROGRESS_STATUSES_BACKGROUND_COLORS }) {
  const [valueSearchInput, setValueSearchInput] = React.useState('');
  const progressStatusesForInput = {
    all: 'Всем', 
    ...PROGRESS_STATUSES,
  };

  const [selectedProgress, setSelectedProgress] = React.useState(progressStatusesForInput.all);

  const backgroundColorInput = React.useMemo(() => {
    const key = Object.keys(PROGRESS_STATUSES).find((key) => {
      return PROGRESS_STATUSES[key] === selectedProgress;
    });
    return key !== undefined ? PROGRESS_STATUSES_BACKGROUND_COLORS[key] : '';
  }, [selectedProgress]);

  const filterFunction = (item) => {
    if (selectedProgress === progressStatusesForInput.all) {
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
          objFilterItems={progressStatusesForInput} 
          selectedFilterItem={selectedProgress}
          setSelectedFilterItem={setSelectedProgress}
          backgroundColorInput={backgroundColorInput}
        />
      </div>
      <div className='to-dos__list'>
        {filteredItems.map((item) => <Todo key={item.id} item={item}/>)}
      </div>
    </div>
  );
}
