import React from 'react'
import Layout from '../layout/layout';
import Seo from '../seo'
import CarouselProject from './carouselProject/carouselProject';
import ProjectNavigator from './projectNavigator/projectNavigator';
 
const IndexPage = ({ pageContext: { data } }) => {
  const { carousel, navigation, ...project } = data
  return (
    <>
      <Seo title={project.project_name} />
      {carousel ?
          <CarouselProject project={project} />
        :
          null
      }
      <ProjectNavigator navigation={navigation} />
    </>
  );
}
IndexPage.Layout = Layout;
export default IndexPage