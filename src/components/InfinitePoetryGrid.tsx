'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PoetryCard } from './PoetryCard';
import { AdSlot, shouldShowAd } from './AdSlot';
import { ADS_CONFIG } from '@/config/ads';
import { Post, Poetry } from '@/lib/types';

interface InfinitePoetryGridProps {
    initialPosts: Post[];
    allPoetry: Poetry[];
    itemsPerPage?: number;
}

export function InfinitePoetryGrid({
    allPoetry,
    itemsPerPage = 12
}: InfinitePoetryGridProps) {
    const [displayCount, setDisplayCount] = useState(itemsPerPage);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const displayedPoetry = allPoetry.slice(0, displayCount);
    const hasMore = displayCount < allPoetry.length;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isLoading) {
                    setIsLoading(true);
                    // Simulate loading delay for smooth UX
                    setTimeout(() => {
                        setDisplayCount(prev => Math.min(prev + itemsPerPage, allPoetry.length));
                        setIsLoading(false);
                    }, 300);
                }
            },
            { threshold: 0.1 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [hasMore, isLoading, itemsPerPage, allPoetry.length]);

    return (
        <>
            <div className="poetry-grid">
                {displayedPoetry.map((poetry, index) => (
                    <React.Fragment key={poetry.id}>
                        <PoetryCard poetry={poetry} />
                        {/* Show ad after every 6-8 cards */}
                        {shouldShowAd(index, 7) && (
                            <AdSlot type="card" slotId={ADS_CONFIG.slots.categoryInline} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Infinite scroll loader */}
            {hasMore && (
                <div ref={loaderRef} className="loading-spinner" style={{ marginTop: '2rem' }}>
                    {isLoading && <div className="spinner"></div>}
                </div>
            )}

            {!hasMore && displayedPoetry.length > 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: 'var(--foreground-muted)'
                }}>
                    You&apos;ve reached the end! 📜
                </div>
            )}
        </>
    );
}
