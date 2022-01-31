import { Link } from 'gatsby';
import * as React from 'react';
import { Post } from '../models/data';
import { SimpleTagList } from './tags';
import { SimpleCategoryList } from './categories';

import '../components/tags/tag-list.css';

interface PostListItemProps {
    post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
    return (
        <article
            className="post-list-item py-6"
            itemScope
            itemType="http://schema.org/Article"
        >
            <header className="pt-6">
                <aside>
                    {post.node.frontmatter.categories && (
                        <SimpleCategoryList
                            categories={post.node.frontmatter.categories}
                        />
                    )}
                </aside>
                <h2 className="font-bold font-sans break-words text-gray-900 dark:text-gray-100 pb-2 text-3xl md:text-4xl">
                    <Link to={post.node.fields.slug} itemProp="url">
                        <span itemProp="headline">
                            {post.node.frontmatter.title}
                        </span>
                    </Link>
                </h2>
                <small className="text-sm md:text-base font-normal text-gray-600 dark:text-gray-400">
                    {post.node.frontmatter.date}
                </small>
            </header>
            <section className="article-body mt-1 break-words">
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
                <aside className="text-base md:text-sm text-gray-500 flex flex-row">
                    <SimpleTagList tags={post.node.frontmatter.tags} />
                </aside>
            </footer>
        </article>
    );
};

export default PostListItem;
