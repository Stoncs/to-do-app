import React from 'react';

import { EditToDoArea, NewToDoArea, ViewingToDoArea, Todos } from './components';
import './App.scss';

const LIST_STATES_APP = {
  EMPTY: '',
  ADDING: 'Добавление новой цели',
  EDITING: 'Редактирование цели',
  VIEWING: 'Просмотр цели'
};

const NO_ACTIVE_ITEM = {id: null, title: '', description: '', progress: ''};

function App() {
  // items stores a list of todos with information about them
  // item = {id: number, title: string, description: string, progress: string}
  const [items, setItems] = React.useState((() => {
    // getting stored value
    const saved = localStorage.getItem('items');
    const initialValue = JSON.parse(saved);
    console.log(initialValue);
    return initialValue || [];
  }));

  // stores and sets the selected to do item
  const [activeItem, setActiveItem] = React.useState(NO_ACTIVE_ITEM);
  
  // function for selecting to do
  const selectItem = (item) => {
    if (stateApp === LIST_STATES_APP.ADDING) {
      if (!confirm('Вы не сохранили новую цель. Вы уверены, что хотите выйти?')) return;
    } 
    if (stateApp === LIST_STATES_APP.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    setActiveItem(item);
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  // application state (empty || creating || viewing || editing)
  const [stateApp, setStateApp] = React.useState(LIST_STATES_APP.EMPTY);
  const stateRef = React.useRef();
  stateRef.current = stateApp;
  // state in order to understand if an event listener is hanging on the body
  const [isEventListenerActive, setEventListenerActive] = React.useState(false);


  // reference to div.app
  const $app = React.useRef();

  // a function that is executed when an event occurs that removes the active element
  const deselectActiveItem = React.useCallback(() => {
    if (stateRef.current === LIST_STATES_APP.ADDING) {
      if (!confirm('Вы не сохранили новую цель. Вы уверены, что хотите выйти?')) return;
    } 
    if (stateRef.current === LIST_STATES_APP.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    setActiveItem(NO_ACTIVE_ITEM);
    setStateApp(LIST_STATES_APP.EMPTY);
    document.body.removeEventListener('keydown', handleKeyDownEsc, false);
    setEventListenerActive(false);
  }, []);

  // a function for the event handler to deselect the active element (press ESC)
  const handleKeyDownEsc = React.useCallback((e) => {
    if (e.keyCode === 27) {
      deselectActiveItem(stateRef.current);
    }
  }, []);

  // add event listener on body if active item != null
  React.useEffect(() => {
    if ((activeItem.id !== null || stateApp === LIST_STATES_APP.ADDING) && !isEventListenerActive) {  
      document.body.addEventListener('keydown', handleKeyDownEsc, false);
      console.log('add eventListener');
      setEventListenerActive(true);
    }
  }, [activeItem, stateApp]);

  // set items to the local storage
  React.useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // function for adding new to do
  const addNewToDo = (newItem) => {
    setItems([
      ...items,
      newItem
    ]);
    setActiveItem(newItem);
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  // set state app = edditing
  const editToDo = () => {
    setStateApp(LIST_STATES_APP.EDITING);
  };

  const setViewingState = () => {
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  // function for saving edited to do
  const saveEditedToDo = (editedItem) => {
    setItems([
      ...items.map((item) => item.id !== editedItem.id ? item : editedItem),
    ]);
    setActiveItem(editedItem);
    setStateApp(LIST_STATES_APP.VIEWING);
  };

  // function for delete to do
  const deleteToDo = (deletingItemId) => {
    setItems([
      ...items.filter((item) => item.id !== deletingItemId)
    ]);
    setActiveItem(NO_ACTIVE_ITEM);
    setStateApp(LIST_STATES_APP.EMPTY);
  };
  // function on click add button
  const onClickAddButton = () => {
    if (stateApp === LIST_STATES_APP.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    setActiveItem(NO_ACTIVE_ITEM);
    setStateApp(LIST_STATES_APP.ADDING);
  };

  // Conditional rendering based on application state
  const renderSwitch = (stateApp) => {
    switch (stateApp) {
    case LIST_STATES_APP.EDITING: 
      return <EditToDoArea  activeItem={activeItem} saveEditedToDo={saveEditedToDo} setViewingState={setViewingState} />;
    case LIST_STATES_APP.ADDING:
      return <NewToDoArea stateApp={stateApp} setStateApp={setStateApp} STATE_EMPTY={LIST_STATES_APP.EMPTY} addNewToDo={addNewToDo}/>;
    case LIST_STATES_APP.VIEWING:
      return <ViewingToDoArea activeItem={activeItem} editToDo={editToDo} deleteToDo={deleteToDo} />;
    default: return <div>{stateApp}</div>;
    }
  };

  return (
    <div className='app' ref={$app}>
      <main>
        <div className='to-do'>
          <div className='to-do__panel'>
            <Todos items={items} activeItem={activeItem} setActiveItem={selectItem}/>
            <div className='to-do__btn'>
              <button className='btn' onClick={onClickAddButton}>New TODO</button>
            </div>
          </div>
          <div className='to-do__interaction-area'>
            <div className='interaction-area'>
              {renderSwitch(stateApp)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
