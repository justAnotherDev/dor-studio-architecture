import React from "react"
import { styled } from '@mui/material/styles';

const Root = styled('div')((
  {
    theme
  }
) => ({
    width: "100%",
    background: theme.palette.subheader.main,
    padding: "2.5rem 1.875rem",
    color: "white",
    textAlign: "center",
    minHeight: '9.375rem',
    "@media(max-width: 47.9375rem)": {
      padding: "2.5rem 0.9375rem",
    }
}));

const Subheader = ({ subheader }) => {

  return (
    <Root>
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
    </Root>
  );
}

export default Subheader
