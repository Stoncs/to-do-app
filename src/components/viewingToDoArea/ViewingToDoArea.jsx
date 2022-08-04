import React from 'react';
import PropTypes from 'prop-types';

import './ViewingToDoArea.scss';

export default function ViewingToDoArea({activeItem}) {
  const _getInformation = (obj) => {
    const array = [];
    for (let i in obj) {
      if (i !== 'id') {
        array.push(<div key={i}>{obj[i]}</div>);
      }
    }
    return array;
  };
  return (
    <div>
      <h2>VIEWING</h2>
      {_getInformation(activeItem)}
    </div>
  );
}

ViewingToDoArea.propTypes = {
  activeItem: PropTypes.object.isRequired,
};
