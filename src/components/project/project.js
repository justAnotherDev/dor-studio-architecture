import React from 'react'
import Layout from '../layout/layout';
import Seo from '../seo'
import CarouselProject from './carouselProject/carouselProject';
 
const IndexPage = ({ pageContext: { data } }) => {
  const { carousel, ...project } = data
  return (
    <>
      <Seo title={project.project_name} />
      {carousel ?
          <CarouselProject project={project} />
        :
          null
      }
    </>
  );
}
IndexPage.Layout = Layout;
export default IndexPage