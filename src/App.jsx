import React from 'react';

import { Todos } from './components';
import './App.scss';

const items = [
  {id: 1, text: 'todo'},
  {id: 2, text: 'todo'},
  {id: 3, text: 'todo'},
  {id: 4, text: 'todo'},
  {id: 5, text: 'todo'},
  {id: 6, text: 'todo'},
  {id: 7, text: 'todo'},
  {id: 8, text: 'todo'},
  {id: 9, text: 'todo'},
];

function App() {
  return (
    <div className='app'>
      <header className='app__header'>
        <h1>To Do List</h1>
      </header>
      <main>
        <div className='to-do'>
          <div className='to-do__panel'>
            <Todos items={items}/>
            <div className='to-do__btn'>
              <button className='btn'>New TODO</button>
            </div>

          </div>
          <div className='to-do__edit'>
            <div className='edit'>
              <h2>Edit todo</h2>
              <div className='edit__container'>
                <p>title</p>
                <p>time</p>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
