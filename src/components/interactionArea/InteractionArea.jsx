import React from 'react';
import PropTypes from 'prop-types';

import './InteractionArea.scss';
import { EditToDoArea, NewToDoArea, ViewingToDoArea } from '../';

export default function InteractionArea({ activeItem, listStatesApp, stateApp, setStateApp, onClickSaveButton }) {

  // Conditional rendering based on application state
  const renderSwitch = (stateApp) => {
    switch (stateApp) {
    case listStatesApp.EDITING: 
      return <EditToDoArea listStatesApp={listStatesApp} activeItem={activeItem} onClickSaveButton={onClickSaveButton}/>;
    case listStatesApp.ADDING:
      return <NewToDoArea stateApp={stateApp} setStateApp={setStateApp} listStatesApp={listStatesApp} onClickSaveButton={onClickSaveButton}/>;
    case listStatesApp.VIEWING:
      return <ViewingToDoArea activeItem={activeItem} />;
    default: return <div>{stateApp}</div>;
    }
  };
  return (
    <div className='interaction-area'>
      {renderSwitch(stateApp)}
    </div>
  );
}

InteractionArea.propTypes = {
  activeItem: PropTypes.object,
  listStatesApp: PropTypes.object.isRequired,
  stateApp: PropTypes.string.isRequired,
  setStateApp: PropTypes.func.isRequired,
  onClickSaveButton: PropTypes.func.isRequired,
};

InteractionArea.defaultProps = {
  activeItem: null
};