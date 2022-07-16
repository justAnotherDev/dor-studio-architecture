import { styled } from '@mui/material/styles';
import React from 'react'
import Slider from "react-slick"
import CarouselArrow from '../../carouselArrow';
import './carouselProject.scss'
import { GatsbyImage } from 'gatsby-plugin-image';

const PREFIX = 'CarouselProject';

const classes = {
  container: `${PREFIX}-container`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    color: theme.palette.lightText
  }
}));

const CarouselProject = ({ project }) => {

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
    <Root className="carousel-project-wrapper">
      <Slider {...settings}>
        {project.images.map((image, i) => (
          <div className="image-wrapper" key={i}>
            <GatsbyImage style={{ width: '100%', height: '100%' }} image={image.src.childrenImageSharp[0].gatsbyImageData} alt={image?.alt ? image.alt : "alt"} />
          </div>
        ))}
      </Slider>
      <div className="project-wrapper">
        <div className={`project-container ${classes.container}`}>
          <div className="left-text project-data">
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
          <div className="right-text project-intro">
            <h4>{project.project_name}</h4>
            {project.descr.map((item, i) => (
              <p style={{ fontStyle: item?.style ? item.style : undefined }} key={i}>{item.text}</p>
            ))}
          </div>
        </div>
      </div>
    </Root>
  );
}

export default CarouselProject