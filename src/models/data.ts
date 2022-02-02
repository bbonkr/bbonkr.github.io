export interface GitHub {
    owner: string;
    repo: string;
}

export interface Frontmatter {
    title: string;
    date: Date;
    description?: string;
    categories?: string[];
    tags?: string[];
    github?: GitHub;
}

export interface Field {
    slug: string;
}

export interface MarkdownRemark {
    id: string;
    excerpt?: string;
    html: string;
    frontmatter: Frontmatter;
    fields: Field;
}

export interface Edge {
    node: MarkdownRemark;
}

export type Post = Edge;

export interface MarkdownRemarks {
    edges?: Edge[];
}

export interface Author {
    name: string;
    summary?: string;
    location?: string;
    description?: string;
}

export interface SiteMetadata {
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
    resume?: string;
}
