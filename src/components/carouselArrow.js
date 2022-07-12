import React, { useEffect } from 'react';
import theme from '../../plugins/custom-mui-theme/theme';
 
const CarouselArrow = ({ prevDirection, shiftAmount, className, onClick }) => {
  const matchingKeyCode = prevDirection ? 37 : 39
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === matchingKeyCode) {
        onClick()
      }
    }
    document.addEventListener("keyup", handleKeyUp)
    return () => document.removeEventListener("keyup", handleKeyUp)
  }, [])
  const styles = {
    iconContainer: {
      position: 'absolute',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.primary.main,
      border: '0.125rem solid',
      cursor: 'pointer',
      zIndex: 10,
      textAlign: 'center',
      transition: 'all 0.4s ease-in-out',
      fontSize: '1.125rem'
    }
  }
  return (
    <div 
      className={`${className}`} 
      onClick={onClick}
      style={prevDirection ? 
          { marginLeft: shiftAmount ? shiftAmount : 0, ...styles.iconContainer } 
        : 
          { marginRight: shiftAmount ? shiftAmount : 0, ...styles.iconContainer }
      }
      role="none"
    >
      <i className={`fa fa-angle-${prevDirection ? 'left' : 'right'}`}></i>
    </div>
  );
}
 
export default CarouselArrow