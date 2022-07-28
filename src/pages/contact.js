import React, { useEffect } from "react"
import { styled } from '@mui/material/styles';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const PREFIX = 'Contact';

const classes = {
  contactWrapper: `${PREFIX}-contactWrapper`,
  mapContainer: `${PREFIX}-mapContainer`,
  textWrapper: `${PREFIX}-textWrapper`,
  section: `${PREFIX}-section`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  height: '37.5rem',
  width: '100%',
  position: 'relative',
  '@media(max-width: 47.9375rem)': {
    height: 'auto'
  },

  [`& .${classes.mapContainer}`]: {
    height: '100%',
    minHeight: '21.875rem'
  },

  [`& .${classes.textWrapper}`]: {
    height: '100%',
    width: '50%',
    background: 'linear-gradient(to right, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    padding: '6.25rem',
    zIndex: 400,
    color: theme.palette.lightText,
    '@media(max-width: 75rem)': {
      padding: '1.875rem',
    },
    '@media(max-width: 47.9375rem)': {
      height: 'auto',
      position: 'relative',
      width: '100%',
      background: 'none'
    }
  },

  [`& .${classes.section}`]: {
    '& p': {
      margin: 0
    },
    textTransform: 'none',
    marginBottom: '1.3125rem',
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

if (typeof window !== 'undefined') {
  let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}

const IndexPage = ({ transitionState }) => {
  const { contactJson } = useStaticQuery(graphql`
    {
      contactJson {
        header
        subheader
        points {
          indicator
          text
          email
        }
        email
        markerCoordinates
        mapCenterCoordinates
        zoomLevel
      }
    }
  `)

  useEffect(() => {
    if (typeof window !== `undefined`
      && (transitionState === "exit" || transitionState === null)) {
      window.dispatchEvent(new Event("resize"))
    }
  }, [transitionState])
  const mapProps = {
    className: classes.mapContainer,
    center: contactJson.mapCenterCoordinates,
    zoom: contactJson.zoomLevel,
    doubleClickZoom: false,
    closePopupOnClick: false,
    dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    touchZoom: false,
    scrollWheelZoom: false,
  }
  if (typeof window !== 'undefined') {
    return (
      <Root className={classes.contactWrapper}>
        <Seo title="Contact" />
        <MapContainer
          {...mapProps}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <Marker position={contactJson.markerCoordinates}>
            <Tooltip sticky>
              DOR Studio Architecture <br /> based out of <br /> Grand Junction
            </Tooltip>
          </Marker>
        </MapContainer>
        <div className={classes.textWrapper}>
          <h2 style={{ color: '#333333' }}>{contactJson.header}</h2>
          <h4 style={{ fontWeight: 300, textTransform: 'none', marginBottom: '1.9375rem' }}>
            <a className="discrete-link" href={`mailto:${contactJson.email}`}>{contactJson.subheader}</a>
          </h4>
          {contactJson.points.map((section, i) => (
            <div key={i} className={classes.section}>
              <p style={{ textTransform: 'uppercase' }}><b>{section.indicator}</b></p>
              <p>
                {section.email ?
                  <a className="discrete-link" href={`mailto:${contactJson.email}`}>{contactJson.email}</a>
                  :
                  section.text
                }
              </p>
            </div>
          ))}
        </div>
      </Root>
    );
  }
  return null
}

IndexPage.Layout = Layout
export default IndexPage
