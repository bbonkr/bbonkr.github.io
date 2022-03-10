import * as React from 'react';
import { Tag } from '../../models/data';

interface TagListProps {
    tags: Tag[];
    selectedTag?: string;
    onChange?: (tag: string) => void;
}

export const TagList = ({ tags, selectedTag, onChange }: TagListProps) => {
    const handleClickTag = (tag: string) => () => {
        if (onChange) {
            onChange(tag);
        }
    };

    return (
        <ul className="flex flex-row flex-wrap break-words gap-3 px-4 py-3">
            {tags.map((tag) => (
                <li
                    key={tag.fieldValue}
                    className={`cursor-pointer text-green-600 dark:text-green-600  p-2 ${
                        selectedTag === tag.fieldValue
                            ? 'cursor-not-allowed border-green-600 border-b-2'
                            : ''
                    }`}
                    onClick={handleClickTag(tag.fieldValue)}
                >
                    {`#`}
                    {tag.fieldValue} ({tag.totalCount})
                </li>
            ))}
        </ul>
    );
};
