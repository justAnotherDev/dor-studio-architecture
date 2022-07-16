import React from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Subheader from "../components/subheader"
import { GatsbyImage } from "gatsby-plugin-image"

const PREFIX = 'IndexPage';

const classes = {
  grid: `${PREFIX}-grid`,
  gridItem: `${PREFIX}-gridItem`,
  iconContainer: `${PREFIX}-iconContainer`,
  textContanier: `${PREFIX}-textContanier`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.grid}`]: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridAutoFlow: "column",
    gridTemplateRows: "repeat(2, auto)",
    gap: "1.875rem",
    width: "100%",
    textTransform: "none",
    marginBottom: "2.1875rem",
    "@media(max-width: 47.9375rem)": {
      gridTemplateColumns: "none",
      gridTemplateRows: "none",
      gridAutoFlow: "unset",
    },
  },

  [`& .${classes.gridItem}`]: {
    padding: "1.875rem",
    backgroundColor: theme.palette.gridItem,
  },

  [`& .${classes.iconContainer}`]: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontSize: "2.5em",
    padding: "0 0.625rem",
    lineHeight: "3.125rem",
  },

  [`& .${classes.textContanier}`]: {
    width: "100%",
    padding: "0 0.625rem",
  }
}));

const IndexPage = ({ route }) => {

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
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)
  const servicesData = data.servicesJson

  return (
    <Root>
      <Seo title="Services" />
      <Subheader subheader={servicesData.subheader} />
      <div className={classes.grid}>
        {servicesData.info.map((item, i) => (
          <React.Fragment key={i}>
            <div className={classes.gridItem}>
              <div className={classes.iconContainer}>
                <i className={item.icon} aria-hidden="true" />
              </div>
              <div className={classes.textContanier}>
                <h5 style={{ textAlign: "center" }}>{item.header}</h5>
                <p>{item.subheader}</p>
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                {item.link && item.linkText && item.remainingText && (
                  <p>
                    <span
                      onClick={() => route(item.link)}
                      className="span-link"
                      role="link"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.code === "Enter") route(item.link)
                      }}
                    >
                      {item.linkText}
                    </span>
                    {` ${item.remainingText}`}
                  </p>
                )}
              </div>
            </div>
            <GatsbyImage
              image={servicesData.images[i].src.childImageSharp.gatsbyImageData}
              alt={servicesData.images[i].alt}
            />
          </React.Fragment>
        ))}
      </div>
    </Root>
  );
}

IndexPage.Layout = Layout
export default IndexPage
