/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
// import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type Meta = {
    property?: string;
    name?: string;
    content?: unknown;
};

interface SeoProps {
    description?: string;
    lang?: string;
    meta?: React.DetailedHTMLProps<
        React.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
    >[];
    title: string;
}

interface Social {
    twitter?: string;
}

interface SiteMetadata {
    title: string;
    description?: string;
    social?: Social;
}
interface Site {
    siteMetadata: SiteMetadata;
}

const Seo = ({ description, lang, meta, title }: SeoProps) => {
    const { site } = useStaticQuery<{ site: Site }>(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata?.title;

    const metaElementRecords: React.DetailedHTMLProps<
        React.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
    >[] = [
        {
            name: `description`,
            content: metaDescription,
        },
        {
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: metaDescription,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:creator`,
            content: site.siteMetadata?.social?.twitter || ``,
        },
        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: metaDescription,
        },
    ];

    return (
        <Helmet
            htmlAttributes={{
                lang: lang ?? 'en',
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
            meta={[...metaElementRecords, ...(meta ?? [])]}
        />
    );
};

// Seo.defaultProps = {
//   lang: `en`,
//   meta: [],
//   description: ``,
// };

// Seo.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// };

export default Seo;
