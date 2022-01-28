import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

interface SiteMetadata {
    title: string;
}
interface Site {
    siteMetadata: SiteMetadata;
}

interface Data {
    site: Site;
}

type NotFoundPageProps = PageProps<Data>;

const NotFoundPage = ({ data, location }: NotFoundPageProps) => {
    const title = `404: Not Found`;
    const siteTitle = data.site.siteMetadata?.title;

    return (
        <Layout location={location} title={siteTitle ?? title}>
            <Seo title={title} />
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    );
};

export default NotFoundPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
