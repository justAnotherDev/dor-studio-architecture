/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
import React from 'react'

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment
  return <Layout {...props}>{element}</Layout>
}
