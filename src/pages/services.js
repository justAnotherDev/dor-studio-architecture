import React from 'react'
import Layout from '../components/layout/layout';
import Seo from '../components/seo';
 
const IndexPage = () => {
  return (
    <>
      <Seo title="Services" />
      <h1>Services</h1>
      <i className="fa fa-building-o" aria-hidden="true"></i>
    </>
  );
}
IndexPage.Layout = Layout
export default IndexPage