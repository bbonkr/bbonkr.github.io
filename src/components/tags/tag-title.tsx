import * as React from 'react';
import { FaTags } from 'react-icons/fa';

import './tag-list.css';

export const TagTitle = () => {
    return (
        <React.Fragment>
            <div className="tag-title">
                <FaTags />
                <span>Tags:</span>
            </div>
        </React.Fragment>
    );
};
