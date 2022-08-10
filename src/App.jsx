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

const PROGRESS_STATUSES = {
  awaiting: 'Ожидает',
  inProgress: 'В процессе',
  completed: 'Выполнена',
};

// An object denoting the absence of an active item
const NO_ACTIVE_ITEM = {id: null, title: '', description: '', progress: ''};

// Input restrictions
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

  // Logic for closing edit panel, create panel and view panel by press esc
  // -------------------------------------------------------------------------------
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
  // -------------------------------------------------------------------------------

  // Logic for changing widths of interaction area and todo panel
  // -------------------------------------------------------------------------
  // References for DOM-elements
  const $toDoPanel = React.useRef();
  const $interactionArea = React.useRef();
  const $resizeLine = React.useRef();

  // Get min possible width of todo panel
  let minWidthToDoPanel;
  React.useEffect(() => {
    minWidthToDoPanel = $toDoPanel.current.offsetWidth;
  }, [$toDoPanel]);

  // Note: I tried wrapping this function in a debounce, but with delay values greater than 5 ms, the resizing lags
  // Function which contributes to changing the width of the panel
  const mouseInterception = React.useCallback((e) => {
    // Necessary for calculating by what value to change the width
    let prevX = e.clientX;

    // Max and min values width of todo panel
    const maxWidthToDoPanel = Math.round(document.body.offsetWidth * 0.9 * 0.5);
    // const minWidthToDoPanel = Math.round(document.body.offsetWidth * 0.9 * 0.3);

    const changeWidth = (e) => {
      // Current x-coordinate of cursor
      const currentX = e.clientX;

      // Current widths of interaction area and todo panel
      const currentWidthInteractionArea = $interactionArea.current.offsetWidth;
      const currentWidthToDoPanel = $toDoPanel.current.offsetWidth;

      const differenceX = currentX - prevX;

      // New widths of interaction area and todo panel
      const newWidthInteractionArea = currentWidthInteractionArea - differenceX;
      const newWidthToDoPanel = currentWidthToDoPanel + differenceX;

      // If the cursor has gone beyond the maximum or minimum value, we do not process
      if (newWidthToDoPanel < minWidthToDoPanel  || currentX > maxWidthToDoPanel) {
        return;
      }

      // Set new widths in styles
      $interactionArea.current.style.width = `${newWidthInteractionArea}px`;
      $toDoPanel.current.style.width = `${newWidthToDoPanel}px`;

      // Set previous value of x-coordinate
      prevX = currentX;
    };

    // Function for removing listeners
    const removeMouseMoveEventListener = () => {
      document.body.removeEventListener('mousemove', changeWidth, false);
      document.body.removeEventListener('mouseup', removeMouseMoveEventListener, false);
    }; 

    // Mousemove wiil change width, mouseup will remove listeners
    document.body.addEventListener('mousemove', changeWidth, false);
    document.body.addEventListener('mouseup', removeMouseMoveEventListener, false);
  });

  const setMinWidthToDoPanel = () => {
    // Set new widths in styles
    $toDoPanel.current.style.width = `${0}px`;
    $interactionArea.current.style.width = `${Number.MAX_SAFE_INTEGER}px`;
  };
  // -------------------------------------------------------------------------

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

      
  // Function on click add button
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
            <div ref={$toDoPanel} className='to-do__panel'>
              <Todos items={items} setItems={setItems} />
              <div className='to-do__btn'>
                <button className='btn' onClick={onClickAddButton}>New TODO</button>
              </div>
            </div>
            <div ref={$interactionArea} className='to-do__interaction-area'>
              <div ref={$resizeLine} className='to-do__resize-line' onMouseDown={(e) => mouseInterception(e)} onDoubleClick={setMinWidthToDoPanel} />
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
