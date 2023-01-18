import { useStaticQuery, graphql } from 'gatsby';
import { MarkdownRemarks } from '../../models/data';

export const usePostsQuery = () => {
    const data = useStaticQuery<{ allMarkdownRemark: MarkdownRemarks }>(graphql`
        query postsQuery {
            allMarkdownRemark(
                limit: 2000
                sort: { frontmatter: { date: DESC } }
            ) {
                edges {
                    node {
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            date(formatString: "YYYY-MM-DD")
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
