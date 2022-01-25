import * as React from 'react';

import kebabCase from 'lodash/kebabCase';

import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Bio from '../components/bio';

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata: SiteMetadata;
}

interface TagGroup {
    fieldValue: string;
    totlaCount: number;
}

interface MarkdownRemark {
    group: TagGroup[];
}

interface Data {
    allMarkdownRemark: MarkdownRemark;
    site: Site;
}

interface TagsPageProps {
    data: Data;
    location: Location;
}

const TagsPage = ({ location, data }: TagsPageProps) => {
    const {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    } = data;
    return (
        <Layout location={location} title={title}>
            <Seo title="All tags" />
            <Bio />
            <div>
                <h1>Tags</h1>
                <ul>
                    {group.map((tag) => (
                        <li key={tag.fieldValue}>
                            <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                                {tag.fieldValue} ({tag.totlaCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
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
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
