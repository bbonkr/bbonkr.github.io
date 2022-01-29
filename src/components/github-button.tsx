import * as React from 'react';
import { Theme } from '../context/theme/theme-context';
import GitHubButton from 'react-github-btn';

type GitHubButtonType = 'Star' | 'Watch' | 'Fork' | 'Issue' | 'Follow';
type GitHubButtonSize = 'large';

interface GitHubButtonModel {
    type: GitHubButtonType;
    url: string;
    label?: string;
    icon?: string;
    text?: string; // if does not set, use type to text
}

interface GitHubButtonProps {
    owner: string;
    repo: string;
    showCount?: boolean;
    size?: GitHubButtonSize;
    theme?: Theme;
}

const GitHubButtons = React.memo(
    ({ owner, repo, size, showCount, theme }: GitHubButtonProps) => {
        const ownerUrl = `https://github.com/${owner}`;
        const repoUrl = `https://github.com/${owner}/${repo}`;
        const getColorScheme = (themeValue?: Theme) => {
            return themeValue
                ? themeValue
                : 'no-preference: light; light: light; dark: dark;';
        };

        const githubButtons: GitHubButtonModel[] = [
            {
                type: 'Star',
                url: repoUrl,
                icon: 'octicon-star',
                label: `Star ${owner}/${repo} on GitHub`,
            },
            {
                type: 'Watch',
                url: `${repoUrl}/subscription`,
                icon: 'octicon-eye',
                label: `Watch ${owner}/${repo} on GitHub`,
            },
            {
                type: 'Fork',
                url: `${repoUrl}/fork`,
                icon: 'octicon-repo-forked',
                label: `Fork ${owner}/${repo} on GitHub`,
            },
            {
                type: 'Issue',
                url: `${repoUrl}/issues`,
                icon: 'octicon-issue-opened',
                label: `Issue ${owner}/${repo} on GitHub`,
            },
            {
                type: 'Follow',
                url: ownerUrl,
                label: `Follow ${owner}/${repo} on GitHub`,
                text: `Follow @${owner}`,
            },
        ];

        return (
            <ul className="github-buttons flex gap-3 flex-wrap">
                {githubButtons.map((model) => (
                    <li key={model.type}>
                        <GitHubButton
                            href={model.url}
                            data-color-scheme={getColorScheme(theme)}
                            data-show-count={showCount}
                            data-size={size}
                            data-icon={model.icon}
                            aria-label={model.label}
                        >
                            {model.text ?? model.type}
                        </GitHubButton>
                    </li>
                ))}
            </ul>
        );
    }
);

export default GitHubButtons;
