import * as React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselArrow from "../components/carouselArrow"

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    {
      allHomeJson {
        edges {
          node {
            src {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
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
    nextArrow: <CarouselArrow prevDirection={false} />,
    prevArrow: <CarouselArrow prevDirection={true} />,
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
      <Slider {...settings}>
        {homeData.map((item, i) => (
            <div key={i}>
              <GatsbyImage
                image={item.node.src.childImageSharp.gatsbyImageData}
                alt={item.node.alt}
              />
            </div>
          )
        )}
      </Slider>
    </>
  )
}

IndexPage.Layout = Layout
export default IndexPage
