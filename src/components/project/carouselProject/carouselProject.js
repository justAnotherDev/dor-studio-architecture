import { makeStyles } from '@material-ui/core';
import React from 'react'
import Slider from "react-slick"
import CarouselArrow from '../../carouselArrow';
import './carouselProject.scss'
import { GatsbyImage } from 'gatsby-plugin-image';
 
const CarouselProject = ({ project, ...props }) => {
  const classes = carouselProjectStyles(props);
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CarouselArrow prevDirection={true} shiftAmount="1.875rem" />,
    nextArrow: <CarouselArrow prevDirection={false} shiftAmount="1.875rem" />,
    autoplay: true,
    autoplaySpeed: 10000
  };
  return (
    <div className="carousel-project-wrapper">
      <Slider {...settings}>
        {project.images.map((image, i) => (
          <div key={i}>
            <GatsbyImage style={{ height: '70vh', width: '100%' }} image={image.src.childrenImageSharp[0].gatsbyImageData} alt={image?.alt ? image.alt : "alt"} />
          </div>
        ))}
      </Slider>
      <div className="project-wrapper">
        <div className={`container ${classes.container}`}>
          <div className="left-text">
            <h4>Project Data</h4>
            {project.project_data.map((item, i) => (
              <div key={i}>
                <p>{item.header}</p>
                <p>
                  {item.descr.split('\n').map((text, i) => (
                    <React.Fragment key={i}>
                      {text}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <div className="right-text">
            <h4>{project.project_name}</h4>
            {project.descr.map((item, i) => (
              <p style={{ fontStyle: item?.style ? item.style : undefined }} key={i}>{item.text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const carouselProjectStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.lightText
  }
}))
 
export default CarouselProject