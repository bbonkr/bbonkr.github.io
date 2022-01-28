import { Link } from 'gatsby';
import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Post } from '../models/data';
import { TagTitle, TagList } from './tags';

import '../components/tags/tag-list.css';

interface PostListItemProps {
    post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
    return (
        <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
        >
            <header>
                <h2>
                    <Link to={post.node.fields.slug} itemProp="url">
                        <span itemProp="headline">
                            {post.node.frontmatter.title}
                        </span>
                    </Link>
                </h2>
                <small>{post.node.frontmatter.date}</small>
            </header>
            <section>
                <p
                    dangerouslySetInnerHTML={{
                        __html:
                            (post.node.frontmatter.description ||
                                post.node.excerpt) ??
                            '',
                    }}
                    itemProp="description"
                />
            </section>
            <footer>
                <div>
                    <TagTitle />

                    <ul className="tags-list">
                        {post.node.frontmatter.tags?.map((tag) => (
                            <li key={tag}>
                                <Link to={`/tags/${kebabCase(tag)}`}>
                                    {`#`}
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </article>
    );
};

export default PostListItem;
