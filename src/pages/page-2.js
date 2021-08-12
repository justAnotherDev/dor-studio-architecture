import * as React from "react"
import { Link } from "gatsby"

import Wrapper from "../components/wrapper"
import Seo from "../components/seo"

const SecondPage = () => (
  <Wrapper>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Wrapper>
)

export default SecondPage
