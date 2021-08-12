import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AppBar, makeStyles } from "@material-ui/core"
import Logo from "../../assets/DOR-Studio-logo.svg"
import "./header.scss"
import gsap from "gsap"

const Header = ({ siteTitle, ...props }) => {
  const classes = headerStyles(props)

  React.useEffect(() => {
    headerIntroAnimation()
  }, [])

  const linkArray = ["Portfolio", "Services", "", "About", "Contact"]

  return (
    <AppBar position="relative">
      <div className={classes.appbar}>
        {linkArray.map((link, i) =>
          i !== 2 ? (
            <Link className={`${classes.link} link`}>
              <div 
                key={i} 
                style={{ opacity: 0 }} 
                className={`header__link-div-${i < 2 ? 'left':'right'}${i}`}
              >
                {link}
              </div>
            </Link>
          ) : (
            <div key={i} style={{ minWidth: "15%", paddingBottom: "15%" }}></div>
          )
        )}
      </div>
      <Link to="/" className="logo">
        <Logo className="draw-logo" />
      </Link>
    </AppBar>
  )
}

const headerIntroAnimation = () => {
  const tl = gsap.timeline()
  gsap.set('.header__link-div-left1, .header__link-div-right3', {
    opacity: 1
  })
  tl.from(".header__link-div-left1, .header__link-div-right3", {
    display: 'none',
    y: 25,
    ease: 'expo.out',
    duration: 0.5
  }).to(".header__link-div-left0, .header__link-div-right4", {
    opacity: 1,
    duration: 0.5
  }).to(".link", {
    color: "unset",
    textShadow: "none",
    stagger: {
      amount: 0.5,
    },
    duration: 0.5,
    delay: 0.5
  })
}

const headerStyles = makeStyles(theme => ({
  appbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
  },
  link: {
    fontWeight: 700,
    fontSize: "0.875rem",
    lineHeight: "7.5rem",
    transition: "all 0.4s ease-in-out",
    position: "relative",
    color: "transparent",
    textShadow: "0 0 5px rgba(176, 101, 40, 0.5)",
    padding: "0.3125rem 0.9375rem",
    "&:hover": {
      textDecoration: "underline",
      color: `${theme.palette.primary.dark} !important`,
      cursor: "pointer",
    },
    "&:after": {
      content: '""',
      width: "0px",
      height: 0,
      border: "2px solid",
      position: "absolute",
      top: "50%",
      marginTop: "20px",
      left: "50%",
      marginLeft: "-2px",
      opacity: 0,
      boxSizing: "border-box",
    },
    "&:hover:after": {
      opacity: 1,
    },
  },
}))

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
