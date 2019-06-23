import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

// Layout
import Layout from '../../components/layouts/Layout';

// Fields
import Content from '../../components/fields/Content';

const BasicPageTemplate = ({ data }) => {
  console.log(data);
  const { title, summary, content } = data.contentfulBasicPage;

  return (
    <Layout>
      <Helmet>
        <title>{title} | Mediacurrent</title>
        <meta name="description" content={summary} />
      </Helmet>
      <Content content={content} />
    </Layout>
  )
}

export default BasicPageTemplate;

export const query = graphql`
  query pageTemplate($id: String!) {
    contentfulBasicPage(contentful_id: {eq:$id}) {
      ...basicPageFragment
    }
  }
`;
