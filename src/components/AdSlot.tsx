'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ADS_CONFIG } from '@/config/ads';

interface AdSlotProps {
    type?: 'card' | 'banner' | 'inline';
    slotId?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function AdSlot({
    type = 'banner',
    slotId,
    className = '',
    style = {}
}: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUnfilled, setIsUnfilled] = useState(false);

    // Resolve slot ID from props or fallback to configuration defaults
    const resolvedSlotId = slotId || (
        type === 'banner' ? ADS_CONFIG.slots.postBanner : ADS_CONFIG.slots.postInline
    );

    const client = ADS_CONFIG.client;

    useEffect(() => {
        const adElement = adRef.current;
        if (!adElement) return;

        // Listen for AdSense attribute updates to detect unfilled or filled status
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                    const adStatus = adElement.getAttribute('data-ad-status');
                    const adsbygoogleStatus = adElement.getAttribute('data-adsbygoogle-status');

                    if (adStatus === 'unfilled') {
                        setIsUnfilled(true);
                    } else if (adsbygoogleStatus === 'done' || adStatus === 'filled') {
                        setIsLoaded(true);
                    }
                }
            }
        });

        observer.observe(adElement, {
            attributes: true,
            attributeFilter: ['data-ad-status', 'data-adsbygoogle-status']
        });

        // Initialize AdSense push only if not already requested
        try {
            if (typeof window !== 'undefined') {
                const status = adElement.getAttribute('data-adsbygoogle-status');
                if (!status) {
                    ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
                        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
                }
            }
        } catch {
            // Silently handle any initialization errors
        }

        return () => {
            observer.disconnect();
        };
    }, [resolvedSlotId]);

    // If AdSense returns unfilled, hide the container completely
    if (isUnfilled) {
        return null;
    }

    const typeClass = type === 'banner'
        ? 'ad-slot-banner'
        : type === 'card'
            ? 'ad-slot-card'
            : 'ad-slot-inline';

    return (
        <div
            className={`ad-container ${typeClass} ${className}`}
            style={{
                display: 'block',
                textAlign: 'center',
                margin: type === 'banner' ? '1.5rem auto' : '1rem auto',
                overflow: 'hidden',
                // Keep zero padding/border so no empty box shows when waiting or unfilled
                padding: 0,
                border: 'none',
                background: 'transparent',
                ...style,
            }}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                data-ad-client={client}
                data-ad-slot={resolvedSlotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}

// Utility to determine ad placement frequency in grids
export function shouldShowAd(index: number, interval: number = 6): boolean {
    return (index + 1) % interval === 0 && index > 0;
}
