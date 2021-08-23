import { makeStyles } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"

const IndexPage = props => {
  const classes = aboutStyles(props)
  const data = useStaticQuery(graphql`
    {
      allDataJson {
        edges {
          node {
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
      }
    }
  `)
  const aboutData = data.allDataJson.edges[0].node;

  return (
    <>
      <Seo title="About" />
      <div className={classes.subheader}>
        <h4 style={{marginBottom: 0}}>{aboutData.subheader.title}</h4>
        <p>
          <span style={{textTransform: 'none'}}>
            {aboutData.subheader.points.map((point,i) => (
              <React.Fragment key={i}>
                {point}
                <br/>
              </React.Fragment>
            ))}
          </span>
        </p>
      </div>
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
                    <li key={index}>
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
  subheader: {
    width: "100%",
    background: theme.palette.subheader.main,
    padding: "2.5rem 1.875rem",
    color: 'white',
    textAlign: 'center',
    '@media(max-width: 47.9375rem)': {
      padding: '2.5rem 0.9375rem'
    }
  },
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
    backgroundColor: '#eee',
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
