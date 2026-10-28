import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {items.map((item, index) => (
                <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>›</span>
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        <span style={{ color: 'var(--foreground)' }}>{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
