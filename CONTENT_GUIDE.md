# Content Management Guide

A complete guide for adding categories, posts, poetry, FAQs, and maintaining SEO rankings.

---

## 📁 Folder Structure Overview

```
content/
├── categories/
│   ├── sad-poetry/           ← Category folder (URL: /sad-poetry/)
│   │   ├── _meta.md          ← Category metadata & intro article
│   │   ├── dil-ki-baat.md    ← Post (URL: /sad-poetry/dil-ki-baat/)
│   │   └── tanhai.md         ← Another post
│   ├── urdu-quotes/
│   ├── allama-iqbal/
│   └── your-new-category/    ← Add new categories here
├── poets/
│   ├── allama-iqbal.md
│   └── mirza-ghalib.md
├── blog/
│   └── history-of-poetry.md
└── pages/
    ├── about.md
    └── contact.md
```

---

## 1. Adding a New Category

### Step 1: Create Category Folder
```bash
content/categories/love-poetry/    ← Folder name = URL slug
```

### Step 2: Create `_meta.md` File
```markdown
---
name: Love Poetry
nameUrdu: محبت کی شاعری
description: Beautiful romantic Urdu poetry about love, affection, and relationships.
icon: ❤️
color: "#dc2626"
---

# Love Poetry - محبت کی شاعری

Love poetry (محبت کی شاعری) is one of the most popular forms of Urdu literature. 
This collection features romantic verses that express the deepest emotions of the heart.

## Themes in Love Poetry

- **True Love (سچی محبت)**: Poetry about eternal love
- **First Love (پہلی محبت)**: Verses about new love
- **Separation (جدائی)**: The pain of being apart

## Why Love Poetry Touches Hearts

Urdu love poetry uses beautiful metaphors and imagery to express emotions...

[Add 500-1000 words for SEO - this appears on the category page]
```

### Step 3: URL Structure
Your category will be available at:
```
https://poetryinurdutext.com/love-poetry/
```

---

## 2. Adding Posts to a Category

### Create Post File
Create a `.md` file in the category folder:
```
content/categories/love-poetry/mohabbat-ki-shayari.md
```

### Post Format
```markdown
---
title: Mohabbat Ki Shayari
titleUrdu: محبت کی شاعری
description: Beautiful love poetry collection for romantic souls.
poet: Various Poets
date: 2024-01-15
featured: true
poetry:
  - text: |
      تیری مسکراہٹ میں جادو ہے کوئی
      دل دھڑکتا ہے تو یاد آتی ہے تو
    poet: Unknown
  - text: |
      محبت کا سفر ہے یہ مشکل بہت
      ہر قدم پہ امتحان ہے نیا
    poet: Faiz Ahmed Faiz
  - text: |
      آنکھوں میں تیری کائنات ہے
      تیرے بغیر زندگی ادھوری لگتی ہے
    poet: Unknown
---
```

### URL Structure
Post will be available at:
```
https://poetryinurdutext.com/love-poetry/mohabbat-ki-shayari/
```

---

## 3. Poetry Card Format

Each poetry item in a post needs:

```yaml
poetry:
  - text: |
      اردو شاعری کی پہلی لائن
      دوسری لائن (اگر ہو)
    poet: شاعر کا نام (Optional)
    textRoman: |
      Urdu shayari ki pehli line
      Doosri line (Roman Urdu - Optional)
```

### Multi-line Poetry
```yaml
poetry:
  - text: |
      ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے
      بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے
    poet: مرزا غالب
```

### Single-line Poetry
```yaml
poetry:
  - text: "زندگی میں مشکلات ضرور آتی ہیں"
```

---

## 4. Retaining SEO Rankings (URL Migration)

### ✅ CRITICAL: Match Your WordPress URLs

Your WordPress URL structure:
```
https://poetryinurdutext.com/category/sad-poetry/     → WordPress
https://poetryinurdutext.com/sad-poetry/              → Next.js
```

### If WordPress uses `/category/` prefix:
You need to add redirects. Create `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  
  // Redirect old WordPress URLs to new URLs
  async redirects() {
    return [
      {
        source: '/category/:slug*',
        destination: '/:slug*',
        permanent: true,  // 301 redirect (SEO friendly)
      },
    ];
  },
};
```

### Match Exact Post URLs
If your WordPress post URL is:
```
https://poetryinurdutext.com/dil-ki-baat/
```
Create post at:
```
content/categories/[category]/dil-ki-baat.md
```
Slug must match exactly!

---

## 5. Adding FAQs (People Also Ask)

### Step 1: Add FAQs to Post
```markdown
---
title: Sad Poetry Collection
poetry:
  - text: "..."
faqs:
  - question: "What is sad poetry in Urdu called?"
    answer: "Sad poetry in Urdu is called 'غمگین شاعری' (Ghamgeen Shayari) or 'اداس شاعری' (Udaas Shayari). It expresses emotions of heartbreak, loss, and melancholy."
  - question: "Who is the best sad poetry writer in Urdu?"
    answer: "Mirza Ghalib, Mir Taqi Mir, and Faiz Ahmed Faiz are considered the best sad poetry writers. Their ghazals express deep emotions of love and loss."
  - question: "Where can I find sad poetry in Urdu text?"
    answer: "You can find sad poetry in Urdu text at poetryinurdutext.com. We offer a large collection of sad poetry with copy, download, and share features."
---
```

### Step 2: Category-Level FAQs
Add FAQs to `_meta.md`:
```markdown
---
name: Sad Poetry
faqs:
  - question: "What are the best sad poetry lines?"
    answer: "Some famous sad poetry lines include..."
  - question: "How to write sad poetry?"
    answer: "Writing sad poetry requires..."
---
```

---

## 6. Schema Markup (Already Configured)

Schemas are automatically added:

| Page Type | Schemas Added |
|-----------|---------------|
| All Pages | Organization, Website |
| Categories | CollectionPage |
| Poetry Posts | CreativeWork |
| Poet Pages | Person |
| Blog Posts | Article |
| FAQs | FAQPage (when FAQs present) |

---

## 7. AI Optimization (llms.txt)

Create `public/llms.txt` for AI crawlers:
```text
# Poetry in Urdu Text

> Best collection of Urdu poetry with copy, download, and share features.

## Categories
- Sad Poetry: Heart touching sad poetry in Urdu
- Love Poetry: Romantic Urdu poetry
- Urdu Quotes: Inspiring quotes in Urdu
- Two Lines Poetry: Short poetry for social media

## Featured Poets
- Allama Iqbal: Philosopher poet of Pakistan
- Mirza Ghalib: Master of Urdu ghazal
- Faiz Ahmed Faiz: Revolutionary poet

## Features
- Copy poetry to clipboard
- Download poetry as image
- Share on WhatsApp, Facebook, Twitter
- Dark/Light mode
- Search functionality

## Contact
- Website: https://poetryinurdutext.com
- Facebook: https://facebook.com/...
```

---

## 8. Complete Example: Adding "Friendship Poetry"

### 1. Create folder
```
content/categories/friendship-poetry/
```

### 2. Create `_meta.md`
```markdown
---
name: Friendship Poetry
nameUrdu: دوستی کی شاعری
description: Beautiful Urdu poetry about friendship and friends.
icon: 🤝
faqs:
  - question: "What is friendship poetry in Urdu?"
    answer: "Friendship poetry celebrates the bond between friends..."
  - question: "Who wrote famous friendship poetry?"
    answer: "Many Urdu poets have written about friendship..."
---

# Friendship Poetry - دوستی کی شاعری

Friendship is a beautiful bond celebrated in Urdu poetry...
[500-1000 words SEO content]
```

### 3. Create `dosti-shayari.md`
```markdown
---
title: Dosti Shayari Collection
titleUrdu: دوستی شاعری
description: Best friendship poetry in Urdu for your friends.
date: 2024-01-20
featured: true
poetry:
  - text: |
      دوست وہ ہے جو مشکل میں کام آئے
      جو ہر وقت ساتھ نبھائے
    poet: Unknown
  - text: |
      سچے دوست کم ملتے ہیں
      جو مل جائیں انہیں سنبھال کر رکھنا
faqs:
  - question: "Best friendship shayari for WhatsApp?"
    answer: "Here are some popular friendship shayari lines..."
---
```

### 4. Result URLs
```
https://poetryinurdutext.com/friendship-poetry/
https://poetryinurdutext.com/friendship-poetry/dosti-shayari/
```

---

## 9. Frontmatter Reference

### Category `_meta.md`
| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | English name |
| `nameUrdu` | Yes | Urdu name |
| `description` | Yes | SEO description |
| `icon` | No | Emoji icon |
| `color` | No | Hex color |
| `faqs` | No | FAQ array |

### Post `.md`
| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | English title |
| `titleUrdu` | No | Urdu title |
| `description` | No | SEO description |
| `poet` | No | Default poet name |
| `date` | Yes | YYYY-MM-DD |
| `featured` | No | Show on homepage |
| `poetry` | Yes | Poetry array |
| `faqs` | No | FAQ array |

### Poetry Item
| Field | Required | Description |
|-------|----------|-------------|
| `text` | Yes | Poetry text (Urdu) |
| `poet` | No | Poet name |
| `textRoman` | No | Roman Urdu text |

---

## 10. Checklist for New Category

- [ ] Create folder: `content/categories/[slug]/`
- [ ] Create `_meta.md` with name, nameUrdu, description, icon
- [ ] Add SEO intro article (500-1000 words) in `_meta.md`
- [ ] Add FAQs to `_meta.md`
- [ ] Create at least one post `.md` file
- [ ] Add poetry items with text and poet
- [ ] Add FAQs to post
- [ ] Run `npm run build` to verify
- [ ] Check URL matches WordPress URL structure
