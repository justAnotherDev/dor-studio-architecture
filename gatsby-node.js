/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-leaflet|leaflet/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

const path = require('path')
exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const { data } = await graphql(`
    {
      allPortfolioJson {
        edges {
          node {
            slug
            project_name
            descr
            project_data {
              header
              descr
            }
            carousel
          }
        }
      }
    }
    `);
    data.allPortfolioJson.edges.forEach((edge) => {
      const { slug, ...project } = edge.node;
      createPage({
        path: `/projects/${slug}/`,
        component: path.resolve('./src/components/project/project.js'),
        context: {
          data: project,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
}