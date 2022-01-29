import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';

interface SimpleTagListProps {
    tags?: string[];
}

export const SimpleTagList = ({ tags }: SimpleTagListProps) => {
    return (
        <ul className="list-style-none flex gap-3 flex-wrap break-words">
            {tags?.map((tag) => {
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
