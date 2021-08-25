import React, { useContext } from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Subheader from "../components/subheader"
import { makeStyles } from "@material-ui/core"
import { NavContext } from "../context/NavContext"
import { GatsbyImage } from "gatsby-plugin-image"

const IndexPage = props => {
  const classes = servicesStyles(props)
  const [, setNavContext] = useContext(NavContext)
  const data = useStaticQuery(graphql`
    {
      servicesJson {
        subheader {
          title
          points
        }
        info {
          icon
          header
          subheader
          points
          linkText
          link
          remainingText
        }
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
  const servicesData = data.servicesJson
  console.log(servicesData)
  return (
    <>
      <Seo title="Services" />
      <Subheader subheader={servicesData.subheader} />
      <div className={classes.grid}>
        {servicesData.info.map((item, i) => (
          <React.Fragment  key={i}>
            <div className={classes.gridItem}>
              <div className={classes.iconContainer}>
                <i className={item.icon} aria-hidden="true" />
              </div>
              <div className={classes.textContanier}>
                <h5 style={{ textAlign: 'center' }}>{item.header}</h5>
                <p>{item.subheader}</p>
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                {item.link && item.linkText && item.remainingText && (
                  <p>
                    <span
                      onClick={() => setNavContext(item.link)}
                      className="span-link"
                      role="link"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.code === "Enter") setNavContext(item.link)
                      }}
                    >
                      {item.linkText}
                    </span>
                    {` ${item.remainingText}`}
                  </p>
                )}
              </div>
            </div>
            <GatsbyImage image={servicesData.images[i].src.childImageSharp.gatsbyImageData} alt={servicesData.images[i].alt} />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

const servicesStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridAutoFlow: 'column',
    gridTemplateRows: 'repeat(2, auto)',
    gap: "1.875rem",
    width: "100%",
    textTransform: "none",
    marginBottom: '2.1875rem',
    '@media(max-width: 47.9375rem)': {
      gridTemplateColumns: 'none',
      gridTemplateRows: 'none',
      gridAutoFlow: 'unset'
    }
  },
  gridItem: {
    padding: "1.875rem",
    backgroundColor: theme.palette.gridItem,
  },
  iconContainer: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontSize: "2.5em",
    padding: "0 0.625rem",
    lineHeight: "3.125rem",
  },
  textContanier: {
    width: '100%',
    padding: '0 0.625rem'
  }
}))

IndexPage.Layout = Layout
export default IndexPage
