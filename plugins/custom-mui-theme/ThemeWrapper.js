import * as React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme.js"

export default function ThemeWrapper(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

ThemeWrapper.propTypes = {
  children: PropTypes.node,
}
