import * as React from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselArrow from "../components/carouselArrow"
import '../styles/index.scss'
import Overlay from "../components/overlay/overlay";
import { assignNullSlug } from "../utils";

const PREFIX = 'Home';

const classes = {
  overlay: `${PREFIX}-overlay`
};

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

  const { allPortfolioJson: { edges } } = useStaticQuery(graphql`
    {
      allPortfolioJson {
        edges {
          node {
            project_name
            project_data {
              header
              descr
            }
            cover_image {
              src {
                childImageSharp {
                  gatsbyImageData(
                    transformOptions: {cropFocus: CENTER}, width: 460, height: 636
                    placeholder: BLURRED
                  )  
                }
              }
            }
            slug
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
  const homeData = edges
  homeData.forEach(({ node: project }) => {
    if (!project.slug) {
      project.slug = project.project_name.split(" ").map(word => word.toLowerCase()).join("-")
    }
  })
  
  return (
    <Root>
      <Seo title="" />
      <Slider style={{ margin: '0.5rem 0' }} {...settings}>
        {homeData.map(({ node: project }, i) => (
            <div 
              key={i}
              onClick={() => props.route(`/projects/${project.slug}`)}
              role="link"
              onKeyDown={e => { if (e.code === "Enter") props.route(`/projects/${project.slug}`) }}
            >
              <GatsbyImage
                image={project.cover_image.src.childImageSharp.gatsbyImageData}
                alt={project.project_name}
              />
              <Overlay classes={`overlay ${classes.overlay}`} project={project} />
            </div>
          )
        )}
      </Slider>
    </Root>
  );
}

IndexPage.Layout = Layout
export default IndexPage
