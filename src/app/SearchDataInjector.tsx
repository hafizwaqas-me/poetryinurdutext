'use client';

import { useEffect } from 'react';
import { Post, Poet } from '@/lib/types';

// Extend window type
declare global {
    interface Window {
        __SEARCH_DATA__?: {
            posts: Post[];
            poets: Poet[];
        };
    }
}

interface SearchDataInjectorProps {
    posts: Post[];
    poets: Poet[];
}

export function SearchDataInjector({ posts, poets }: SearchDataInjectorProps) {
    useEffect(() => {
        // Inject search data into window for client-side search
        window.__SEARCH_DATA__ = { posts, poets };
    }, [posts, poets]);

    return null;
}
