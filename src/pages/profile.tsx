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
                                        href={`https://linkedin.com/${data.site.siteMetadata?.social?.linkedin}`}
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

                                {/* <a
                                    className="link"
                                    href="#"
                                    data-tippy-content="@unsplash_handle"
                                >
                                    <svg
                                        className="h-6 fill-current text-gray-600 hover:text-green-700"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Unsplash</title>
                                        <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
                                    </svg>
                                </a> */}
                                {/* <a
                                    className="link"
                                    href="#"
                                    data-tippy-content="@dribble_handle"
                                >
                                    <svg
                                        className="h-6 fill-current text-gray-600 hover:text-green-700"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Dribbble</title>
                                        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
                                    </svg>
                                </a> */}
                                {/* <a
                                    className="link"
                                    href="#"
                                    data-tippy-content="@instagram_handle"
                                >
                                    <svg
                                        className="h-6 fill-current text-gray-600 hover:text-green-700"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Instagram</title>
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a> */}
                                {/* <a
                                    className="link"
                                    href="#"
                                    data-tippy-content="@youtube_handle"
                                >
                                    <svg
                                        className="h-6 fill-current text-gray-600 hover:text-green-700"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <title>YouTube</title>
                                        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                                    </svg>
                                </a> */}
                            </div>

                            {/* <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->  */}
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
