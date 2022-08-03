import React from 'react';
import './App.scss';

function App() {
  return (
    <div className='app'>
      <header className='app__header'>
        <h1>To Do List</h1>
      </header>
      <main>
        <div className='to-do'>
          <div className='to-do__panel'>
            <div className='to-do-item'>
              <div className='to-do-item__text'>
                <p>TODO</p>
              </div>
            </div>
            <button className='to-do__btn btn'>New TODO</button>
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
