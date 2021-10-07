import React from "react"
import "./mosaicProject.scss"
import { GatsbyImage } from 'gatsby-plugin-image';
import { makeStyles } from "@material-ui/core";

const MosaicProject = ({ project }) => {

  return (
    <div className="project-wrapper">
      <div className="project-container mosaic-project">
        <div className="left-container">
          {project.mosaic.map((item, i) => {
            const gridClass = gridStyles(item);
            return (
              <div key={i} className={gridClass.grid}>
                {item.images.map((image, i) => (
                  <GatsbyImage 
                    key={i} 
                    style={{ width: '100%', height: '100%' }} 
                    image={image.src.childrenImageSharp[0].gatsbyImageData} 
                    alt={image?.alt ? image.alt : "alt"} 
                  />
                ))}
              </div>
            )
          })}
        </div>
        <div className="right-container">
          <div className="project-intro">
            <h4>{project.project_name}</h4>
            {project.descr.map((item, i) => (
              <p style={{ fontStyle: item?.style ? item.style : undefined }} key={i}>
                {item.text}
              </p>
            ))}
          </div>
          <div className="project-data" style={{ marginTop: '1.875rem', padding: 0 }}>
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
        </div>
      </div>
    </div>
  )
}

const gridStyles = makeStyles({
  grid: {
    display: 'grid',
    marginBottom: '0.9375rem',
    gap: '0.9375rem',
    gridTemplateColumns: item => '1fr '.repeat(item.columns).trimEnd(),
    '@media(max-width: 61.9375rem)': {
      gridTemplateColumns: '1fr !important'
    }
  }
})

export default MosaicProject
