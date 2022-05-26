/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Framer from "../framer"

import Header from "../header/header"
import "./layout.scss"
import Footer from "../footer/footer"
import ToTop from "../totop/totop"

const Layout = props => {
  const [dropDown, setDropDown] = useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  function route(route) {
    if (dropDown) {
      setDropDown(false)
      setTimeout(() => {
        navigate(route)
      }, 300)
    } else navigate(route)
  }

  const childrenWithProps = React.cloneElement(props.children, { route })

  return (
    <div className="app">
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        pathname={props.location.pathname}
        route={route}
        dropDown={dropDown}
        setDropDown={setDropDown}
      />
      <div className="main-wrapper">
        <Framer {...props}>
          <main style={{ height: "100%" }}>{childrenWithProps}</main>
        </Framer>
      </div>
      <Footer route={route} />
      <ToTop />
      <div className="filter-box"></div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
