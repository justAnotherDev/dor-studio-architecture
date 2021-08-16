import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={1000}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
  </>
)
IndexPage.Layout = Layout
export default IndexPage
