import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import gsap from "gsap"
import usePrevious from "../hooks/usePrevious";
import "../styles/index.scss"
import Overlay from "../components/overlay/overlay";
import { getProjectValue } from "../utils";

const PREFIX = 'Portfolio';

const classes = {
  filterWrapper: `${PREFIX}-filterWrapper`,
  filterList: `${PREFIX}-filterList`,
  filterListItem: `${PREFIX}-filterListItem`,
  filterListItemText: `${PREFIX}-filterListItemText`,
  overlay: `${PREFIX}-overlay`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.filterWrapper}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "7.5rem",
    position: "relative",
  },

  [`& .${classes.filterList}`]: {
    padding: "0 1.875rem",
    listStyle: "none",
    textAlign: "center",
    display: "flex",
    margin: 0,
    flexWrap: "wrap",
  },

  [`& .${classes.filterListItem}`]: {
    padding: "0.5rem 1.5625rem",
    fontSize: "0.75rem",
    position: "relative",
    "&:not(:last-child):after": {
      content: '""',
      width: "0.125rem",
      height: "0.125rem",
      background: "#fff",
      position: "absolute",
      top: "50%",
      right: 0,
    },
    "@media(max-width: 61.9375rem)": {
      padding: "0.5rem 0.4375rem",
    },
  },

  [`& .${classes.filterListItemText}`]: {
    padding: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },

  [`& .${classes.overlay}`]: {
    backgroundColor: `${theme.palette.primary.main}CC`
  }
}));

const IndexPage = ({ route, transitionState }) => {

  const {
    allPortfolioJson: { edges },
  } = useStaticQuery(graphql`
    {
      allPortfolioJson {
        edges {
          node {
            project_name
            project_data {
              header
              descr
            }
            cover_image {
              src {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
              height
            }
            slug
          }
        }
      }
    }
  `)
  const prevTransitionState = usePrevious(transitionState)
  // Isotope logic
  const isotope = useRef()
  const [filterKey, setFilterKey] = useState("*")
  const filterBoxEl = useRef()
  useEffect(() => {
    if (typeof window !== undefined) {
      const Isotope = require("isotope-layout")
      isotope.current = new Isotope(".isotope-grid", {
        itemSelector: ".isotope-grid-item",
        percentPosition: true,
        masontryHorizontal: {
          columnWidth: ".isotope-grid-sizer",
        },
      })
    }
    return () => {
      if (typeof window !== undefined) isotope.current.destroy()
    }
  }, [])

  useEffect(() => {
    if (transitionState === "exit" || transitionState === null) {
      animateFilterBox(document.getElementById("portfolio__all").getBoundingClientRect(), false)
    }
  }, [transitionState])

  useEffect(() => {
    if (typeof window !== "undefined") {
      filterKey === "*"
        ? isotope.current.arrange({ filter: "*" })
        : isotope.current.arrange({ filter: `.${filterKey}` })
      // Page has already loaded and all transitions complete
      if (prevTransitionState === "enter") {
        animateFilterBox(filterBoxEl.current.getBoundingClientRect(), true)
      }
    }
  }, [filterKey, transitionState])

  const handleFilterKeyChange = (e, key) => {
    filterBoxEl.current = e.target
    setFilterKey(key)
  }

  const animateFilterBox = (boundingBox, animate) => {
    if (typeof window !== `undefined`) {
      const { top, left, width, height } = boundingBox
      const scrollTop = document.documentElement.scrollTop
      const offset = document
        .getElementsByTagName("header")[0]
        .getBoundingClientRect().height
      const tl = gsap.timeline()
      gsap.set(".filter-box", {
        border: "0.125rem solid white",
      })
      tl.to(".filter-box", {
        top: top - offset + scrollTop,
        left,
        width,
        height,
        ease: "expo.out",
        duration: animate ? 0.5 : 0,
        onComplete: () => {
          const filterBox = document.getElementsByClassName("filter-box")[0]
          const { offsetLeft, offsetParent } = filterBoxEl.current
          const filterLILeft = offsetLeft + offsetParent.offsetLeft
          if (filterLILeft > filterBox.offsetLeft + 2 || filterBox.offsetLeft > filterLILeft + 2) {
            filterBox.style.left = `${filterLILeft}px`
          }
        }
      })
    }
  }

  useLayoutEffect(() => {
    function repositionFilterBox() {
      if (filterBoxEl.current)
        animateFilterBox(filterBoxEl.current.getBoundingClientRect(), false)
    }
    window.addEventListener("resize", repositionFilterBox)
    return () => window.removeEventListener("resize", repositionFilterBox)
  }, [])
  // End moving filter box code

  const projectTypes = [
    "All",
    ...new Set(
      edges.map(({ node }) => getProjectValue(node, "Project Type").split("\n")).flat()
    ),
  ]

  const filterKeyRegex = /[^A-Za-z0-9]/g

  return (
    (<Root>
      <Seo title="Portfolio" />
      <div id="filter-wrapper" className={classes.filterWrapper}>
        <div className="filter-box"></div>
        <ul className={classes.filterList}>
          {projectTypes.map(listItem => {
            if (listItem === "All") {
              return (
                <li
                  key="All"
                  className={classes.filterListItem}
                  onClick={e => handleFilterKeyChange(e, "*")}
                >
                  <span
                    id="portfolio__all"
                    ref={filterBoxEl}
                    className={classes.filterListItemText}
                  >
                    All
                  </span>
                </li>
              )
            } else {
              return (
                <li
                  key={listItem.replace(filterKeyRegex, "")}
                  className={classes.filterListItem}
                  onClick={e =>
                    handleFilterKeyChange(
                      e,
                      listItem.replace(filterKeyRegex, "")
                    )
                  }
                >
                  <span className={classes.filterListItemText}>{listItem}</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
      <div className="isotope-grid-wrapper">
        <div className="isotope-grid">
          {edges.map(({ node: project }, i) => (
            <div
              className={`isotope-grid-item ${getProjectValue(project, "Project Type")
                .split(" ")
                .map(key => key.replace(filterKeyRegex, ""))
                .join(" ")}`}
              key={i}
              onClick={() => route(`/projects/${project.slug}`)}
              role="link"
              onKeyDown={e => {
                if (e.code === "Enter")
                  route(`/projects/${project.slug}`)
              }}
            >
              <GatsbyImage
                loading="eager"
                image={project.cover_image.src.childImageSharp.gatsbyImageData}
                imgStyle={{ objectFit: "cover" }}
                alt={project.slug}
                style={{ aspectRatio: project.cover_image?.height === "short" ? "16 / 9" : "5 / 6" || "16 / 9" }}
              />
              <Overlay 
                classes={`overlay isotope-grid-item-overlay ${classes.overlay}`} 
                project={project}
                portfolio={true}
              />
            </div>
          ))}
        </div>
      </div>
    </Root>)
  );
}

IndexPage.Layout = Layout
export default IndexPage
