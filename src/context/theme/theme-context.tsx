import * as React from 'react';

export type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggle: () => void;
}

const themeState: ThemeState = {
    theme: 'light',
    toggle: () => {},
};

const supportDarkMode = () =>
    window.matchMedia('(prefer-color-scheme: dark)').matches === true;

const ThemeContext = React.createContext<ThemeState>(themeState);

const ThemeProvider = ({ children }: React.PropsWithChildren<undefined>) => {
    const [theme, setTheme] = React.useState<Theme>('light');

    const handleToggle = () => {
        const nextState = theme === 'dark' ? 'light' : 'dark';

        setTheme((_) => nextState);
    };

    React.useEffect(() => {
        const themeFromLocalStorage = window.localStorage.getItem('theme');
        if (themeFromLocalStorage) {
            setTheme((_) => themeFromLocalStorage as Theme);
        } else if (supportDarkMode()) {
            setTheme((_) => 'dark');
        }
    }, []);

    React.useEffect(() => {
        window.localStorage.theme = theme;
        window.localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
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
