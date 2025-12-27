import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const filePath = pathSegments.join('/');
    const fullPath = path.join(process.cwd(), 'specs', filePath + '.md');

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found', requested: fullPath }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    return NextResponse.json({ content, path: filePath });
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
