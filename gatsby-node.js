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

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const { data } = await graphql(`
    {
      allPortfolioJson {
        edges {
          node {
            slug
            project_name
            descr {
              style
              text
            }
            project_data {
              header
              descr
            }
            carousel
            mosaic {
              columns
              images {
                src {
                  childrenImageSharp {
                    gatsbyImageData(
                      quality: 100
                      webpOptions: {quality: 100}
                      jpgOptions: {quality: 100, progressive: true}
                      avifOptions: {lossless: true, quality: 100}
                      pngOptions: {quality: 100}
                      placeholder: BLURRED
                    )
                  }
                }
              }
            }
            images {
              src {
                childrenImageSharp {
                  gatsbyImageData(
                    quality: 100
                    webpOptions: {quality: 100}
                    jpgOptions: {quality: 100, progressive: true}
                    avifOptions: {lossless: true, quality: 100}
                    pngOptions: {quality: 100}
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
        }
      }
    }
    `);

    // Create a slug for any portfolio projects not provided one.
    data.allPortfolioJson.edges.forEach(({ node: project }) => {
      if (!project.slug) {
        project.slug = project.project_name.split(" ").map(word => word.toLowerCase()).join("-")
      }
    })

    data.allPortfolioJson.edges.forEach((edge, index, portfolio) => {
      const { node: prevProject } = index !== 0 ? portfolio[index - 1] : portfolio.slice(-1)[0]
      const { node: nextProject } = index !== portfolio.length - 1 ? portfolio[index + 1] : portfolio[0]

      // Create programmatic navigation
      const navigation = {
        prev: {
          projectName: prevProject.project_name,
          link: `${prevProject.slug}/`
        },
        next: {
          projectName: nextProject.project_name,
          link: `${nextProject.slug}/`
        }
      }
      
      const { slug, ...project } = edge.node;
      
      createPage({
        path: `/projects/${slug}/`,
        component: require.resolve('./src/components/project/project.js'),
        context: {
          data: {...project, navigation },
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
}