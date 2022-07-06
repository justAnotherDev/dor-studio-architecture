import React, { useEffect, useState } from "react"
import "./mosaicProject.scss"
import { GatsbyImage } from 'gatsby-plugin-image';
import { makeStyles } from "@material-ui/core";
import MosaicProjectNavigator from "../mosaicProjectNavigator/mosaicProjectNavigator";

const MosaicProject = ({ project, navigation }) => {
  const [modalKey, setModalKey] = useState(null)
  const resetModalKey = () => setModalKey(null)
  return (
    <div className="project-wrapper">
      <div className="project-container mosaic-project">
        <div className="left-container">
          {project.mosaic.map((item, mosaicIndex) => {
            const gridClass = gridStyles(item);
            return (
              <div key={mosaicIndex} className={gridClass.grid}>
                {item.images.map((image, i) => (
                  <GatsbyImage 
                    key={i} 
                    style={{ width: '100%', height: '100%' }} 
                    image={image.src.childrenImageSharp[0].gatsbyImageData} 
                    alt={image?.alt ? image.alt : "alt"}
                    onClick={() => {
                      setModalKey(
                        (mosaicIndex > 0
                          ? project.mosaic
                              .slice(0, mosaicIndex)
                              .reduce((s, e) => s + e.images.length, 0)
                          : 0) + i
                      )
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>
        <div className="right-container">
          <div className="project-intro">
            <h4>{project.project_name}</h4>
            {project.descr.map((item, i) => {
              return (
                <div style={{ margin: "0.625rem 0" }}>
                  {item.text.split('\n').map(newLineText => (
                    <div style={{ fontStyle: item.style ? item.style : undefined, whiteSpace:"pre-wrap" }}>
                      {newLineText}
                    </div>
                  ))}
                </div>
            )})}
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
      {modalKey !== null && 
        (
          <MosaicProjectNavigator 
            project={project} 
            navigation={navigation} 
            modalKey={modalKey} 
            resetModalKey={resetModalKey} 
          />
        )
      }
    </div>
  )
}

const gridStyles = makeStyles({
  grid: {
    display: 'grid',
    marginBottom: '0.9375rem',
    gap: '0.9375rem',
    gridTemplateColumns: item => '1fr '.repeat(item.columns).trimEnd(),
    '&:hover': { cursor: "pointer" },
    '@media(max-width: 61.9375rem)': {
      gridTemplateColumns: '1fr !important'
    }
  }
})

export default MosaicProject
