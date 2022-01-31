import * as React from 'react';

// import kebabCase from 'lodash/kebabCase';

import { graphql, PageProps } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import Bio from '../../components/bio';
import { Tag } from '../../models/data';
import PostListItem from '../../components/post-list-item';
import { TagList } from '../../components/tags';

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

interface MarkdownRemark {
    group: Tag[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

const TagsPage = ({ location, data }: PageProps<Data>) => {
    const [selectedTag, setSelectedTag] = React.useState<string>();

    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;

    const handleClickTag = (tag: string) => {
        setSelectedTag((_) => tag);
    };

    return (
        <Layout location={location} title={title}>
            <Seo title="All tags" />
            <Bio />
            <div>
                <h1>Tags</h1>

                <TagList
                    tags={group}
                    selectedTag={selectedTag}
                    onChange={handleClickTag}
                />
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

export default TagsPage;

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
