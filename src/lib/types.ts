// Types for the Poetry Site

export interface FAQ {
    question: string;
    answer: string;
}

export interface Poetry {
    id: string;
    text: string;
    textRoman?: string; // Roman Urdu version
    poet?: string;
}

export interface Post {
    slug: string;
    title: string;
    titleUrdu?: string;
    description?: string;
    poetry: Poetry[];
    poet?: string;
    category: string;
    date: string;
    featured?: boolean;
    content?: string; // HTML/Markdown content from body
    faqs?: FAQ[]; // Optional FAQs for the post
}

export interface Category {
    slug: string;
    name: string;
    nameUrdu: string;
    description: string;
    icon: string;
    color?: string;
    introArticle?: string; // HTML content from markdown
    postCount?: number;
    faqs?: FAQ[]; // Optional FAQs for the category
}

export interface Poet {
    slug: string;
    name: string;
    nameUrdu: string;
    bio: string;
    image?: string;
    birthYear?: string;
    deathYear?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category?: string;
    image?: string;
}

export interface PageContent {
    title: string;
    content: string;
}

export type CardBackground =
    | 'cream'
    | 'dark'
    | 'blue'
    | 'green'
    | 'pink'
    | 'purple'
    | 'sunset'
    | 'night';

export const CARD_BACKGROUNDS: CardBackground[] = [
    'cream',
    'dark',
    'blue',
    'green',
    'pink',
    'purple',
    'sunset',
    'night'
];
