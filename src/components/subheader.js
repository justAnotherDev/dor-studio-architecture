import React from "react"
import { makeStyles } from "@material-ui/core"

const Subheader = ({ subheader, ...props }) => {
  const classes = subheaderStyles(props)
  return (
    <div className={classes.subheader}>
      <h4 style={{ marginBottom: 0 }}>{subheader.title}</h4>
      <p>
        <span style={{ textTransform: "none" }}>
          {subheader.points.map((point, i) => (
            <React.Fragment key={i}>
              {point}
              <br />
            </React.Fragment>
          ))}
        </span>
      </p>
    </div>
  )
}

const subheaderStyles = makeStyles(theme => ({
  subheader: {
    width: "100%",
    background: theme.palette.subheader.main,
    padding: "2.5rem 1.875rem",
    color: "white",
    textAlign: "center",
    "@media(max-width: 47.9375rem)": {
      padding: "2.5rem 0.9375rem",
    }
  },
}))

export default Subheader
