import React, { useEffect } from "react"
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

if (typeof window !== 'undefined') {
  let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;
}

const IndexPage = () => {
  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 350)
  }, [])
  const centerPosition = [39.0637842, -109.313682]
  const markerPosition = [39.0637842, -108.5507189]
  const mapProps = {
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
      <>
        <Seo title="Contact" />
        <MapContainer
          style={{ height: "100%" }}
          center={centerPosition}
          zoom={9.5}
          on
          {...mapProps}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          />
          <Marker position={markerPosition}>
            <Tooltip sticky>
              DOR Studio Architecture <br /> based out of <br /> Grand Junction
            </Tooltip>
          </Marker>
        </MapContainer>
      </>
    )
  }
  return null
}
IndexPage.Layout = Layout
export default IndexPage
