import * as React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselArrow from "../components/carouselArrow"
import { makeStyles } from "@material-ui/core"
import '../styles/index.scss'

const IndexPage = props => {
  const classes = homeStyles(props)
  const data = useStaticQuery(graphql`
    {
      allHomeJson {
        edges {
          node {
            header
            subheader
            src {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: {cropFocus: CENTER}, width: 460, height: 636
                  quality: 100
                  webpOptions: {quality: 100}
                  jpgOptions: {quality: 100, progressive: true}
                  avifOptions: {lossless: true, quality: 100}
                  pngOptions: {quality: 100}
                  placeholder: BLURRED
                )  
              }
            }
            alt
          }
        }
      }
    }
  `)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CarouselArrow prevDirection={false} shiftAmount="0.5rem" />,
    prevArrow: <CarouselArrow prevDirection={true} shiftAmount="0.5rem" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  const homeData = data.allHomeJson.edges
  
  return (
    <>
      <Seo title="" />
      <Slider style={{ margin: '0.5rem 0' }} {...settings}>
        {homeData.map((item, i) => (
            <div key={i}>
              <GatsbyImage
                image={item.node.src.childImageSharp.gatsbyImageData}
                alt={item.node.alt}
              />
              <div className={`overlay ${classes.overlay}`}>
                <div className="overlay-inner">
                  <div className="overlay-text">
                    <h4 className="text-header">{item.node.header}</h4>
                    <h6 className="text-subheader">{item.node.subheader}</h6>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </>
  )
}

const homeStyles = makeStyles(theme => ({
  overlay: {
    backgroundColor: `${theme.palette.primary.main}CC`,
  }
}))

IndexPage.Layout = Layout
export default IndexPage
