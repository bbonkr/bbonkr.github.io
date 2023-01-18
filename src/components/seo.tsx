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
    image?: string;
    title: string;
}

const Seo = ({ description, lang, meta, image, title }: SeoProps) => {
    const { site } = useStaticQuery<{ site: Site }>(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        siteUrl
                        description
                        social {
                            twitter
                        }
                        seo {
                            facebookAppId
                            naverSiteVerification
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

    if (site.siteMetadata?.seo?.naverSiteVerification) {
        metaElementRecords.push({
            name: 'naver-site-verification',
            content: site.siteMetadata?.seo?.naverSiteVerification,
        });
    }

    const metas: React.DetailedHTMLProps<
        React.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
    >[] = [...metaElementRecords, ...(meta ?? [])];

    metas.push({
        property: 'og:image',
        content: `${site.siteMetadata?.siteUrl}${image ?? '/images/logo.png'}`,
    });

    return (
        <Helmet
            htmlAttributes={{
                lang: lang ?? 'ko',
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
            meta={metas}
        />
    );
};

export default Seo;
