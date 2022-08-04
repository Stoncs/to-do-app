import React from 'react';

import { InteractionArea, Todos } from './components';
import './App.scss';

const listStatesApp = {
  NOTHING: '',
  ADDING: 'Добавление новой цели',
  EDITING: 'Редактирование цели',
  VIEWING: 'Просмотр цели'
};

const noActiveItem = {id: null, title: '', desciption: '', progress: null};

function App() {
  // items stores a list of todos with information about them
  // item = {id: number, title: string, description: string, progress: number}
  const [items, setItem] = React.useState([]);

  // stores and sets the selected to do item
  const [activeItem, setActiveItem] = React.useState(noActiveItem);
  
  const onClickToDo = (item) => {
    setActiveItem(item);
    setStateApp(listStatesApp.VIEWING);
  };

  const [stateApp, setStateApp] = React.useState(listStatesApp.NOTHING);

  // reference to div.app
  const $app = React.useRef();

  // a function for the event handler to deselect the active element (click outside)
  const handleOutsideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes($app.current)) {
      setActiveItem(noActiveItem);
      setStateApp(listStatesApp.NOTHING);
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('keydown', handleKeyDownEsc);
    }
  };

  // a function for the event handler to deselect the active element (press ESC)
  const handleKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      setActiveItem(noActiveItem);
      setStateApp(listStatesApp.NOTHING);
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('keydown', handleKeyDownEsc);
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
    setStateApp(listStatesApp.VIEWING);
  };

  const onClickAddButton = () => {
    setStateApp(listStatesApp.ADDING);
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
            <InteractionArea activeItem={activeItem} listStatesApp={listStatesApp} stateApp={stateApp} setStateApp={setStateApp} onClickSaveButton={onClickSaveButton} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
