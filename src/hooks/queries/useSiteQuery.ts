import { useStaticQuery, graphql } from 'gatsby';
import { Site } from '../../models/data';

export const useSiteQuery = () => {
    const data = useStaticQuery<{ site: Site }>(graphql`
        query BioQuery {
            site {
                siteMetadata {
                    title
                    author {
                        name
                        summary
                    }
                    social {
                        twitter
                        github
                        linkedin
                        facebook
                    }
                }
            }
        }
    `);

    return {
        ...data,
    };
};
