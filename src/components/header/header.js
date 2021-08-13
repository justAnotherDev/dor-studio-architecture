import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AppBar, makeStyles, withStyles } from "@material-ui/core"
import Logo from "../../../assets/DOR-Studio-logo.svg"
import "./header.scss"
import gsap from "gsap"
import theme from '../../../plugins/custom-mui-theme/theme';

const Header = ({ siteTitle, showAppBar, ...props }) => {
  const classes = headerStyles(props)
  const [currentNav, setCurrentNav] = useState(null)

  useEffect(() => {
    if (typeof window !== undefined) {
      setCurrentNav(window.location.pathname)
      if (window.innerWidth > 1024 && window.location.pathname === '/') headerIntroAnimation()
      else {
        gsap.set('.link', {
          color: "unset",
          textShadow: "none"
        })
        gsap.set('.header__link-div-left1, .header__link-div-right3, .header__link-div-left0, .header__link-div-right4', {
          opacity: 1
        })
      }
    }
  }, [])

  const linkArray = ["Portfolio", "Services", "", "About", "Contact"]

  function changeHighlightedLink(localLink) {
    setCurrentNav(localLink)
  }

  return (
    <AppBar position="relative" elevation={0}>
      <div className={classes.appbarwrapper}>
        {linkArray.map((link, i) => {
          const localLink = `/${link.charAt(0).toLowerCase()}${link.substring(1)}`;
          const match = localLink === currentNav;
          return (
            i !== 2 ? (
              <Link 
                key={i} 
                to={localLink} 
                className={`${classes.link} link ${match && classes.currentLink}`}
                onClick={() => changeHighlightedLink(localLink)}
              >
                <div  
                  style={{ opacity: 0 }} 
                  className={`header__link-div-${i < 2 ? 'left':'right'}${i}`}
                >
                  {link}
                </div>
              </Link>
            ) : (
              <div key={i} style={{ minWidth: "15%", paddingBottom: "15%" }}></div>
            )
          )
        })}
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
  appbarwrapper: {
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
    textDecoration: 'none',
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
    }
  },
  currentLink: {
    color: `${theme.palette.primary.main} !important`,
    "&:after": {
      opacity: 1
    }
  }
}))

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
