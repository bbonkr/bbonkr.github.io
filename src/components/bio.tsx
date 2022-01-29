/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { FaTwitter } from 'react-icons/fa';
import { useSiteQuery } from '../hooks/queries/useSiteQuery';
import SocialLinks from './social-links';

const Bio = () => {
    const { site } = useSiteQuery();

    // Set these values by editing "siteMetadata" in gatsby-config.js
    const author = site.siteMetadata?.author;
    const social = site.siteMetadata?.social;

    return (
        <div id="bio" className="flex w-full items-center font-sans px-4 py-12">
            <StaticImage
                className="w-10 h-10 rounded-full mr-4"
                layout="fixed"
                formats={['auto', 'webp', 'avif']}
                src="../images/me.png"
                width={50}
                height={50}
                quality={95}
                alt="Profile picture"
            />
            {author?.name && (
                <div className="flex-1 px-2">
                    <p className="text-base font-bold md:text-xl leading-none mb-1">
                        {author.name}
                    </p>
                    {author?.summary && (
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-base mb-1">
                            {author?.summary}
                        </p>
                    )}
                    {social && (
                        <div className="justify-end">
                            <SocialLinks social={social} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bio;
