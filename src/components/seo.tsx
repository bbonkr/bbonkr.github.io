/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Site } from '../models/data';

interface SeoProps {
    description?: string;
    lang?: string;
    meta?: React.DetailedHTMLProps<
        React.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
    >[];
    title: string;
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
                        seo {
                            facebookAppId
                        }
                    }
                }
            }
        `
    );

    const metaDescription = description || site?.siteMetadata?.description;
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
            content: `article`,
        },
        {
            name: `twitter:card`,
            content: `summary`,
        },

        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: metaDescription,
        },
    ].filter(Boolean);

    if (site.siteMetadata?.seo?.facebookAppId) {
        metaElementRecords.push({
            property: 'fb:app_id',
            content: site.siteMetadata?.seo?.facebookAppId,
        });
    }

    if (site.siteMetadata?.social?.twitter) {
        metaElementRecords.push({
            name: `twitter:creator`,
            content: site.siteMetadata?.social?.twitter,
        });
    }

    return (
        <Helmet
            htmlAttributes={{
                lang: lang ?? 'ko',
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
