import { useStaticQuery, graphql } from 'gatsby';

interface Author {
    name: string;
    summary?: string;
}

interface Social {
    twitter?: string;
}

interface SiteMetadata {
    author: Author;
    social?: Social;
}

interface Site {
    siteMetadata: SiteMetadata;
}

export const useSiteQuery = () => {
    const data = useStaticQuery<{ site: Site }>(graphql`
        query BioQuery {
            site {
                siteMetadata {
                    author {
                        name
                        summary
                    }
                    social {
                        twitter
                    }
                }
            }
        }
    `);

    return {
        ...data,
    };
};
