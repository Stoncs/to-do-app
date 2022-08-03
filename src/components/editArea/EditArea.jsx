import React from 'react';
import PropTypes from 'prop-types';

import './EditArea.scss';

export default function EditArea({activeItem}) {
  return (
    <div className='edit-area'>
      <h2>Edit todo</h2>
      <div className='edit-area__container'>
        {activeItem !== null ? <p>{activeItem.text}</p> : ''}
        {activeItem !== null ? <p>{activeItem.id}</p> : ''}
      </div>
    </div>
  );
}

EditArea.propTypes = {
  activeItem: PropTypes.object,
};

EditArea.defaultProps = {
  activeItem: null
};