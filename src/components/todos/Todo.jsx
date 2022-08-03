import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';

export default function Todo({item}) {
  return (
    <div className='to-do-item'>
      <div className='to-do-item__text'>
        <p>{item.text}</p>
      </div>
    </div>
  );
}

Todo.propTypes = {
  item: PropTypes.object.isRequired
};