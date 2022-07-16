import React, { useEffect } from "react"
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AppBar, Collapse } from "@mui/material";
import Logo from "../../../assets/DOR-Studio-logo.svg"
import "./header.scss"
import gsap from "gsap"

const PREFIX = 'Header';

const classes = {
  appbarwrapper: `${PREFIX}-appbarwrapper`,
  link: `${PREFIX}-link`,
  currentLink: `${PREFIX}-currentLink`,
  menuwrapper: `${PREFIX}-menuwrapper`,
  menu: `${PREFIX}-menu`,
  hamburgerwrapper: `${PREFIX}-hamburgerwrapper`,
  linkContainer: `${PREFIX}-linkContainer`,
  menuLink: `${PREFIX}-menuLink`
};

const StyledAppBar = styled(AppBar)((
  {
    theme
  }
) => ({
  [`& .${classes.appbarwrapper}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    '@media(max-width: 64.0625rem)': {
      display: 'none'
    }
  },

  [`& .${classes.link}`]: {
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

  [`& .${classes.currentLink}`]: {
    color: `${theme.palette.primary.main} !important`,
    "&:after": {
      opacity: 1
    }
  },

  [`& .${classes.menuwrapper}`]: {
    width: '100%',
    display: 'none',
    background: '#fff',
    '@media(max-width: 64.0625rem)': {
      display: 'block !important'
    }
  },

  [`& .${classes.menu}`]: {
    width: '100%',
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0.625rem'
  },

  [`& .${classes.hamburgerwrapper}`]: {
    width: '0.965rem', 
    margin: '0.84375rem 0.625rem',
    height: '1.125rem',
    transform: 'translateY(.275rem)',
    outline: 'none',
    boxShadow: 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  [`& .${classes.linkContainer}`]: {
    borderWidth: `0 0.625rem`,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    textAlign: 'center',
    padding: '0.9375rem 0.9375rem 1.5625rem 0.9375rem',
    listStyle: 'none',
    margin: 0
  },

  [`& .${classes.menuLink}`]: {
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    margin: 0,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const Header = ({ siteTitle, pathname, dropDown, setDropDown, route }) => {

  useEffect(() => {
    if (typeof window !== undefined) {
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

  return (
    <StyledAppBar position="relative" elevation={0}>
      <div 
        role="link" 
        tabIndex={0} 
        onClick={() => route("/")} 
        to="/" 
        className="logo"
        onKeyDown={(e) => { if (e.code === 'Enter') route("/")}}
      >
        <Logo className="draw-logo" />
      </div>
      <div className={classes.appbarwrapper}>
        {linkArray.map((link, i) => {
          const localLink = `/${link.charAt(0).toLowerCase()}${link.substring(1)}/`;
          const match = pathname?.startsWith(localLink);
          return (
            i !== 2 ? (
              <Link 
                key={i} 
                to={localLink} 
                className={`${classes.link} link ${match && classes.currentLink}`}
                onClick={() => route(localLink)}
                tabIndex={0}
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
      <div className={classes.menuwrapper}>
        <div style={{height: '6.25rem', width: '100%'}}></div>
        <div className={classes.menu}>
          <div 
            tabIndex={0} 
            role="menu" 
            onClick={() => setDropDown(!dropDown)} 
            className={`${classes.hamburgerwrapper} ${dropDown ? 'change':""}`}
            onKeyDown={(e) => { if (e.code === 'Enter') setDropDown(!dropDown)}}
          >
            <div id="bar1" className="change bar"></div>
            <div id="bar2" className="bar"></div>
            <div id="bar3" className="bar"></div>
          </div>
        </div>
        <Collapse in={dropDown}>
          <ul className={classes.linkContainer}>
            {linkArray.filter(link => link !== "").map((link, i) => {
              const localLink = `/${link.charAt(0).toLowerCase()}${link.substring(1)}/`;
              const match = pathname?.startsWith(localLink);
              return (
                <li key={i} style={{margin: 0, lineHeight: '2rem'}}>
                  <div 
                    style={{color: match ? '#999' : '#333'}} 
                    className={classes.menuLink}
                    onClick={() => route(localLink)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.code === 'Enter') route(localLink)}}
                  >
                    {link}
                  </div>
                </li>
              )
            })}
          </ul>
        </Collapse>
      </div>
    </StyledAppBar>
  );
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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header