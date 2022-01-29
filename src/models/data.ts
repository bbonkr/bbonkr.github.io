interface GitHub {
    owner: string;
    repo: string;
}

interface Frontmatter {
    title: string;
    date: Date;
    description?: string;
    categories?: string[];
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

export type Post = Edge;

interface MarkdownRemarks {
    edges?: Edge[];
}

interface Author {
    name: string;
    summary?: string;
    location?: string;
}

interface SiteMetadata {
    title?: string;
    author: Author;
    social?: Social;
}

export interface Site {
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

export interface Tag {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

export interface Category {
    fieldValue: string;
    totalCount: number;
    edges: Post[];
}

export interface Social {
    twitter?: string;
    github?: string;
    linkedin?: string;
    facebook?: string;
}
