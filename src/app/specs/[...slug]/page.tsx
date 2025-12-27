import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import MarkdownContent from './MarkdownContent';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SpecPage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = slug.join('/');
  const fullPath = path.join(process.cwd(), 'specs', filePath + '.md');

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const content = fs.readFileSync(fullPath, 'utf-8');

  return <MarkdownContent content={content} />;
}

export async function generateStaticParams() {
  const specsDir = path.join(process.cwd(), 'specs');

  function getMarkdownPaths(dir: string, basePath: string = ''): { slug: string[] }[] {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const paths: { slug: string[] }[] = [];

    for (const item of items) {
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

      if (item.isDirectory()) {
        paths.push(...getMarkdownPaths(path.join(dir, item.name), relativePath));
      } else if (item.name.endsWith('.md')) {
        const slug = relativePath.replace('.md', '').split('/');
        paths.push({ slug });
      }
    }

    return paths;
  }

  return getMarkdownPaths(specsDir);
}
