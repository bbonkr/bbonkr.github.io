import { useStaticQuery, graphql } from 'gatsby';
import { MarkdownRemarks } from '../../models/data';

export const usePostsQuery = () => {
    const data = useStaticQuery<{ allMarkdownRemark: MarkdownRemarks }>(graphql`
        query {
            allMarkdownRemark(
                limit: 2000
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            date(formatString: "MMMM DD, YYYY")
                            title
                            description
                            tags
                            categories
                        }
                    }
                }
            }
        }
    `);

    return {
        ...data,
    };
};
