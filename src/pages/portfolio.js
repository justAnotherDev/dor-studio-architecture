import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { makeStyles } from "@material-ui/core"
import gsap from "gsap"
import "isotope-masonry-horizontal"
import "../styles/index.scss"

const IndexPage = props => {
  const classes = portfolioStyles(props)
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

  // Isotope logic
  const isotope = useRef()
  const [filterKey, setFilterKey] = useState("*")
  const filterBoxEl = useRef()
  useEffect(() => {
    if (typeof window !== undefined) {
      const Isotope = require("isotope-layout")
      isotope.current = new Isotope(".grid", {
        layoutMode: "masonryHorizontal",
        itemSelector: ".grid-item",
        masontryHorizontal: {
          rowHeight: 100,
          gutter: 20,
        },
      })
    }
    return () => {
      if (typeof window !== undefined) isotope.current.destroy()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      filterKey === "*"
        ? isotope.current.arrange({ filter: "*" })
        : isotope.current.arrange({ filter: `.${filterKey}` })
    }
  }, [filterKey])

  const handleFilterKeyChange = (e, key) => {
    animateFilterBox(e.target, true)
    filterBoxEl.current = e.target
    setFilterKey(key)
  }

  // Moving filter box code
  useEffect(() => {
    const animateAfterTransition = setTimeout(
      () => animateFilterBox(document.getElementById("portfolio__all"), false),
      350
    )

    return () => {
      clearTimeout(animateAfterTransition)
      gsap.set(".filter-box", { display: "none" })
    }
  }, [])

  const animateFilterBox = (element, animate) => {
    if (typeof window !== undefined) {
      const { width, height, x, y } = element.getBoundingClientRect()
      const tl = gsap.timeline()
      gsap.set(".filter-box", {
        display: "block",
        border: "0.125rem solid white",
      })
      tl.to(".filter-box", {
        x,
        y: y + window.scrollY,
        width,
        height,
        ease: "expo.out",
        duration: animate ? 0.5 : 0,
      })
    }
  }

  useLayoutEffect(() => {
    function repositionFilterBox() {
      if (filterBoxEl.current) animateFilterBox(filterBoxEl.current, false)
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
    <>
      <Seo title="Portfolio" />
      <div id="filter-wrapper" className={classes.filterWrapper}>
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
      <div class="grid">
        <div class="grid-item grid-item--height2"></div>
        <div class="grid-item grid-item--width2"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item grid-item--width2 grid-item--height2"></div>
        <div class="grid-item grid-item--width2"></div>
        <div class="grid-item grid-item--width2"></div>
        <div class="grid-item grid-item--height2"></div>
        <div class="grid-item"></div>
        <div class="grid-item grid-item--width2"></div>
        <div class="grid-item grid-item--height2"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
      </div>
      {/* <div className="isotope-grid-wrapper">
        <div className="isotope-grid">
          <div className="isotope-grid-sizer"></div>
          {edges.map((item, i) => (
            <div
              className={`isotope-grid-item height${Math.floor(
                Math.random() * (3 - 1) + 1
              )} ${item.node.subheader
                .split(" ")
                .map(key => key.replace(filterKeyRegex, ""))
                .join(" ")}`}
              key={i}
              onClick={() => props.route(`/projects/${item.node.link}`)}
              role="link"
              onKeyDown={e => {
                if (e.code === "Enter")
                  props.route(`/projects/${item.node.link}`)
              }}
            >
              <GatsbyImage
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
      </div> */}
    </>
  )
}

const portfolioStyles = makeStyles(theme => ({
  filterWrapper: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "7.5rem",
    position: "relative",
  },
  filterList: {
    padding: "0 1.875rem",
    listStyle: "none",
    textAlign: "center",
    display: "flex",
    margin: 0,
    flexWrap: "wrap",
  },
  filterListItem: {
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
  filterListItemText: {
    padding: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  overlay: {
    backgroundColor: `${theme.palette.primary.main}CC`,
    inset: 0,
  },
}))

IndexPage.Layout = Layout
export default IndexPage
