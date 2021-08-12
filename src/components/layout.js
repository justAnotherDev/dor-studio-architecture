/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header/header"
import "./layout.scss"

const Layout = ({ children }) => {
  const [windowThreshold, setWindowThreshold] = useState(null)

  useEffect(() => {
    if (typeof window !== undefined) {
      window.innerWidth > 1024 ? setWindowThreshold(true) : setWindowThreshold(false)
      window.addEventListener('resize', checkWindowSize)
    }
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('resize', checkWindowSize)
      }
    }
  }, [])

  function checkWindowSize() {
    if(typeof window !== undefined) {
      console.log(window.innerWidth)
      console.log(windowThreshold)
      if (window.innerWidth > 1024 && !windowThreshold) {
        console.log('trying to hit this')
        setWindowThreshold(true)
      }
      else if (window.innerWidth <= 1024 && windowThreshold) {
        setWindowThreshold(false)
      }
    }
  }
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  if (windowThreshold === null) return null

  return (
    <>
      <Header showAppBar={windowThreshold} siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
