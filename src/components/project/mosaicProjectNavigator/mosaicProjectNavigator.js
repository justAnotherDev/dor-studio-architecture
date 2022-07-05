import React from 'react'
import "./mosaicProjectNavigator.scss"
import Slider from "react-slick"
import CarouselArrow from '../../carouselArrow';
import { GatsbyImage } from 'gatsby-plugin-image';
import ProjectNavigator from '../projectNavigator/projectNavigator';
 
const MosaicProjectNavigator = ({ project, navigation, modalKey, resetModalKey }) => {
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
    initialSlide: modalKey
  };

  return (
    <div className="mpn__wrapper">
      <div className="mpn__header">
        <div className="mpn__slide-number"></div>
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
 
export default MosaicProjectNavigator