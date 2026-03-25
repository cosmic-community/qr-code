# QR Code Generator

![App Preview](https://imgix.cosmicjs.com/1fe077b0-285d-11f1-bad2-97a3b964e8e2-autopilot-photo-1544197150-b99a580bb7a8-1774451585648.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A simple, beautiful QR Code generating application powered by [Cosmic](https://www.cosmicjs.com) CMS. Generate QR codes from any text or URL, customize their color, label them, save them to the cloud, and download them as images.

## Features

- ⚡ **Instant Generation** — QR codes render in real-time as you type
- 🎨 **Custom Colors** — Pick any foreground color for your QR codes
- 🏷️ **Labels** — Add descriptive labels for easy organization
- 💾 **Cloud Storage** — Save QR codes to Cosmic CMS for persistent access
- 📂 **Saved Gallery** — Browse and manage all your saved QR codes
- 📥 **Download** — Export any QR code as a high-resolution PNG image
- 📱 **Responsive** — Works beautifully on all devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69c3fb68ec4fb6783710a21c&clone_repository=69c3fc20ec4fb6783710a239)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want a very simple QR Code generating application"

### Code Generation Prompt

> "I want a very simple QR Code generating application"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [qrcode](https://www.npmjs.com/package/qrcode) — QR code generation library

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd qr-code-generator
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables — create a `.env.local` file:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching QR Codes
```typescript
const { objects } = await cosmic.objects
  .find({ type: 'qr-codes' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1);
```

### Creating a QR Code
```typescript
await cosmic.objects.insertOne({
  type: 'qr-codes',
  title: 'My QR Code',
  metadata: {
    content: 'https://example.com',
    label: 'Example Website',
    foreground_color: '#000000',
  },
});
```

## Cosmic CMS Integration

This app uses the **qr-codes** object type with the following metafields:

| Metafield | Type | Description |
|-----------|------|-------------|
| `content` | Text | The URL or text encoded in the QR code |
| `label` | Text | A descriptive label for the QR code |
| `foreground_color` | Text | Hex color code for the QR code foreground |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->