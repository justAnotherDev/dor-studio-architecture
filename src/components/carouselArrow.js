import React from 'react';
import theme from '../../plugins/custom-mui-theme/theme';
 
const CarouselArrow = ({ prevDirection, className, onClick }) => {
  const styles = {
    iconContainer: {
      position: 'absolute',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '50%',
      color: theme.palette.primary.main,
      border: '0.125rem solid',
      cursor: 'pointer',
      zIndex: 10,
      textAlign: 'center',
      transition: 'all 0.4s ease-in-out',
      fontSize: '1.125rem',
      '&:hover': {
        background: '#fff'
      }
    }
  }
  return (
    <div 
      className={`${className}`} 
      onClick={onClick}
      style={prevDirection ? { left: '0px', ...styles.iconContainer } : { right: '0px', ...styles.iconContainer }}
      role="none"
    >
      <i className={`fa fa-angle-${prevDirection ? 'left' : 'right'}`}></i>
    </div>
  );
}
 
export default CarouselArrow