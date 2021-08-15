import React, { useContext } from "react"
import { NavContext } from "../../context/NavContext"
import { makeStyles } from "@material-ui/core"
import "./footer.scss"
import { useStaticQuery, graphql, Link } from "gatsby"

const Footer = props => {
  const [,setNavContext] = useContext(NavContext)
  const footerData = useStaticQuery(graphql`
    {
      allFooterJson {
        edges {
          node {
            id
            header
            descr
            link
            linkDescr
            mailto
          }
        }
      }
    }
  `)
  const classes = footerStyles(props)
  return (
    <footer className={classes.footer}>
      {footerData.allFooterJson.edges.map(({ node }) => (
        <div key={node.id} className={classes.footerItem}>
          <p>
            <span style={{ color: "white" }}>
              {node.header}
              <br />
              ____
            </span>
          </p>
          <p>
            <span style={{ color: "white", textTransform: "none" }}>
              {node.mailto && (
              <>
                E:&nbsp;
                <a style={{color: 'white', textDecoration: 'none', whiteSpace: 'nowrap'}} href={`mailto:${node.mailto}`}>{node.mailto}</a>
                <br/>
              </>
              )}
              {node.descr.split('\n').map((text,i) => {
                return (
                  <React.Fragment key={i}>  
                    {text}
                    <br/>
                  </React.Fragment>  
                )
              })}
              {node.link && (
                <span 
                  onClick={() => setNavContext([node.link, true])} 
                  className={classes.footerLink}
                  role="link"
                  tabIndex={0}
                >
                  {node.linkDescr}
                </span>
              )}
            </span>
          </p>
        </div>
      ))}
      <div className={classes.footerItem}>
        <p>
          <span style={{ color: 'white', textTransform: 'none' }}>
            ALL RIGHTS&nbsp;&copy;&nbsp;{new Date().getFullYear()}
            <br/>
            DOR Studio Architecture
          </span>
        </p>
      </div>
    </footer>
  )
}

const footerStyles = makeStyles(theme => ({
  footer: {
    width: "100%",
    background: theme.palette.footer.main,
    padding: "1.875rem 0.9375rem",
    display: "flex",
    '@media(max-width:47.9375rem)': {
      flexDirection: 'column',
      padding: '0.9375rem 0'
    }
  },
  footerItem: {
    padding: "0 0.9375rem 0 1.25rem",
    width: "25%",
    '@media(max-width:47.9375rem)': {
      marginBottom: '1.25rem',
      width: '100%'
    }
  },
  footerLink: {
    color: 'white',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    }
  },
}))

export default Footer
