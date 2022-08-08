import React from 'react';

import { EditToDoArea, NewToDoArea, ViewingToDoArea, Todos } from './components';
import Context from './Context';
import './App.scss';

const LIST_APP_STATES = {
  EMPTY: '',
  ADDING: 'Добавление новой цели',
  EDITING: 'Редактирование цели',
  VIEWING: 'Просмотр цели'
};

// 
const PROGRESS_STATUSES = {
  awaiting: 'Ожидает',
  inProgress: 'В процессе',
  completed: 'Выполнена',
};

// An object denoting the absence of an active item
const NO_ACTIVE_ITEM = {id: null, title: '', description: '', progress: ''};

const MAX_LENGTH_TITLE = 50;
const MAX_LENGTH_DESCRIPTION = 300;
const MAX_LINES_DESCRIPTION = 5;

function App() {
  // If local storage not empty getting items, else empty array
  const getInitialValueItems = () => {
    const saved = localStorage.getItem('items');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  };

  // items stores a list of todos with information about them
  // Item = {id: number, title: string, description: string, progress: string}
  const [items, setItems] = React.useState(() => getInitialValueItems());

  // activeItem contains selected item
  const [activeItem, setActiveItem] = React.useState(NO_ACTIVE_ITEM);

  // Application state (empty || creating || viewing || editing)
  const [stateApp, setStateApp] = React.useState(LIST_APP_STATES.EMPTY);

  // ----------------------------------------------
  // Functions for changing state of the application
  const setEmptyState = () => {
    setStateApp(LIST_APP_STATES.EMPTY);
  };

  const setEditingState = () => {
    setStateApp(LIST_APP_STATES.EDITING);
  };

  const setViewingState = () => {
    setStateApp(LIST_APP_STATES.VIEWING);
  };

  const setAddingState = () => {
    setStateApp(LIST_APP_STATES.ADDING);
  };
  // ----------------------------------------------

  // Values to pass to distant child components
  const contextValues = {
    activeItem, setActiveItem, 
    stateApp, setViewingState,
    LIST_APP_STATES, PROGRESS_STATUSES
  };

  // Set items to the local storage
  React.useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
    
  // Reference to stateApp
  const stateAppRef = React.useRef();
  stateAppRef.current = stateApp;

  // Reference to div.app
  const $app = React.useRef();

  // Function that is executed when pressed esc
  const deselectActiveItem = (stateAppArg) => {
    if (stateAppArg === LIST_APP_STATES.ADDING) {
      if (!confirm('Вы не сохранили новую цель. Вы уверены, что хотите выйти?')) return;
    } 
    if (stateAppArg === LIST_APP_STATES.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    setActiveItem(NO_ACTIVE_ITEM);
    setStateApp(LIST_APP_STATES.EMPTY);
    document.body.removeEventListener('keydown', handleKeyDownEsc, false);
  };

  // Function for the event handler to deselect the active element (press ESC)
  const handleKeyDownEsc = React.useCallback((e) => {
    if (e.keyCode === 27) {
      deselectActiveItem(stateAppRef.current);
    }
  }, []);

  // Add event listener on body if active item != null or stateApp === ADDING
  React.useEffect(() => {
    if (activeItem.id !== null || stateApp === LIST_APP_STATES.ADDING) {
      // Before adding, you must remove the listener so that listeners do not accumulate
      document.body.removeEventListener('keydown', handleKeyDownEsc, false);
      document.body.addEventListener('keydown', handleKeyDownEsc, false);
    }
  }, [activeItem, stateApp]);

  // Conditional rendering based on application state
  const getInteractionArea = (stateApp) => {
    switch (stateApp) {
    case LIST_APP_STATES.EDITING: 
      return <EditToDoArea 
        items={items} setItems={setItems}
        activeItem={activeItem} setActiveItem={setActiveItem}
        setViewingState={setViewingState} 
        PROGRESS_STATUSES={PROGRESS_STATUSES}
        MAX_LENGTH_TITLE={MAX_LENGTH_TITLE} 
        MAX_LENGTH_DESCRIPTION={MAX_LENGTH_DESCRIPTION}
        MAX_LINES_DESCRIPTION={MAX_LINES_DESCRIPTION}
      />;
    case LIST_APP_STATES.ADDING:
      return <NewToDoArea 
        items={items} setItems={setItems}
        stateApp={stateApp} setEmptyState={setEmptyState} setViewingState={setViewingState}
        setActiveItem={setActiveItem}
        handleKeyDownEsc={handleKeyDownEsc}
        PROGRESS_STATUSES={PROGRESS_STATUSES} 
        MAX_LENGTH_TITLE={MAX_LENGTH_TITLE} 
        MAX_LENGTH_DESCRIPTION={MAX_LENGTH_DESCRIPTION} 
        MAX_LINES_DESCRIPTION={MAX_LINES_DESCRIPTION}
      />;
    case LIST_APP_STATES.VIEWING:
      return <ViewingToDoArea 
        items={items} setItems={setItems} 
        activeItem={activeItem} setActiveItem={setActiveItem} 
        stateApp={stateApp} setEmptyState={setEmptyState} setEditingState={setEditingState} 
        NO_ACTIVE_ITEM={NO_ACTIVE_ITEM} 
      />;
    }
  };
    
  // function on click add button
  const onClickAddButton = () => {
    if (stateApp === LIST_APP_STATES.EDITING) {
      if (!confirm('Вы не сохранили цель. Вы уверены, что хотите выйти?')) return;
    }
    setActiveItem(NO_ACTIVE_ITEM);
    setAddingState();
  };

  return (
    <Context.Provider value={contextValues}>
      <div className='app' ref={$app}>
        <main>
          <div className='to-do'>
            <div className='to-do__panel'>
              <Todos items={items} setItems={setItems} />
              <div className='to-do__btn'>
                <button className='btn' onClick={onClickAddButton}>New TODO</button>
              </div>
            </div>
            <div className='to-do__interaction-area'>
              <div className='interaction-area'>
                {getInteractionArea(stateApp)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
