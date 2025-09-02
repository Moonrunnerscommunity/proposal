import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const NOTES_PATH = path.resolve(process.cwd(), 'scripts/auditNotes.json');

export async function POST(req: NextRequest) {
  try {
    const { address, type, comment, opensea } = await req.json();
    if (!address) {
      return NextResponse.json({ error: 'Missing address' }, { status: 400 });
    }
    // Read current notes
    const file = await fs.readFile(NOTES_PATH, 'utf-8');
    const notes = JSON.parse(file);
    // Update note
    notes[address.toLowerCase()] = [type, comment, opensea];
    // Write back
    await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 4));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 