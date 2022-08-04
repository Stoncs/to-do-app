import React from 'react';

import { InteractionArea, Todos } from './components';
import './App.scss';

const LIST_STATES_APP = {
  EMPTY: '',
  ADDING: 'Добавление новой цели',
  EDITING: 'Редактирование цели',
  VIEWING: 'Просмотр цели'
};

const NO_ACTIVE_ITEM = {id: null, title: '', desciption: '', progress: null};

function App() {
  // items stores a list of todos with information about them
  // item = {id: number, title: string, description: string, progress: number}
  const [items, setItem] = React.useState([]);

  // stores and sets the selected to do item
  const [activeItem, setActiveItem] = React.useState(NO_ACTIVE_ITEM);
  
  const onClickToDo = (item) => {
    setActiveItem(item);
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  // application state (empty || creating || viewing || editing)
  const [stateApp, setStateApp] = React.useState(LIST_STATES_APP.EMPTY);

  // reference to div.app
  const $app = React.useRef();

  // a function that is executed when an event occurs that removes the active element
  const deselectActiveItem = () => {
    setActiveItem(NO_ACTIVE_ITEM);
    setStateApp(LIST_STATES_APP.EMPTY);
    document.body.removeEventListener('click', handleOutsideClick);
    document.body.removeEventListener('keydown', handleKeyDownEsc);
  };

  // a function for the event handler to deselect the active element (click outside)
  const handleOutsideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes($app.current)) {
      deselectActiveItem();
    }
  };

  // a function for the event handler to deselect the active element (press ESC)
  const handleKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      deselectActiveItem();
    }
  };

  // add event listeners on body if active item != null
  React.useEffect(() => {
    if (activeItem.id !== null) {
      document.body.addEventListener('click', handleOutsideClick);
      document.body.addEventListener('keydown', handleKeyDownEsc);
    }
  });

  const onClickSaveButton = (item) => {
    console.log(item);
    setItem([
      ...items,
      item
    ]);
    setActiveItem(item);
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  const onClickAddButton = () => {
    setStateApp(LIST_STATES_APP.ADDING);
  };

  return (
    <div className='app' ref={$app}>
      <main>
        <div className='to-do'>
          <div className='to-do__panel'>
            <Todos items={items} activeItem={activeItem} setActiveItem={onClickToDo}/>
            <div className='to-do__btn'>
              <button className='btn' onClick={onClickAddButton}>New TODO</button>
            </div>
          </div>
          <div className='to-do__interaction-area'>
            <InteractionArea activeItem={activeItem} LIST_STATES_APP={LIST_STATES_APP} stateApp={stateApp} setStateApp={setStateApp} onClickSaveButton={onClickSaveButton} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
