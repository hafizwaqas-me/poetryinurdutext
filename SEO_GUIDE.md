# SEO Configuration Guide

This guide explains how to configure URLs, metadata, schemas, and other SEO-related settings for your Urdu poetry site.

---

## 1. Update Domain/Base URL

Update your domain in **3 files**:

### File 1: `src/app/layout.tsx` (Line 20)
```typescript
metadataBase: new URL('https://poetryinurdutext.com'),  // Change to your domain
```

### File 2: `src/app/sitemap.ts` (Line 7)
```typescript
const baseUrl = 'https://poetryinurdutext.com';  // Change to your domain
```

### File 3: `src/components/schemas.tsx` (Multiple lines)
Update all occurrences of the URL in schema components.

---

## 2. Global Metadata (`src/app/layout.tsx`)

The `metadata` export configures SEO for all pages:

```typescript
export const metadata: Metadata = {
  // Base URL for all relative paths
  metadataBase: new URL('https://poetryinurdutext.com'),
  
  // Title configuration
  title: {
    default: "Poetry in Urdu Text - Best Urdu Poetry Collection",
    template: "%s | Poetry in Urdu Text",  // Used for page titles
  },
  
  // Main description (160 characters max recommended)
  description: "Discover the beauty of Urdu poetry...",
  
  // Keywords (comma-separated)
  keywords: ["urdu poetry", "sad poetry", "ghazal", ...],
  
  // Author info
  authors: [{ name: "Poetry in Urdu Text" }],
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "ur_PK",
    url: "https://poetryinurdutext.com",
    siteName: "Poetry in Urdu Text",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.jpg"],
  },
  
  // Google Search Console verification
  verification: {
    google: "your-google-verification-code",  // Get from Search Console
  },
};
```

---

## 3. Page-Level Metadata

Each page can have custom metadata via `generateMetadata()`:

### Category Page Example (`src/app/[category]/page.tsx`)
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  return {
    title: `${category.name} - ${category.nameUrdu}`,
    description: `Explore ${category.name}. ${category.description}`,
    keywords: [category.name, "urdu poetry", category.nameUrdu],
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}
```

### Poetry Post Example (`src/app/[category]/[slug]/page.tsx`)
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.category, params.slug);
  
  return {
    title: `${post.title} - ${post.titleUrdu}`,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
    },
  };
}
```

---

## 4. JSON-LD Schemas (`src/components/schemas.tsx`)

Schemas are added to help Google understand your content:

### Available Schemas:

| Schema | Use For | File to Add |
|--------|---------|-------------|
| `OrganizationSchema` | Site-wide | `layout.tsx` (already added) |
| `WebsiteSchema` | Site-wide | `layout.tsx` (already added) |
| `BreadcrumbSchema` | All pages | Page components |
| `ArticleSchema` | Blog posts | Blog post pages |
| `CreativeWorkSchema` | Poetry posts | Poetry post pages |
| `PersonSchema` | Poet pages | Poet biography pages |
| `CollectionSchema` | Category pages | Category pages |

### Adding Schema to a Page:

```tsx
import { CollectionSchema, BreadcrumbSchema } from '@/components/schemas';

export default function CategoryPage({ category, posts }) {
  return (
    <>
      {/* Add schemas in the page */}
      <CollectionSchema
        name={category.name}
        description={category.description}
        url={`https://poetryinurdutext.com/${category.slug}`}
        numberOfItems={posts.length}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://poetryinurdutext.com" },
          { name: category.name, url: `https://poetryinurdutext.com/${category.slug}` }
        ]}
      />
      
      {/* Rest of page content */}
    </>
  );
}
```

---

## 5. Sitemap & Robots

### Sitemap (`src/app/sitemap.ts`)
Automatically generates `/sitemap.xml` with all pages.

### Robots (`src/app/robots.ts`)
Configures `/robots.txt` for search engines:
```typescript
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: 'https://poetryinurdutext.com/sitemap.xml',
  };
}
```

---

## 6. Required Images

Create these images in `public/images/`:

| Image | Size | Purpose |
|-------|------|---------|
| `og-image.jpg` | 1200x630px | Social sharing preview |
| `logo.png` | 512x512px | Site logo for schemas |
| `favicon.ico` | 32x32px | Browser tab icon |
| `apple-touch-icon.png` | 180x180px | iOS home screen |

---

## 7. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Get the verification code
4. Add to `layout.tsx`:
   ```typescript
   verification: {
     google: "your-verification-code-here",
   },
   ```
5. Submit your sitemap: `https://poetryinurdutext.com/sitemap.xml`

---

## 8. Quick Checklist

- [ ] Update `metadataBase` URL in `layout.tsx`
- [ ] Update `baseUrl` in `sitemap.ts`
- [ ] Update URLs in `schemas.tsx`
- [ ] Create `og-image.jpg` (1200x630)
- [ ] Create `logo.png` (512x512)
- [ ] Create `favicon.ico`
- [ ] Add Google Search Console verification code
- [ ] Submit sitemap to Google Search Console
- [ ] Test with [Rich Results Test](https://search.google.com/test/rich-results)
