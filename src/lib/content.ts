import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, Category, Poet, BlogPost, Poetry } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

// ===== CATEGORIES =====

export function getAllCategories(): Category[] {
    const categoriesDir = path.join(contentDirectory, 'categories');

    if (!fs.existsSync(categoriesDir)) {
        return getDefaultCategories();
    }

    const categoryFolders = fs.readdirSync(categoriesDir).filter(folder => {
        const fullPath = path.join(categoriesDir, folder);
        return fs.statSync(fullPath).isDirectory();
    });

    return categoryFolders.map(folder => {
        const metaPath = path.join(categoriesDir, folder, '_meta.md');

        if (fs.existsSync(metaPath)) {
            const fileContents = fs.readFileSync(metaPath, 'utf8');
            const { data, content } = matter(fileContents);

            // Count posts in category
            const posts = getPostsByCategory(folder);

            return {
                slug: folder,
                name: data.name || folder,
                nameUrdu: data.nameUrdu || folder,
                description: data.description || '',
                icon: data.icon || '📝',
                color: data.color,
                introArticle: content,
                postCount: posts.length
            };
        }

        // Default category data
        return getDefaultCategoryData(folder);
    });
}

export function getCategoryBySlug(slug: string): Category | null {
    const categories = getAllCategories();
    return categories.find(cat => cat.slug === slug) || null;
}

function getDefaultCategories(): Category[] {
    return [
        { slug: 'sad-poetry', name: 'Sad Poetry', nameUrdu: 'اداس شاعری', description: 'Heart touching sad poetry collection', icon: '💔', postCount: 0 },
        { slug: 'urdu-quotes', name: 'Urdu Quotes', nameUrdu: 'اردو اقوال', description: 'Inspiring Urdu quotes', icon: '💬', postCount: 0 },
        { slug: 'urdu-poetry', name: 'Urdu Poetry', nameUrdu: 'اردو شاعری', description: 'Classic Urdu poetry', icon: '📜', postCount: 0 },
        { slug: 'two-lines-poetry', name: 'Two Lines Poetry', nameUrdu: 'دو لائن شاعری', description: 'Beautiful two line poetry', icon: '✨', postCount: 0 },
        { slug: 'allama-iqbal', name: 'Allama Iqbal', nameUrdu: 'علامہ اقبال', description: 'Poetry of Allama Iqbal', icon: '🌟', postCount: 0 },
        { slug: 'mirza-ghalib', name: 'Mirza Ghalib', nameUrdu: 'مرزا غالب', description: 'Poetry of Mirza Ghalib', icon: '🎭', postCount: 0 },
    ];
}

function getDefaultCategoryData(slug: string): Category {
    const defaults: Record<string, Category> = {
        'sad-poetry': { slug, name: 'Sad Poetry', nameUrdu: 'اداس شاعری', description: 'Heart touching sad poetry', icon: '💔', postCount: 0 },
        'urdu-quotes': { slug, name: 'Urdu Quotes', nameUrdu: 'اردو اقوال', description: 'Inspiring Urdu quotes', icon: '💬', postCount: 0 },
        'urdu-poetry': { slug, name: 'Urdu Poetry', nameUrdu: 'اردو شاعری', description: 'Classic Urdu poetry', icon: '📜', postCount: 0 },
        'two-lines-poetry': { slug, name: 'Two Lines Poetry', nameUrdu: 'دو لائن شاعری', description: 'Two line poetry', icon: '✨', postCount: 0 },
        'allama-iqbal': { slug, name: 'Allama Iqbal', nameUrdu: 'علامہ اقبال', description: 'Poetry by Allama Iqbal', icon: '🌟', postCount: 0 },
        'mirza-ghalib': { slug, name: 'Mirza Ghalib', nameUrdu: 'مرزا غالب', description: 'Poetry by Mirza Ghalib', icon: '🎭', postCount: 0 },
    };

    return defaults[slug] || { slug, name: slug, nameUrdu: slug, description: '', icon: '📝', postCount: 0 };
}

// ===== POSTS =====

export function getAllPosts(): Post[] {
    const categoriesDir = path.join(contentDirectory, 'categories');
    const allPosts: Post[] = [];

    if (!fs.existsSync(categoriesDir)) {
        return getSamplePosts();
    }

    const categoryFolders = fs.readdirSync(categoriesDir).filter(folder => {
        const fullPath = path.join(categoriesDir, folder);
        return fs.statSync(fullPath).isDirectory();
    });

    categoryFolders.forEach(category => {
        const posts = getPostsByCategory(category);
        allPosts.push(...posts);
    });

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allPosts.length > 0 ? allPosts : getSamplePosts();
}

export function getPostsByCategory(category: string): Post[] {
    const categoryDir = path.join(contentDirectory, 'categories', category);

    if (!fs.existsSync(categoryDir)) {
        return getSamplePosts().filter(p => p.category === category);
    }

    const files = fs.readdirSync(categoryDir).filter(file =>
        file.endsWith('.md') && file !== '_meta.md'
    );

    const posts = files.map(file => {
        const filePath = path.join(categoryDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Parse poetry from frontmatter
        const poetry: Poetry[] = (data.poetry || []).map((p: { text: string; textRoman?: string; poet?: string }, index: number) => ({
            id: `${file.replace('.md', '')}-${index}`,
            text: p.text,
            textRoman: p.textRoman,
            poet: p.poet || data.poet
        }));

        return {
            slug: file.replace('.md', ''),
            title: data.title || file.replace('.md', ''),
            titleUrdu: data.titleUrdu,
            description: data.description,
            poetry,
            content, // Raw markdown content
            poet: data.poet,
            category,
            date: data.date || new Date().toISOString(),
            featured: data.featured || false,
            faqs: data.faqs
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(category: string, slug: string): Post | null {
    const posts = getPostsByCategory(category);
    return posts.find(post => post.slug === slug) || null;
}

// Get post by slug only (for root-level post URLs like /post-slug/)
export function getPostBySlugOnly(slug: string): Post | null {
    const allPosts = getAllPosts();
    return allPosts.find(post => post.slug === slug) || null;
}

export function getFeaturedPosts(limit: number = 6): Post[] {
    const allPosts = getAllPosts();
    const featured = allPosts.filter(post => post.featured);

    if (featured.length >= limit) {
        return featured.slice(0, limit);
    }

    return allPosts.slice(0, limit);
}

function getSamplePosts(): Post[] {
    return [
        {
            slug: 'dil-ki-baat',
            title: 'Dil Ki Baat',
            titleUrdu: 'دل کی بات',
            description: 'Beautiful poetry about heart feelings',
            poetry: [
                { id: '1', text: 'دل کی بات زبان پہ آئے تو کیا کہیں\nخاموشی بھی ایک انداز ہے بیان کا', poet: 'Unknown' },
                { id: '2', text: 'کچھ باتیں ہیں جو الفاظ میں نہیں ڈھلتیں\nاور کچھ الفاظ ہیں جو دل تک نہیں پہنچتے', poet: 'Unknown' },
                { id: '3', text: 'تیری یاد آئی تو آنسو بہہ گئے\nدل نے کہا یہ بارش ہے محبت کی', poet: 'Unknown' },
            ],
            category: 'sad-poetry',
            date: '2024-01-15',
            featured: true
        },
        {
            slug: 'ishq-ka-safar',
            title: 'Ishq Ka Safar',
            titleUrdu: 'عشق کا سفر',
            description: 'Journey of love in poetry',
            poetry: [
                { id: '4', text: 'عشق کا سفر ہے یہ مشکل بہت\nہر قدم پہ امتحان ہے نیا', poet: 'Unknown' },
                { id: '5', text: 'محبت میں جو گرتے ہیں وہ سنبھل جاتے ہیں\nمگر جو گر کے ٹوٹ جائیں وہ پھر نہیں اٹھتے', poet: 'Unknown' },
            ],
            category: 'urdu-poetry',
            date: '2024-01-14',
            featured: true
        },
        {
            slug: 'zindagi-quotes',
            title: 'Zindagi Quotes',
            titleUrdu: 'زندگی کے اقوال',
            description: 'Quotes about life',
            poetry: [
                { id: '6', text: 'زندگی گزارنے کے دو ہی طریقے ہیں\nایک یہ کہ کچھ بھی معجزہ نہیں ہے\nاور دوسرا یہ کہ سب کچھ معجزہ ہے' },
                { id: '7', text: 'وقت سب کچھ سکھا دیتا ہے\nبس تھوڑا صبر چاہیے' },
            ],
            category: 'urdu-quotes',
            date: '2024-01-13',
            featured: false
        },
        {
            slug: 'do-line-shayari',
            title: 'Do Line Shayari Collection',
            titleUrdu: 'دو لائن شاعری',
            description: 'Beautiful two line poetry',
            poetry: [
                { id: '8', text: 'تیری مسکراہٹ میں جادو ہے کوئی\nدل دھڑکتا ہے تو یاد آتی ہے تو' },
                { id: '9', text: 'آنکھوں میں تیری کائنات ہے\nتیرے بغیر زندگی ادھوری لگتی ہے' },
                { id: '10', text: 'بارش کی بوندیں جب گرتی ہیں\nتیری یاد دل میں تازہ ہو جاتی ہے' },
            ],
            category: 'two-lines-poetry',
            date: '2024-01-12',
            featured: true
        }
    ];
}

// ===== POETS =====

export function getAllPoets(): Poet[] {
    const poetsDir = path.join(contentDirectory, 'poets');

    if (!fs.existsSync(poetsDir)) {
        return getSamplePoets();
    }

    const files = fs.readdirSync(poetsDir).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
        return getSamplePoets();
    }

    return files.map(file => {
        const filePath = path.join(poetsDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: file.replace('.md', ''),
            name: data.name || file.replace('.md', ''),
            nameUrdu: data.nameUrdu || '',
            bio: content || data.bio || '',
            image: data.image,
            birthYear: data.birthYear,
            deathYear: data.deathYear
        };
    });
}

export function getPoetBySlug(slug: string): Poet | null {
    const poets = getAllPoets();
    return poets.find(poet => poet.slug === slug) || null;
}

function getSamplePoets(): Poet[] {
    return [
        {
            slug: 'allama-iqbal',
            name: 'Allama Muhammad Iqbal',
            nameUrdu: 'علامہ محمد اقبال',
            bio: 'Allama Muhammad Iqbal (1877-1938) was a poet, philosopher, and politician in British India who is widely regarded as having inspired the Pakistan Movement.',
            birthYear: '1877',
            deathYear: '1938'
        },
        {
            slug: 'mirza-ghalib',
            name: 'Mirza Asadullah Khan Ghalib',
            nameUrdu: 'مرزا اسداللہ خان غالب',
            bio: 'Mirza Ghalib (1797-1869) was a prominent Urdu and Persian poet during the last years of the Mughal Empire.',
            birthYear: '1797',
            deathYear: '1869'
        },
        {
            slug: 'faiz-ahmed-faiz',
            name: 'Faiz Ahmed Faiz',
            nameUrdu: 'فیض احمد فیض',
            bio: 'Faiz Ahmed Faiz (1911-1984) was a Pakistani poet and author known for his revolutionary poetry.',
            birthYear: '1911',
            deathYear: '1984'
        }
    ];
}

// ===== BLOG =====

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const blogDir = path.join(contentDirectory, 'blog');

    if (!fs.existsSync(blogDir)) {
        return getSampleBlogPosts();
    }

    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
        return getSampleBlogPosts();
    }

    const posts = await Promise.all(files.map(async file => {
        const filePath = path.join(blogDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);

        return {
            slug: file.replace('.md', ''),
            title: data.title || file.replace('.md', ''),
            description: data.description || '',
            content: processedContent.toString(),
            date: data.date || new Date().toISOString(),
            category: data.category,
            image: data.image
        };
    }));

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllBlogPosts();
    return posts.find(post => post.slug === slug) || null;
}

function getSampleBlogPosts(): BlogPost[] {
    return [
        {
            slug: 'history-of-urdu-poetry',
            title: 'The Beautiful History of Urdu Poetry',
            description: 'Explore the rich history and evolution of Urdu poetry from its origins to modern times.',
            content: '<h2>Origins of Urdu Poetry</h2><p>Urdu poetry has a rich history spanning several centuries...</p>',
            date: '2024-01-10',
            category: 'history'
        },
        {
            slug: 'famous-ghazal-poets',
            title: 'Top 10 Famous Ghazal Poets of All Time',
            description: 'Discover the legendary poets who shaped the art of Ghazal writing.',
            content: '<h2>Masters of Ghazal</h2><p>The Ghazal form has been perfected by many legendary poets...</p>',
            date: '2024-01-08',
            category: 'poets'
        }
    ];
}

// ===== PAGES =====

export async function getPageContent(pageName: string): Promise<{ title: string; content: string }> {
    const pagePath = path.join(contentDirectory, 'pages', `${pageName}.md`);

    if (!fs.existsSync(pagePath)) {
        return getDefaultPageContent(pageName);
    }

    const fileContents = fs.readFileSync(pagePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);

    return {
        title: data.title || pageName,
        content: processedContent.toString()
    };
}

function getDefaultPageContent(pageName: string): { title: string; content: string } {
    const defaults: Record<string, { title: string; content: string }> = {
        about: {
            title: 'About Us',
            content: '<h2>Welcome to Poetry in Urdu Text</h2><p>We are dedicated to preserving and sharing the beauty of Urdu poetry. Our collection features works from legendary poets as well as contemporary voices.</p><h3>Our Mission</h3><p>To make Urdu poetry accessible to everyone and to celebrate the rich literary heritage of Urdu language.</p>'
        },
        contact: {
            title: 'Contact Us',
            content: '<h2>Get in Touch</h2><p>We would love to hear from you! Whether you have suggestions, want to contribute poetry, or just want to say hello.</p><h3>Connect With Us</h3><p>Follow us on social media or send us an email at contact@poetryinurdutext.com</p>'
        },
        'privacy-policy': {
            title: 'Privacy Policy',
            content: '<h2>Privacy Policy</h2><p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p><h3>Information We Collect</h3><p>We collect minimal information necessary to provide you with the best experience on our website.</p>'
        },
        terms: {
            title: 'Terms of Service',
            content: '<h2>Terms of Service</h2><p>By using our website, you agree to these terms of service.</p><h3>Use of Content</h3><p>All poetry content on this site is for personal use and sharing. Please credit the original poets when sharing.</p>'
        }
    };

    return defaults[pageName] || { title: pageName, content: '<p>Content coming soon.</p>' };
}

// ===== SEARCH =====

export function searchContent(query: string): { posts: Post[]; poets: Poet[] } {
    const allPosts = getAllPosts();
    const allPoets = getAllPoets();

    const normalizedQuery = query.toLowerCase().trim();

    const matchingPosts = allPosts.filter(post => {
        const searchText = `${post.title} ${post.titleUrdu || ''} ${post.description || ''} ${post.poetry.map(p => p.text).join(' ')}`.toLowerCase();
        return searchText.includes(normalizedQuery);
    });

    const matchingPoets = allPoets.filter(poet => {
        const searchText = `${poet.name} ${poet.nameUrdu} ${poet.bio}`.toLowerCase();
        return searchText.includes(normalizedQuery);
    });

    return { posts: matchingPosts, poets: matchingPoets };
}
