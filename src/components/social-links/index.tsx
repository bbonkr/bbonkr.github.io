import * as React from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Social } from '../../models/data';

import './style.css';

interface SocialLinksProps {
    social: Social;
    openNewWindow?: boolean;
}

const SocialLinks = ({ social, openNewWindow }: SocialLinksProps) => {
    const anchroTarget = openNewWindow ? '_blank' : '_self';
    const anchorRel = `noreferrer ${openNewWindow ? 'external' : ''}`;
    return (
        <ul className="social-list">
            {social?.github && (
                <li>
                    <a
                        href={`https://github.com/${social?.github || ``}`}
                        target={anchroTarget}
                        rel={anchorRel}
                    >
                        <FaGithub size={`1.3rem`} />
                    </a>
                </li>
            )}
            {social?.twitter && (
                <li>
                    <a
                        href={`https://twitter.com/${social?.twitter || ``}`}
                        target={anchroTarget}
                        rel={anchorRel}
                    >
                        <FaTwitter size={'1.3rem'} />
                    </a>
                </li>
            )}
            {social?.facebook && (
                <li>
                    <a
                        href={`https://www.facebook.com/${
                            social?.facebook || ``
                        }`}
                        target={anchroTarget}
                        rel={anchorRel}
                    >
                        <FaFacebook size={`1.3rem`} />
                    </a>
                </li>
            )}
            {social?.linkedin && (
                <li>
                    <a
                        href={`https://www.linkedin.com/in/${
                            social?.linkedin || ``
                        }/`}
                        target={anchroTarget}
                        rel={anchorRel}
                    >
                        <FaLinkedin size={`1.3rem`} />
                    </a>
                </li>
            )}
        </ul>
    );
};

export default SocialLinks;
