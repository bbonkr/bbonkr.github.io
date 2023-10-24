import * as React from 'react';
// import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Header } from '../components/header';
import Bio from '../components/bio';
import ThemeProvider from '../context/theme/theme-context';
interface LayoutProps {
    location: Location;
    title: string;
}

const Layout = ({
    location,
    title,
    children,
}: React.PropsWithChildren<LayoutProps>) => {
    const rootPath = '/'; // `${__PATH_PREFIX__}/`;
    const isRootPath = location?.pathname === rootPath;
    // let header;

    // if (isRootPath) {
    //     header = (
    //         <h1 className="main-heading">
    //             <Link to="/">{title}</Link>
    //         </h1>
    //     );
    // } else {
    //     header = (
    //         <Link className="header-link-home" to="/">
    //             {title}
    //         </Link>
    //     );
    // }

    return (
        <ThemeProvider.Consumer>
            {(themeState) => (
                <React.Fragment>
                    <Helmet
                        bodyAttributes={{
                            class: 'bg-gray-100 dark:bg-gray-800 font-sans leading-normal tracking-normal',
                        }}
                    />
                    <Header
                        title={title}
                        theme={themeState.theme}
                        onToggleTheme={themeState.toggle}
                    />
                    <div className="flex flex-col min-h-screen">
                        <div
                            className="container w-full md:max-w-3xl mx-auto pt-20 flex-grow flex-1"
                            data-is-root-path={isRootPath}
                        >
                            {/* <header className="global-header">{header}</header> */}

                            {/* <MainNav /> */}
                            <main className="w-full px-4 md:px-6 text-xl text-gray-800 dark:text-gray-400 leading-normal">
                                {children}
                            </main>
                        </div>

                        <footer className="bg-white dark:bg-gray-900 border-t border-gray-400 dark:border-gray-600 dark:text-gray-100 shadow mt-6">
                            <div className="container max-w-4xl mx-auto flex py-8">
                                <div className="w-full mx-auto flex flex-wrap">
                                    <div className="flex w-full md:w-1/2">
                                        <div className="px-8">
                                            <Bio disablePaddingY />
                                        </div>
                                    </div>

                                    <div className="flex w-full md:w-1/2">
                                        <div className="px-8">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100">
                                                Other sites
                                            </h3>
                                            <p className="py-4 text-gray-600 dark:text-gray-400 text-sm">
                                                If does not find interesting
                                                topic, you might visit other
                                                site on below link.
                                            </p>
                                            <ul>
                                                <li>
                                                    <a
                                                        href="https://bbon.kr"
                                                        target="_blank"
                                                        rel="nofollow noopener noreferrer"
                                                        className="text-green-600"
                                                    >
                                                        Other Blog
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container max-w-4xl mx-auto flex flex-col justify-center items-center py-8">
                                <div className="w-full mx-auto flex flex-wrap flex-1 flex-col justify-center items-center">
                                    <div className="px-8">
                                        © {new Date().getFullYear()}, Built
                                        with
                                        {` `}
                                        <a href="https://www.gatsbyjs.com">
                                            Gatsby
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </React.Fragment>
            )}
        </ThemeProvider.Consumer>
    );
};

export default Layout;
