import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

type CmsSection = 'hero' | 'services' | 'testimonials' | 'blogs';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'cms');

async function ensureDir(): Promise<void> {
  try {
    await stat(DATA_DIR);
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readSection<T = unknown>(section: CmsSection): Promise<T | null> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${section}.json`);
  try {
    const buf = await readFile(filePath, 'utf8');
    return JSON.parse(buf) as T;
  } catch {
    return null;
  }
}

export async function writeSection(section: CmsSection, data: unknown): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${section}.json`);
  const json = JSON.stringify(data, null, 2);
  await writeFile(filePath, json, 'utf8');
}

export function isValidSection(value: string): value is CmsSection {
  return value === 'hero' || value === 'services' || value === 'testimonials' || value === 'blogs';
}


