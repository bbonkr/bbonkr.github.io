import * as React from 'react';

interface GitHubButtonProps {
    owner: string;
    repo: string;
    showCount?: boolean;
    size?: 'large';
}

const GitHubButtons = ({ owner, repo, size, showCount }: GitHubButtonProps) => {
    const ownerUrl = `https://github.com/${owner}`;
    const repoUrl = `https://github.com/${owner}/${repo}`;

    React.useEffect(() => {
        if (window) {
            import('github-buttons').then(({ render }) => {
                document
                    .querySelectorAll<HTMLAnchorElement>(
                        '.github-buttons .github-button'
                    )
                    ?.forEach((anchor) => {
                        render(anchor, (el) => {
                            anchor.parentNode?.replaceChild(el, anchor);
                        });
                    });
            });
        }
    }, []);

    return (
        <ul className="github-buttons flex gap-3 flex-wrap">
            {/* Star | Watch | Fork | Issue | Follow */}
            <li>
                <a
                    className="github-button"
                    href={repoUrl}
                    data-color-scheme="no-preference: dark; light: light; dark: dark;"
                    data-icon="octicon-star"
                    data-show-count={showCount}
                    data-size={size}
                    aria-label={`Star ${owner}/${repo} on GitHub`}
                >
                    Star
                </a>
            </li>
            <li>
                <a
                    className="github-button"
                    href={`${repoUrl}/subscription`}
                    data-color-scheme="no-preference: dark; light: light; dark: dark;"
                    data-icon="octicon-eye"
                    data-show-count={showCount}
                    data-size={size}
                    aria-label={`Watch ${owner}/${repo} on GitHub`}
                >
                    Watch
                </a>
            </li>
            <li>
                <a
                    className="github-button"
                    href={`${repoUrl}/fork`}
                    data-color-scheme="no-preference: dark; light: light; dark: dark;"
                    data-show-count={showCount}
                    data-size={size}
                    aria-label={`Fork ${owner}/${repo} on GitHub`}
                >
                    Fork
                </a>
            </li>
            <li>
                <a
                    className="github-button"
                    href={`${repoUrl}/issues`}
                    data-color-scheme="no-preference: dark; light: light; dark: dark;"
                    data-show-count={showCount}
                    data-size={size}
                    aria-label={`Issue ${owner}/${repo} on GitHub`}
                >
                    Issue
                </a>
            </li>
            <li>
                <a
                    className="github-button"
                    href={ownerUrl}
                    data-color-scheme="no-preference: dark; light: light; dark: dark;"
                    data-show-count={showCount}
                    data-size={size}
                    aria-label={`Follow @${owner} on GitHub`}
                >
                    Follow @bbonkr
                </a>
            </li>
        </ul>
    );
};

export default GitHubButtons;
