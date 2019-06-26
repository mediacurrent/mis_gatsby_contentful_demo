const path = require(`path`);

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/BasicPageTemplate/index.js`);

    resolve(
      graphql(
        `
          {
            allContentfulBasicPage {
              edges {
                 node {
                  id: contentful_id
                  pageSlug
                }
              }
            }
          }
        `
      )
        .then((result) => {
          if (result.errors) reject(result.errors);
          if (!result.data) reject('No data found. Fix your GraphQL stuff');
          console.log('Creating Page Nodes');
          result.data.allContentfulBasicPage.edges.forEach(({ node }) => {
            createPage({
              path: node.pageSlug,
              component: pageTemplate,
              context: {
                id: node.id
              }
            })
          });
        })
    )
  })
}
