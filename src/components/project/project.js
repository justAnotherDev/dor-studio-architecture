import React from 'react'
import Layout from '../layout/layout';
import Seo from '../seo'
 
const IndexPage = ({ pageContext: { data } }) => {
  
  return (
    <>
      <Seo title={data.project_name} />
      <h1>{data.project_name}</h1>
    </>
  );
}
IndexPage.Layout = Layout;
export default IndexPage