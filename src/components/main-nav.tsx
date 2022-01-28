import * as React from 'react';
import { Link } from 'gatsby';

const MainNav = () => {
    return (
        <nav id="main-nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/tags">Tags</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;
