import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

function getMarkdownFiles(dir: string, basePath: string = ''): FileNode[] {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result: FileNode[] = [];

  for (const item of items) {
    const relativePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      const children = getMarkdownFiles(path.join(dir, item.name), relativePath);
      if (children.length > 0) {
        result.push({
          name: item.name,
          path: relativePath,
          type: 'folder',
          children,
        });
      }
    } else if (item.name.endsWith('.md')) {
      result.push({
        name: item.name.replace('.md', ''),
        path: relativePath.replace('.md', ''),
        type: 'file',
      });
    }
  }

  return result.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function GET() {
  try {
    const specsDir = path.join(process.cwd(), 'specs');

    if (!fs.existsSync(specsDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = getMarkdownFiles(specsDir);
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error reading specs directory:', error);
    return NextResponse.json({ error: 'Failed to read specs directory' }, { status: 500 });
  }
}
