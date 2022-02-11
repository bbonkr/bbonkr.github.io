import * as React from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    toggle: () => void;
}

const themeState: ThemeState = {
    theme: 'system',
    toggle: () => {},
};

const supportDarkMode = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const ThemeContext = React.createContext<ThemeState>(themeState);

const ThemeProvider = ({ children }: React.PropsWithChildren<undefined>) => {
    const [theme, setTheme] = React.useState<Theme>('system');

    const handleToggle = () => {
        const nextState =
            theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

        window.localStorage.theme = nextState;
        window.localStorage.setItem('theme', nextState);
        setTheme((_) => nextState);
    };

    React.useEffect(() => {
        const themeFromLocalStorage = window.localStorage.getItem('theme');

        if (themeFromLocalStorage) {
            setTheme((_) => themeFromLocalStorage as Theme);
        } else if (supportDarkMode()) {
            setTheme((_) => 'dark');
        } else {
            setTheme((_) => 'system');
        }
    }, []);

    React.useEffect(() => {
        const handleChangeOsTheme = (event: MediaQueryListEvent) => {
            setTheme((_) => (event.matches ? 'dark' : 'light'));
        };

        if (theme) {
            const isDarkMode =
                theme === 'dark' || (theme === 'system' && supportDarkMode());

            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            if (theme === 'system') {
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', handleChangeOsTheme);
            }
        }

        return () => {
            if (theme && theme === 'system') {
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .removeEventListener('change', handleChangeOsTheme);
            }
        };
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme: theme,
                toggle: handleToggle,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

export { ThemeProvider };
