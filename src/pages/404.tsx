import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';

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
            <header>
                <h1 className="text-2xl">404: Not Found</h1>
            </header>
            <main className="py-6">
                <section>
                    <p>You just hit a route that doesn&#39;t exist...</p>
                    <p>Sorry about that.</p>
                </section>
                <section className="py-3">
                    <p>How about find tagged posts at tags page.</p>
                    <p>
                        <Link to="/tags" className="text-green-600">
                            Go to Tags page
                        </Link>
                    </p>
                </section>
                <section className="py-3">
                    <p>How about find categorized posts at categories page.</p>
                    <Link to="/categories" className="text-green-600">
                        Go to Categories page
                    </Link>
                </section>
            </main>
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
