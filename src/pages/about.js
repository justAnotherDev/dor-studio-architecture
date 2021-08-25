import { makeStyles } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import Subheader from "../components/subheader"

const IndexPage = props => {
  const classes = aboutStyles(props)
  const data = useStaticQuery(graphql`
    {
      aboutJson {
        name
        role
        subheader {
          title
          points
        }
        experience {
          header
          points {
            text
            linkText
            link
          }
        }
        other_persuits
        images {
          alt
          src {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `)
  const aboutData = data.aboutJson;

  return (
    <>
      <Seo title="About" />
      <Subheader subheader={aboutData.subheader} />
      <div className={classes.aboutWrapper}>
        <div style={{display: 'flex', justifyContent:'flex-end'}} className={classes.aboutContainer}>
            <div className={classes.aboutPaddingContainer}>
              <div className={classes.aboutImageContainer}>
                {aboutData.images.map((image, idx) => (
                  <div key={idx} style={{margin: '0.9375rem 0'}}>
                    <GatsbyImage 
                      image={image.src.childImageSharp.gatsbyImageData} 
                      alt={image.alt} 
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className={classes.aboutContainer}>
          <div className={classes.aboutPaddingContainer}>
            <h4 style={{textTransform: 'uppercase', paddingTop: '0.3rem'}}>{aboutData.name}</h4>
            <h4><em>{aboutData.role}</em></h4>
            <p><b>EXPERIENCE</b></p>
            {aboutData.experience.map((experience,indx) =>(
              <React.Fragment key={indx}>
                <p><b>{experience.header}</b></p>
                <ul>
                  {experience.points && experience.points.map((point, index) => (
                    <li style={{lineHeight: '1.3125rem'}} key={index}>
                      {point.link && point.linkText ?
                        <>
                          <a 
                            className={classes.link}
                            style={{textDecoration: 'none'}} 
                            href={point.link} 
                            target="_blank" 
                            rel="noreferrer">{point.linkText}
                          </a>
                          <span>{` ${point.text}`}</span>
                        </>
                      :
                        <span>{point.text}</span>
                      }
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
            <p><b>OTHER PURSUITS</b></p>
            <p>{aboutData.other_persuits}</p>
          </div>
        </div>
      </div>
    </>
  )
}
const aboutStyles = makeStyles(theme => ({
  aboutWrapper: {
    width: '100%',
    marginBottom: '1.875rem',
    display: 'flex',
    justifyContent: 'space-between',
    '@media(max-width: 47.9375rem)': {
      flexDirection: 'column',
      marginBottom: 0
    }
  },
  aboutImageContainer: {
    width: '100%'
  },
  aboutContainer: {
    backgroundColor: theme.palette.gridItem,
    padding: '2.3rem 1.875rem 1.875rem',
    width: 'calc(50% - 0.9375rem)',
    textTransform: 'none',
    '@media(max-width: 47.9375rem)': {
      width: '100%',
      marginBottom: '1.875rem'
    }
  },
  aboutPaddingContainer: {
    padding: '0 0.625rem',
    width: '100%',
    '&:first-child': {
      width: '80%'
    },
    '@media(max-width: 47.9375rem)': {
      '&:first-child': {
        width: '100%'
      }
    }
  },
  link: {
    color: theme.palette.link,
    '&:visited': {
      color: theme.palette.link
    }
  }
}))
IndexPage.Layout = Layout
export default IndexPage
