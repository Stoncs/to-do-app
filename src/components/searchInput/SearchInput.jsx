import React from 'react';

import downArrow from './../../assets/icons/down-arrow-svgrepo-com.svg';
import './SearchInput.scss';

export default function SearchInput({setValueSearchInput, objFilterItems, selectedFilterItem, setSelectedFilterItem, backgroundColorInput }) {
  // isVisiblePopup determines if a popup should be shown
  // Changes when clicking on the icon
  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
  // Chosen item in popup for filtration 
  const filterItems = Object.values(objFilterItems);

  const $popup = React.useRef();

  const toggleVisiblePopup =() => {
    setIsVisiblePopup(!isVisiblePopup);
  };

  // I tried to close the popup on a click outside its block, but for some reason
  // the click event fires immediately (and immediately removes the event listener),
  // without changing isVisiblePopup
  // const onClickOutside = React.useCallback((e) => {
  //   const path = e.path || (e.composedPath && e.composedPath());
  //   if (!path.includes($popup)) {
  //     setIsVisiblePopup(!isVisiblePopup);
  //     document.body.removeEventListener('click', onClickOutside, false);
  //   }
  // }, []);

  const onClickArrow = () => {
    toggleVisiblePopup();
  };

  const onClickPopupItem = (value) => {
    setSelectedFilterItem(value);
    setIsVisiblePopup(false);
  };

  const getClassNameBackgroundColorInput = () => {
    switch (backgroundColorInput) {
    case '#ffe2dd':
      return 'awaiting';
    case '#fdecc8':
      return 'in-progress';
    case '#dbeddb':
      return 'completed';
    default: 
      return '';
    }
  };

  return <form onSubmit={e => e.preventDefault()} className='form-search-input'>
    <input 
      type="search"
      className={`form-search-input__input ${getClassNameBackgroundColorInput()}`}
      placeholder='Поиск...'
      onChange={(e) => setValueSearchInput(e.target.value)}
    />
    <img 
      src={downArrow} 
      className={`form-search-input__arrow ${isVisiblePopup ? 'rotated' : ''}`} 
      onClick={onClickArrow}
    />
    <div ref={$popup} className={`form-search-input__popup ${isVisiblePopup ? 'visible' : ''}`} >
      <p className='popup__title'>Поиск по:</p>
      {filterItems.map((value) => <p key={value} className={`${value === selectedFilterItem ? 'popup__item-active' : 'popup__item'}`} onClick={() => onClickPopupItem(value)}>{value}</p>)}
    </div>
  </form>;
  

}