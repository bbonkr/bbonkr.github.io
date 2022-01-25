interface GitHub {
    owner: string;
    repo: string;
}

interface Frontmatter {
    title: string;
    date: Date;
    description?: string;
    tags?: string[];
    github?: GitHub;
}

interface Field {
    slug: string;
}

interface MarkdownRemark {
    id: string;
    excerpt?: string;
    html: string;
    frontmatter: Frontmatter;
    fields: Field;
}

interface Edge {
    node: MarkdownRemark;
}

interface MarkdownRemarks {
    edges?: Edge[];
}

interface SiteMetadata {
    title: string;
}

interface Site {
    siteMetadata?: SiteMetadata;
}

export interface Data {
    site: Site;
    markdownRemark: MarkdownRemark;
    previous: MarkdownRemark;
    next: MarkdownRemark;
}

export interface Posts {
    site: Site;
    allMarkdownRemark: MarkdownRemarks;
}
