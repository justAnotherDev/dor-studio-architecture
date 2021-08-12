import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AppBar, makeStyles } from "@material-ui/core"
import Logo from "../../assets/DOR-Studio-logo.svg"
import "./header.scss"
import gsap from "gsap"

const Header = ({ siteTitle, showAppBar, ...props }) => {
  console.log(showAppBar)
  const classes = headerStyles(props)

  useEffect(() => {
    if (typeof window !== undefined && window?.innerWidth > 1024) {
      headerIntroAnimation()
    }
    else {
      gsap.set('.link', {
        color: "unset",
        textShadow: "none"
      })
      gsap.set('.header__link-div-left1, .header__link-div-right3, .header__link-div-left0, .header__link-div-right4', {
        opacity: 1
      })
    }
  }, [])

  const linkArray = ["Portfolio", "Services", "", "About", "Contact"]

  return (
    <AppBar className="header__appbar" position="relative" elevation={0}>
      <div className={classes.appbarwrapper}>
        {linkArray.map((link, i) =>
          i !== 2 ? (
            <Link key={i} to={`/${link.charAt(0).toLowerCase()}${link.substring(1)}`} className={`${classes.link} link`}>
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
