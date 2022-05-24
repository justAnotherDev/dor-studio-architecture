import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core"
import gsap from "gsap"
import Isotope from "isotope-layout"

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
                gatsbyImageData(
                  transformOptions: { cropFocus: CENTER }
                  width: 460
                  height: 636
                  placeholder: BLURRED
                )
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
  // const isotope = useRef()
  const [filterKey, setFilterKey] = useState("*")
  const filterBoxEl = useRef()
  // useEffect(() => {
  //   isotope.current = new Isotope(".filter-container", {
  //     itemSelector: ".filter-item",
  //     layoutMode: "masonryHorizontal",
  //     masontryHorizontal: {
  //       gutter: 15,
  //     },
  //   })
  //   return () => isotope.current.destroy()
  // }, [])

  // useEffect(() => {
  //   filterKey === "*"
  //     ? isotope.current.arrange({ filter: "*" })
  //     : isotope.current.arrange({ filter: `.${filterKey}` })
  // }, [filterKey])

  const handleFilterKeyChange = (e, key) => {
    animateFilterBox(e.target.getBoundingClientRect(), true)
    filterBoxEl.current = e.target
    setFilterKey(key)
  }

  useEffect(() => {
    animateFilterBox(
      document.getElementById("portfolio__all").getBoundingClientRect(),
      false
    )
  }, [])

  const animateFilterBox = (boundingBox, animate) => {
    const { x, y, width, height } = boundingBox
    const offset = document
      .getElementById("filter-wrapper")
      .getBoundingClientRect().bottom
    const tl = gsap.timeline()
    gsap.set(".filter-box", {
      border: "0.125rem solid white",
    })
    tl.to(".filter-box", {
      x,
      y: y - offset,
      width,
      height,
      ease: "expo.out",
      duration: animate ? 0.5 : 0,
    })
  }

  useLayoutEffect(() => {
    function repositionFilterBox() {
      if (filterBoxEl.current)
        animateFilterBox(filterBoxEl.current.getBoundingClientRect(), false)
    }
    window.addEventListener("resize", repositionFilterBox)
    return () => window.removeEventListener("resize", repositionFilterBox)
  }, [])

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
      <div className="filter-box"></div>
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
}))

IndexPage.Layout = Layout
export default IndexPage
