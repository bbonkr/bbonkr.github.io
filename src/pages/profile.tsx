import * as React from 'react';
import { graphql, navigate, PageProps } from 'gatsby';
import { Site } from '../models/data';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import { FaGithub, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { RiNewspaperLine } from 'react-icons/ri';

interface Data {
    site: Site;
}

const ProfilePage = ({ data, location }: PageProps<Data>) => {
    const title = data.site.siteMetadata?.title ?? '';

    const handleClickMainButton = () => {
        navigate('/blog');
    };

    return (
        <React.Fragment>
            <Helmet
                bodyAttributes={{
                    id: 'profile-page',
                    className: `font-sans antialiased text-gray-900 dark:text-gray-100 leading-normal tracking-wider bg-cover`,
                }}
            />
            <Layout location={location} title={title}>
                <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                    {/* <!--Main Col--> */}
                    <div
                        id="profile"
                        className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white dark:bg-gray-900 opacity-75 mx-6 lg:mx-0"
                    >
                        <div className="p-4 md:p-12 text-center lg:text-left">
                            {/* <!-- Image for mobile view--> */}
                            <div className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                                <StaticImage
                                    className="rounded-full"
                                    layout="constrained"
                                    formats={['auto', 'webp', 'avif', 'png']}
                                    src="../images/me.png"
                                    quality={95}
                                    alt="Profile picture"
                                />
                            </div>

                            <h1 className="text-3xl font-bold pt-8 ">
                                {data.site.siteMetadata?.author.name}
                            </h1>
                            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
                            {data.site.siteMetadata?.author.summary && (
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                    <svg
                                        className="h-4 fill-current text-green-700 pr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                                    </svg>{' '}
                                    {data.site.siteMetadata?.author.summary}
                                </p>
                            )}
                            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                <svg
                                    className="h-4 fill-current text-green-700 pr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                                </svg>{' '}
                                {data.site.siteMetadata?.author.location}
                            </p>
                            <p className="pt-8 text-sm">
                                {data.site.siteMetadata?.author.description}
                            </p>

                            <div className="pt-12 pb-8">
                                <button
                                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={handleClickMainButton}
                                >
                                    Would you like to read latest posts?
                                </button>
                                {/* <Link
                                    to="/blog"
                                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Would you like to read latest posts?
                                </Link> */}
                            </div>

                            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center gap-6">
                                {data.site.siteMetadata?.social?.github && (
                                    <a
                                        className="link"
                                        href={`https://github.com/${data.site.siteMetadata?.social?.github}`}
                                        data-tippy-content="@github_handle"
                                    >
                                        <FaGithub
                                            className="text-3xl"
                                            title="GitHub"
                                        />
                                    </a>
                                )}
                                {data.site.siteMetadata?.social?.twitter && (
                                    <a
                                        className="link"
                                        href={`https://twitter.com/${data.site.siteMetadata?.social?.twitter}`}
                                        data-tippy-content="@twitter_handle"
                                    >
                                        <FaTwitter
                                            className="text-blue-600 text-3xl"
                                            title="Twitter"
                                        />
                                    </a>
                                )}
                                {data.site.siteMetadata?.social?.facebook && (
                                    <a
                                        className="link"
                                        href={`https://facebook.com/${data.site.siteMetadata?.social?.facebook}`}
                                        data-tippy-content="@facebook_handle"
                                    >
                                        <FaFacebook
                                            className="text-blue-600 text-3xl"
                                            title="Facebook"
                                        />
                                    </a>
                                )}

                                {data.site.siteMetadata?.social?.linkedin && (
                                    <a
                                        className="link"
                                        href={`https://linkedin.com/in/${data.site.siteMetadata?.social?.linkedin}`}
                                        data-tippy-content="@linkedin_handle"
                                    >
                                        <FaLinkedin
                                            className="text-blue-600 text-3xl"
                                            title="Linkedin"
                                        />
                                    </a>
                                )}

                                {data.site.siteMetadata?.social?.resume && (
                                    <a
                                        className="link"
                                        href={
                                            data.site.siteMetadata?.social
                                                ?.resume
                                        }
                                        data-tippy-content="@website_handle"
                                    >
                                        <RiNewspaperLine
                                            className="text-3xl"
                                            title="resume"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

export default ProfilePage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                author {
                    name
                    summary
                    location
                    description
                }
                social {
                    twitter
                    github
                    linkedin
                    facebook
                    resume
                }
            }
        }
    }
`;
