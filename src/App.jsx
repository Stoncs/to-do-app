import React from 'react';

import { EditArea, Todos } from './components';
import './App.scss';

// const stateApp = {
//   NOTHING: 'nothing',
//   ADDING: 'adding',
//   EDITING: 'edditing',
// };

function App() {
  // items stores a list of todos with information about them
  const [items, setItem] = React.useState([]);

  const [activeItem, setActiveItem] = React.useState({id: null, text: null});

  // reference to div.app
  const $app = React.useRef();

  // a function for the event handler to deselect the active element (click outside)
  const handleOutsideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes($app.current)) {
      setActiveItem({id: null, text:null});
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('keydown', handleKeyDownEsc);
    }
    console.log('click');
  };

  // a function for the event handler to deselect the active element (press ESC)
  const handleKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      setActiveItem({id: null, text:null});
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('keydown', handleKeyDownEsc);
    }
    console.log('press');
  };

  // add event listener on body if active item != null
  React.useEffect(() => {
    if (activeItem.id !== null) {
      document.body.addEventListener('click', handleOutsideClick);
      document.body.addEventListener('keydown', handleKeyDownEsc);
    }
  });

  const onClickAddButton = () => {
    setItem([...items,{
      id: Date.now(),
      text: 'todo',
    }]);
  };

  return (
    <div className='app' ref={$app}>
      <main>
        <div className='to-do'>
          <div className='to-do__panel'>
            <Todos items={items} activeItem={activeItem} setActiveItem={setActiveItem}/>
            <div className='to-do__btn'>
              <button className='btn' onClick={() => onClickAddButton()}>New TODO</button>
            </div>

          </div>
          <div className='to-do__edit-area'>
            <EditArea activeItem={activeItem}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
