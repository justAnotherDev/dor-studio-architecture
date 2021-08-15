/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { NavContext } from "../../context/NavContext"
import { useLocation } from "@reach/router"

import Header from "../header/header"
import "./layout.scss"
import Footer from "../footer/footer"

const Layout = ({ children }) => {
  
  const [navContext, setNavContext] = useState(useLocation().pathname)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="app">
      <NavContext.Provider value={[navContext, setNavContext]}>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div className="main-wrapper">
          <main>{children}</main>
        </div>
        <Footer />
      </NavContext.Provider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
