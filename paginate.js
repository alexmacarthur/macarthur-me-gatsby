const path = require('path');
const _ = require('lodash');

module.exports = ({
    perPage = 5, 
    listPath = "", 
    createPage,
    queryPromise
} = {}) => {

    return queryPromise.then((result) => {

        if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;
        const pageChunks = _.chunk(posts, perPage);

        pageChunks.forEach((chunk, index) => {

            let pageNumber = index + 1;

            createPage({
                path: pageNumber > 1 ? `${listPath}/${pageNumber}` : listPath,
                component: path.resolve(`./src/templates/${listPath}.js`),
                context: {
                    edges: chunk,
                    skip: perPage * (pageNumber - 1),
                    limit: perPage,
                    pageNumber: pageNumber,
                    totalPages: pageChunks.length,
                    hasNextPage: pageNumber < pageChunks.length,
                    hasPreviousPage: pageNumber > 1,
                    nextPageLink: `/${listPath}/${pageNumber + 1}`,
                    previousPageLink: (pageNumber - 1) > 1 ? `/${listPath}/${pageNumber - 1}` : `/${listPath}/`,
                }
            });
        });
    });
}
