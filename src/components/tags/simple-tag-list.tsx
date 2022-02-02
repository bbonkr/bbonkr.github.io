import * as React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

interface SimpleTagListProps {
    tags?: string[];
}

export const SimpleTagList = ({ tags }: SimpleTagListProps) => {
    return (
        <ul className="list-style-none flex gap-3 flex-wrap break-words">
            {tags
                ?.filter((tag, index, arr) => {
                    // If there is duplicated tag, it should not render.
                    return (
                        arr.findIndex(
                            (x) => x.toLowerCase() === tag.toLowerCase()
                        ) === index
                    );
                })
                .map((tag) => {
                    return (
                        <li key={tag}>
                            <Link
                                to={`/tags/${kebabCase(tag)}`}
                                className="text-base md:text-sm text-green-500 no-underline hover:underline"
                            >
                                {`#${tag}`}
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
};
