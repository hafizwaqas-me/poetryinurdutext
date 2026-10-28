'use client';

interface ShareButtonProps {
    title: string;
    description: string;
}

export function ShareButton({ title, description }: ShareButtonProps) {
    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({
                title,
                text: description,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <button className="action-btn" onClick={handleShare}>
            📤 Share Article
        </button>
    );
}
