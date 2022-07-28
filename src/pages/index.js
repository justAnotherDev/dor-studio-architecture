import * as React from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselArrow from "../components/carouselArrow"
import '../styles/index.scss'

const PREFIX = 'Home';

const classes = {
  overlay: `${PREFIX}-overlay`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.overlay}`]: {
    backgroundColor: `${theme.palette.primary.main}CC`,
  }
}));

const IndexPage = props => {

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
                  placeholder: BLURRED
                )  
              }
            }
            alt
            link
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
    <Root>
      <Seo title="" />
      <Slider style={{ margin: '0.5rem 0' }} {...settings}>
        {homeData.map((item, i) => (
            <div 
              key={i}
              onClick={() => props.route(`/projects/${item.node.link}`)}
              role="link"
              onKeyDown={e => { if (e.code === "Enter") props.route(`/projects/${item.node.link}`) }}
            >
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
    </Root>
  );
}

IndexPage.Layout = Layout
export default IndexPage
