import * as React from 'react';
import { Theme } from '../../context/theme/theme-context';
import { AiOutlineLoading } from 'react-icons/ai';
interface ScriptResult {
    loading: boolean;
    succeess: boolean;
    message?: string;
}

interface UtterancesProps {
    theme?: Theme;
}

export const Utterances = ({ theme }: UtterancesProps) => {
    const [result, setResult] = React.useState<ScriptResult>({
        loading: true,
        succeess: false,
    });

    const utterancesElement = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const utterancesEl = utterancesElement.current;

        const foundChild = utterancesEl?.firstChild;
        if (foundChild) {
            utterancesEl?.removeChild(foundChild);
        }

        setResult(() => ({ loading: true, succeess: false }));

        const scriptEl = document.createElement('script');
        scriptEl.onload = () => {
            setResult((_) => ({
                loading: false,
                succeess: true,
            }));
        };
        scriptEl.onerror = (
            event: Event | string,
            source?: string,
            lineno?: number,
            colno?: number,
            error?: Error
        ) => {
            setResult((_) => ({
                loading: false,
                succeess: false,
                message:
                    error?.message ?? `Failed to load 'Utterances' script.`,
            }));
        };

        scriptEl.async = true;
        scriptEl.src = 'https://utteranc.es/client.js';
        scriptEl.setAttribute('repo', 'bbonkr/bbonkr.github.io');
        scriptEl.setAttribute('issue-term', 'pathname');
        scriptEl.setAttribute('label', 'Blog Comment');
        scriptEl.setAttribute(
            'theme',
            theme === 'dark'
                ? 'github-dark'
                : theme === 'light'
                ? 'github-light'
                : 'preferred-color-scheme'
        );
        scriptEl.setAttribute('crossorigin', 'anonymous');

        utterancesEl?.appendChild(scriptEl);
    }, [theme]);

    return (
        <div className="comments-wrapper">
            {result.loading && (
                <div className="flex flex-col gap-3 flex-1 justify-center items-center">
                    <AiOutlineLoading className="animate-spin" />
                    <span>Loading script...</span>
                </div>
            )}
            {!result.loading && !result.succeess && (
                <div className="flex flex-col gap-3 flex-1 justify-center items-center">
                    <div>{result.message ?? `Error. Please try again.`} </div>
                </div>
            )}

            <div
                className={`${
                    !result.loading && result.succeess ? '' : 'hidden'
                }`}
                ref={utterancesElement}
            ></div>
        </div>
    );
};
