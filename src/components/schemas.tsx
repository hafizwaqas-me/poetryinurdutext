// JSON-LD Schema components for SEO

interface OrganizationSchemaProps {
    name?: string;
    url?: string;
    logo?: string;
}

export function OrganizationSchema({
    name = "Poetry in Urdu Text",
    url = "https://poetryinurdutext.com",
    logo = "https://poetryinurdutext.com/images/logo.png"
}: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        logo,
        sameAs: [
            "https://www.facebook.com/people/Urdu-Shero-Shayari",
            "https://www.instagram.com/urdusheroshayari/",
            "https://youtube.com/@PoetryinUrduText",
            "https://www.pinterest.com/poetryinurdutext/",
            "https://www.tiktok.com/@urdu.shero.shayari",
            "https://www.linkedin.com/company/urdu-shayari/",
            "https://chat.whatsapp.com/D619Nl313TM2xD4T0lMtTy",
            "https://t.me/+CfEubc0Z4mZlM2E0"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface WebsiteSchemaProps {
    name?: string;
    url?: string;
}

export function WebsiteSchema({
    name = "Poetry in Urdu Text",
    url = "https://poetryinurdutext.com"
}: WebsiteSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        url,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbSchemaProps {
    items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ArticleSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    image?: string;
}

export function ArticleSchema({
    title,
    description,
    url,
    datePublished,
    dateModified,
    author = "Poetry in Urdu Text",
    image
}: ArticleSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Organization",
            name: author
        },
        publisher: {
            "@type": "Organization",
            name: "Poetry in Urdu Text",
            logo: {
                "@type": "ImageObject",
                url: "https://poetryinurdutext.com/images/logo.png"
            }
        },
        ...(image && { image })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface CreativeWorkSchemaProps {
    name: string;
    description: string;
    url: string;
    author?: string;
    inLanguage?: string;
}

export function CreativeWorkSchema({
    name,
    description,
    url,
    author,
    inLanguage = "ur"
}: CreativeWorkSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        url,
        inLanguage,
        ...(author && {
            author: {
                "@type": "Person",
                name: author
            }
        })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface PersonSchemaProps {
    name: string;
    nameUrdu?: string;
    description: string;
    url: string;
    birthDate?: string;
    deathDate?: string;
    image?: string;
}

export function PersonSchema({
    name,
    nameUrdu,
    description,
    url,
    birthDate,
    deathDate,
    image
}: PersonSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        ...(nameUrdu && { alternateName: nameUrdu }),
        description,
        url,
        ...(birthDate && { birthDate }),
        ...(deathDate && { deathDate }),
        ...(image && { image }),
        jobTitle: "Poet"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface CollectionSchemaProps {
    name: string;
    description: string;
    url: string;
    numberOfItems: number;
}

export function CollectionSchema({
    name,
    description,
    url,
    numberOfItems
}: CollectionSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        numberOfItems
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for Google's "People Also Ask" feature
interface FAQ {
    question: string;
    answer: string;
}

interface FAQSchemaProps {
    faqs: FAQ[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    if (!faqs || faqs.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// How-To Schema for step-by-step guides
interface HowToStep {
    name: string;
    text: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    steps: HowToStep[];
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
