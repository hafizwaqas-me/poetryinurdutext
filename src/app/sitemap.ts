import { getAllCategories, getPostsByCategory, getAllPoets, getAllBlogPosts } from '@/lib/content';

export const dynamic = 'force-static';

export default async function sitemap() {
    const baseUrl = 'https://poetryinurdutext.com';

    // Static pages
    const staticPages = [
        '',
        '/poets',
        '/blog',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Categories
    const categories = getAllCategories();
    const categoryPages = categories.map(category => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    // Posts
    const postPages = categories.flatMap(category => {
        const posts = getPostsByCategory(category.slug);
        return posts.map(post => ({
            url: `${baseUrl}/${post.slug}`,
            lastModified: post.date,
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    });

    // Poets
    const poets = getAllPoets();
    const poetPages = poets.map(poet => ({
        url: `${baseUrl}/poets/${poet.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Blog posts
    const blogPosts = await getAllBlogPosts();
    const blogPages = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [
        ...staticPages,
        ...categoryPages,
        ...postPages,
        ...poetPages,
        ...blogPages,
    ];
}
