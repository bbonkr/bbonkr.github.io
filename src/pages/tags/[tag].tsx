import * as React from 'react';

import kebabCase from 'lodash/kebabCase';

import { Link, graphql, PageProps } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import Bio from '../../components/bio';
import { Post } from '../../models/data';
import PostListItem from '../../components/post-list-item';

interface PageContext {
    tag: string;
}

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

// interface Edge {
//     node: Post;
// }

interface Tag {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

interface MarkdownRemark {
    group: Tag[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const TagPage = ({
    location,
    data,
    params,
    pageContext,
}: PageProps<Data, PageContext>) => {
    const [selectedTag, setSelectedTag] = React.useState<string>(params.tag);

    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    const handleClickTag = (tag: string) => () => {
        setSelectedTag((_) => tag);
    };

    console.info(pageContext.tag, params.tag, data);

    return (
        <Layout location={location} title={title}>
            <Seo title={`Post taged by #${params.tag}`} />
            <Bio />
            <div>
                <h1>
                    {`Post taged by`}{' '}
                    <span className="text-green-500">{`#${params.tag}`}</span>{' '}
                </h1>
            </div>
            {selectedTag && (
                <div>
                    {data.allMarkdownRemark.group
                        .find((tag) => tag.fieldValue === selectedTag)
                        ?.edges.map((edge) => {
                            return (
                                <PostListItem
                                    key={edge.node.fields.slug}
                                    post={edge}
                                />
                            );
                        })}
                </div>
            )}
        </Layout>
    );
};

export default TagPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
                edges {
                    node {
                        excerpt(format: PLAIN)
                        fields {
                            slug
                        }
                        frontmatter {
                            date(formatString: "MMMM DD, YYYY")
                            title
                            tags
                            categories
                        }
                    }
                }
            }
        }
    }
`;
