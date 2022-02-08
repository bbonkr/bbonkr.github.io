import { FluidObject } from 'gatsby-image';

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
    draft?: boolean;
    comments?: boolean;
    featuredImage?: FeaturedImage;
}

interface FeaturedImage {
    childImageSharp?: ImageSharp;
}

interface ImageSharp {
    fluid: FluidObject;
}

export interface Field {
    slug: string;
}

export interface MarkdownRemark {
    id: string;
    excerpt?: string;
    rawMarkdownBody?: string;
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

export interface Seo {
    facebookAppId?: string;
}

export interface SiteMetadata {
    title?: string;
    siteUrl?: string;
    author: Author;
    social?: Social;
    description?: string;
    seo?: Seo;
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
