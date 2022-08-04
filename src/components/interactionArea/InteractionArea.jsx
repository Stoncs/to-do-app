import React from 'react';
import PropTypes from 'prop-types';

import './InteractionArea.scss';
import { EditToDoArea, NewToDoArea, ViewingToDoArea } from '../';

export default function InteractionArea({ activeItem, LIST_STATES_APP, stateApp, setStateApp, onClickSaveButton }) {

  // Conditional rendering based on application state
  const renderSwitch = (stateApp) => {
    switch (stateApp) {
    case LIST_STATES_APP.EDITING: 
      return <EditToDoArea listStatesApp={LIST_STATES_APP} activeItem={activeItem} onClickSaveButton={onClickSaveButton}/>;
    case LIST_STATES_APP.ADDING:
      return <NewToDoArea stateApp={stateApp} setStateApp={setStateApp} STATE_EMPTY={LIST_STATES_APP.EMPTY} onClickSaveButton={onClickSaveButton}/>;
    case LIST_STATES_APP.VIEWING:
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

// types of props
InteractionArea.propTypes = {
  activeItem: PropTypes.object,
  LIST_STATES_APP: PropTypes.object.isRequired,
  stateApp: PropTypes.string.isRequired,
  setStateApp: PropTypes.func.isRequired,
  onClickSaveButton: PropTypes.func.isRequired,
};

InteractionArea.defaultProps = {
  activeItem: null
};