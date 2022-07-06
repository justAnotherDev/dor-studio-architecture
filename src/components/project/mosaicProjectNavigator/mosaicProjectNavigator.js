import React, { useState } from 'react'
import "./mosaicProjectNavigator.scss"
import Slider from "react-slick"
import CarouselArrow from '../../carouselArrow';
import { GatsbyImage } from 'gatsby-plugin-image';
import ProjectNavigator from '../projectNavigator/projectNavigator';
import { makeStyles } from '@material-ui/core';
 
const MosaicProjectNavigator = ({ project, navigation, modalKey, resetModalKey, ...props }) => {
  const classes = mpnStyles(props)
  const [currentSlide, setCurrentSlide] = useState(modalKey + 1)
  const [totalSlides,] = useState(project.mosaic.reduce((s,e) => s + e.images.length, 0))
  
  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CarouselArrow prevDirection={true} shiftAmount="1.875rem" />,
    nextArrow: <CarouselArrow prevDirection={false} shiftAmount="1.875rem" />,
    autoplay: false,
    initialSlide: modalKey,
    beforeChange: (oi, ni) => setCurrentSlide(ni + 1)
  };

  return (
    <div className="mpn__wrapper">
      <div className="mpn__header">
        <div className="mpn__slide-numbers">
          <div className="mpn__slide-fraction">
            <span className={`${classes.extraLightText} mpn__slide-current`}>{`${currentSlide < 10 ? "0":""}${currentSlide}`}</span>
            <span className="mpn__slide-total">{`${totalSlides < 10 ? "0":""}${totalSlides}`}</span>
          </div>
        </div>
        <div className="mpn__title"></div>
        <div className="mpn__close-modal">
          <div className="mpn__close-box" onClick={() => resetModalKey()}></div>
        </div>
      </div>
      <Slider {...settings}>
        {project.mosaic.reduce((a, e) => [...a, ...e.images], []).map((image, i) => (
          <div className="image-wrapper" key={i}>
            <GatsbyImage style={{ width: '100%', height: '100%' }} image={image.src.childrenImageSharp[0].gatsbyImageData} alt={image?.alt ? image.alt : "alt"} />
          </div>
        ))}
      </Slider>
      <ProjectNavigator navigation={navigation} />
    </div>
  );
}

const mpnStyles = makeStyles(theme => ({
  extraLightText: {
    color: theme.palette.extraLightText
  }
}))

export default MosaicProjectNavigator