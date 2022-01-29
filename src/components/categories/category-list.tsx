import * as React from 'react';
import { Tag } from '../../models/data';

// import './tag-list.css';

interface CategoryListProps {
    categories?: Tag[];
    selectedCategory?: string;
    onChange?: (category: string) => void;
}

export const CategoryList = ({
    categories,
    selectedCategory,
    onChange,
}: CategoryListProps) => {
    const handleClickTag = (tag: string) => () => {
        if (onChange) {
            onChange(tag);
        }
    };

    return (
        <ul className="flex flex-row flex-wrap break-words gap-3 px-4 py-3">
            {categories?.map((category) => (
                <li
                    key={category.fieldValue}
                    className={`cursor-pointer text-green-600 dark:text-green-600  p-2 ${
                        selectedCategory === category.fieldValue
                            ? 'cursor-not-allowed border-green-600 border-b-2'
                            : ''
                    }`}
                    onClick={handleClickTag(category.fieldValue)}
                >
                    {`#`}
                    {category.fieldValue} ({category.totalCount})
                </li>
            ))}
        </ul>
    );
};
