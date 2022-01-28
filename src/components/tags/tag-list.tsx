import * as React from 'react';
import { Tag } from '../../models/data';

import './tag-list.css';

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
        <ul className="tags-list">
            {tags.map((tag) => (
                <li
                    key={tag.fieldValue}
                    className={`cursor-pointer ${
                        selectedTag === tag.fieldValue
                            ? 'cursor-not-allowed active'
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
