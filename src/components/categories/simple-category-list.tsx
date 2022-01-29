import { Link } from 'gatsby';
import * as React from 'react';
import kebabCase from 'lodash/kebabCase';

interface SimpleCategoryListProps {
    categories?: string[];
}

export const SimpleCategoryList = ({ categories }: SimpleCategoryListProps) => {
    return (
        <ul className="list-style-none flex gap-3 flex-wrap break-words">
            {categories?.map((category) => {
                return (
                    <li key={category}>
                        <Link
                            to={`/categories/${kebabCase(category)}`}
                            className="text-base md:text-sm text-green-500 no-underline hover:underline"
                        >
                            {category}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
