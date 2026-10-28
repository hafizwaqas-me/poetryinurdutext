import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';

export const Sidebar = () => {
    // Get latest 5 posts
    const posts = getAllPosts()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <aside className="sidebar">
            <div className="sidebar-widget">
                <h3 className="widget-title">📌 Recent Posts</h3>
                <div className="recent-posts-list">
                    {posts.map(post => (
                        <Link
                            key={post.slug}
                            href={`/${post.slug}/`}
                            className="recent-post-item"
                        >
                            <span className="post-title">
                                {post.titleUrdu || post.title}
                            </span>
                            <span className="post-date">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="sidebar-widget" style={{ marginTop: '2rem' }}>
                <h3 className="widget-title">📢 Stay Updated</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', marginBottom: '1rem' }}>
                    Get the latest Urdu poetry updates.
                </p>
                {/* Placeholder for future newsletter/social links */}
            </div>
        </aside>
    );
};
