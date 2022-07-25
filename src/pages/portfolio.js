import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import gsap from "gsap"
import usePrevious from "../hooks/usePrevious";
import "../styles/index.scss"

const PREFIX = 'IndexPage';

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
    allHomeJson: { edges },
  } = useStaticQuery(graphql`
    {
      allHomeJson {
        edges {
          node {
            header
            subheader
            src {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
            alt
            link
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
      const offset = document
        .getElementsByTagName("header")[0]
        .getBoundingClientRect().height
      const tl = gsap.timeline()
      gsap.set(".filter-box", {
        border: "0.125rem solid white",
      })
      tl.to(".filter-box", {
        top: top - offset,
        left,
        width,
        height,
        ease: "expo.out",
        duration: animate ? 0.5 : 0,
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
      edges.map(({ node: { subheader } }) => subheader.split(" ")).flat()
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
          <div className="isotope-grid-sizer"></div>
          {edges.map((item, i) => (
            <div
              className={`isotope-grid-item ${item.node.subheader
                .split(" ")
                .map(key => key.replace(filterKeyRegex, ""))
                .join(" ")}`}
              key={i}
              onClick={() => route(`/projects/${item.node.link}`)}
              role="link"
              onKeyDown={e => {
                if (e.code === "Enter")
                  route(`/projects/${item.node.link}`)
              }}
            >
              <GatsbyImage
                loading="eager"
                image={item.node.src.childImageSharp.gatsbyImageData}
                alt={item.node.alt}
              />
              <div
                className={`overlay isotope-grid-item-overlay ${classes.overlay}`}
              >
                <div className="overlay-inner">
                  <div className="overlay-text">
                    <h4 className="text-header">{item.node.header}</h4>
                    <h6 className="text-subheader">{item.node.subheader}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Root>)
  );
}

IndexPage.Layout = Layout
export default IndexPage
