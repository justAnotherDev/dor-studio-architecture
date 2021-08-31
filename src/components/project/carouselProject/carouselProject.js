import { makeStyles } from '@material-ui/core';
import React from 'react'
import './carouselProject.scss'
 
const CarouselProject = ({ project, ...props }) => {
  const classes = carouselProjectStyles(props);
  return (
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
  );
}

const carouselProjectStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.lightText
  }
}))
 
export default CarouselProject