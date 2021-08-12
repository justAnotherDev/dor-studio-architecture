import * as React from "react"

import Wrapper from "../components/wrapper"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Wrapper>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Wrapper>
)

export default NotFoundPage
