import { Link } from 'gatsby';
import * as React from 'react';
// import { useMediaQuery } from 'react-responsive';
import { Theme } from '../../context/theme/theme-context';
interface HeaderProps {
    title?: string;
    theme?: Theme;
    onToggleTheme?: () => void;
}

// type Theme = 'light' | 'dark';

export const Header = ({ title, theme, onToggleTheme }: HeaderProps) => {
    // const isDarkTheme = useMediaQuery({
    //     query: '(prefers-color-scheme: dark)',
    // });
    // const [theme, setTheme] = React.useState<Theme>(
    //     window.localStorage?.theme
    //         ? window.localStorage?.theme
    //         : isDarkTheme
    //         ? 'dark'
    //         : 'light'
    // );
    // const handleClickToggleTheme = () => {
    //     setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
    // };

    // React.useEffect(() => {
    //     if (window) {
    //         window.localStorage.setItem('theme', theme);
    //         window.localStorage.theme = theme;
    //     }

    //     if (theme === 'dark') {
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [theme]);

    React.useEffect(() => {
        let h = document.documentElement as HTMLElement,
            b = document.body as HTMLBodyElement,
            progress = document.querySelector<HTMLDivElement>('#progress'),
            scroll: number;
        let scrollpos = window.scrollY;
        const header = document.getElementById('header') as HTMLDivElement;
        const navcontent = document.getElementById(
            'nav-content'
        ) as HTMLDivElement;

        const handleScroll = () => {
            /*Refresh scroll % width*/
            scroll =
                ((h.scrollTop || b.scrollHeight) /
                    ((h.scrollHeight || b.scrollHeight) - h.clientHeight)) *
                100;

            progress?.style.setProperty('--scroll', scroll + '%');

            /*Apply classes for slide in bar*/
            scrollpos = window.scrollY;

            if (scrollpos > 10) {
                header.classList.remove('bg-gray-100');
                header.classList.remove('dark:bg-gray-800');

                header.classList.add('bg-white');
                header.classList.add('dark:bg-gray-900');
                header.classList.add('shadow');
            } else {
                header.classList.remove('bg-white');
                header.classList.remove('dark:bg-gray-900');
                header.classList.remove('shadow');

                header.classList.add('bg-gray-100');
                header.classList.add('dark:bg-gray-800');

                progress?.style.setProperty('--scroll', '0%');
            }
        };

        const handleToggleMenu = () => {
            const navContentElement = document.getElementById('nav-content');
            if (navContentElement) {
                navContentElement.classList.toggle('hidden');
            }
        };

        document.addEventListener('scroll', handleScroll);
        const navToggleElement = document.getElementById('nav-toggle');

        navToggleElement?.addEventListener('click', handleToggleMenu);

        return () => {
            document.removeEventListener('scroll', handleScroll);
            navToggleElement?.removeEventListener('click', handleToggleMenu);
        };
    }, []);

    return (
        <nav
            id="header"
            className="fixed w-full z-10 top-0 bg-gray-100 dark:bg-gray-800"
        >
            <div
                id="progress"
                className="h-1 z-20 top-0"
                style={{
                    background:
                        'linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)',
                }}
            ></div>

            <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
                <div className="pl-4">
                    <Link
                        to="/"
                        className="text-gray-900 dark:text-gray-100 text-base no-underline hover:no-underline font-extrabold text-xl"
                    >
                        {title}
                    </Link>
                </div>

                <div className="block lg:hidden pr-4">
                    <button
                        id="nav-toggle"
                        className="flex items-center px-3 py-2 border rounded text-gray-500 dark:text-gray-600 border-gray-600 dark:border-gray-500 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none"
                    >
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0   z-20"
                    id="nav-content"
                >
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li className="mr-3">
                            <Link
                                to="/"
                                className="inline-block py-2 px-4 text-gray-900 dark:text-gray-100 font-bold no-underline"
                            >
                                Main
                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link
                                to="/profile"
                                className="inline-block py-2 px-4 text-gray-900 dark:text-gray-100 font-bold no-underline"
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link
                                to="/tags"
                                className="inline-block text-gray-600 dark:text-gray-400 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                            >
                                Tags
                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link
                                to="/categories"
                                className="inline-block text-gray-600 dark:text-gray-400 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                            >
                                Categories
                            </Link>
                        </li>
                        <li className="mr-3">
                            <button
                                className="js-change-theme focus:outline-none inline-block text-gray-600 dark:text-gray-400 no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                                onClick={onToggleTheme}
                            >
                                {theme === 'dark' ? (
                                    <React.Fragment>
                                        <span>{`☀️`}</span>{' '}
                                        <span>{`Light mode`}</span>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <span>{`🌙`}</span>{' '}
                                        <span>{`Dark mode`}</span>
                                    </React.Fragment>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
