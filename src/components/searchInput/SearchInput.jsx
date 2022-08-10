import React from 'react';

import downArrow from './../../assets/icons/down-arrow-svgrepo-com.svg';
import './SearchInput.scss';

export default function SearchInput({setValueSearchInput, objFilterItems, selectedFilterItemObject, setSelectedFilterItemObject}) {
  // isVisiblePopup determines if a popup should be shown
  // Changes when clicking on the icon
  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);

  // Reference to the popup
  const $popup = React.useRef();

  // Function for changing isVisiblePopup
  const toggleVisiblePopup =() => {
    setIsVisiblePopup(!isVisiblePopup);
  };

  // Function on click arrow making popup visible or hide
  const onClickArrow = () => {
    toggleVisiblePopup();
  };
  
  // Function for setting selected item and hide popup
  const onClickPopupItem = (key, value) => {
    const selectedFilterItem = {};
    selectedFilterItem[key] = value;
    setSelectedFilterItemObject(selectedFilterItem);
    toggleVisiblePopup();
  };
  
  // Function for setting class which adds background color to the input field
  // For the function to work, add a class with the name like the key to the css
  const getClassNameBackgroundColorInput = () => {
    const className = Object.keys(selectedFilterItemObject).length ? Object.keys(selectedFilterItemObject)[0] : '';
    return className;
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
      {Object.entries(objFilterItems).map(([key, value]) => <p key={key} className={`${value === selectedFilterItemObject[key] ? 'popup__item-active' : 'popup__item'}`} onClick={() => onClickPopupItem(key, value)}>{value}</p>)}
    </div>
  </form>;
  

}