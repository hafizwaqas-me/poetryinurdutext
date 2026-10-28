'use client';

import { useState, useEffect, useCallback } from 'react';
import { Post, Poet } from '@/lib/types';
import Link from 'next/link';

interface SearchResult {
    posts: Post[];
    poets: Poet[];
}

export function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult>({ posts: [], poets: [] });
    const [isLoading, setIsLoading] = useState(false);

    // Listen for custom event to open search
    useEffect(() => {
        const handleOpenSearch = () => setIsOpen(true);
        window.addEventListener('openSearch', handleOpenSearch);
        return () => window.removeEventListener('openSearch', handleOpenSearch);
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Debounced search
    const performSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults({ posts: [], poets: [] });
            return;
        }

        setIsLoading(true);

        try {
            // For static site, we'll search through window data
            // This data is injected from server components
            const searchData = (window as unknown as { __SEARCH_DATA__?: { posts: Post[]; poets: Poet[] } }).__SEARCH_DATA__;

            if (searchData) {
                const normalizedQuery = searchQuery.toLowerCase();

                const matchingPosts = searchData.posts.filter((post: Post) => {
                    const searchText = `${post.title} ${post.titleUrdu || ''} ${post.poetry.map(p => p.text).join(' ')}`.toLowerCase();
                    return searchText.includes(normalizedQuery);
                }).slice(0, 10);

                const matchingPoets = searchData.poets.filter((poet: Poet) => {
                    const searchText = `${poet.name} ${poet.nameUrdu}`.toLowerCase();
                    return searchText.includes(normalizedQuery);
                });

                setResults({ posts: matchingPosts, poets: matchingPoets });
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => performSearch(query), 300);
        return () => clearTimeout(timer);
    }, [query, performSearch]);

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
        setResults({ posts: [], poets: [] });
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay open" onClick={handleClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-input-wrapper">
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search poetry, poets..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button
                        className="icon-btn"
                        onClick={handleClose}
                        style={{ width: '32px', height: '32px' }}
                    >
                        ✕
                    </button>
                </div>

                <div className="search-results">
                    {isLoading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    )}

                    {!isLoading && query.length >= 2 && results.posts.length === 0 && results.poets.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--foreground-muted)' }}>
                            No results found for "{query}"
                        </div>
                    )}

                    {/* Poets Results */}
                    {results.poets.length > 0 && (
                        <>
                            <div style={{ padding: '0.75rem 1.5rem', fontWeight: 600, color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>
                                POETS
                            </div>
                            {results.poets.map((poet) => (
                                <Link
                                    key={poet.slug}
                                    href={`/poets/${poet.slug}/`}
                                    className="search-result-item"
                                    onClick={handleClose}
                                >
                                    <div style={{ fontWeight: 600 }}>{poet.name}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)' }}>
                                        {poet.nameUrdu}
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {/* Posts Results */}
                    {results.posts.length > 0 && (
                        <>
                            <div style={{ padding: '0.75rem 1.5rem', fontWeight: 600, color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>
                                POETRY
                            </div>
                            {results.posts.map((post) => (
                                <Link
                                    key={`${post.category}-${post.slug}`}
                                    href={`/${post.category}/${post.slug}/`}
                                    className="search-result-item"
                                    onClick={handleClose}
                                >
                                    <div style={{ fontWeight: 600 }}>{post.title}</div>
                                    {post.titleUrdu && (
                                        <div style={{
                                            fontFamily: "'Jameel Noori Nastaleeq', serif",
                                            direction: 'rtl',
                                            fontSize: '1rem'
                                        }}>
                                            {post.titleUrdu}
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', marginTop: '0.25rem' }}>
                                        in {post.category.replace(/-/g, ' ')}
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {query.length < 2 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--foreground-muted)' }}>
                            Type at least 2 characters to search
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
