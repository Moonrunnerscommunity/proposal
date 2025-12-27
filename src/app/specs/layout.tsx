'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

function FileTree({
  nodes,
  currentPath,
  depth = 0,
}: {
  nodes: FileNode[];
  currentPath: string;
  depth?: number;
}) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <ul className={depth === 0 ? '' : 'ml-4'}>
      {nodes.map((node) => (
        <li key={node.path}>
          {node.type === 'folder' ? (
            <>
              <button
                onClick={(e) => toggleFolder(node.path, e)}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-left text-sm text-[#e8e3f0] hover:bg-[#4a2b7b] rounded transition-colors"
              >
                <span className="text-[#8a6fb7]">
                  {expandedFolders.has(node.path) ? '▼' : '▶'}
                </span>
                {node.name}
              </button>
              {expandedFolders.has(node.path) && node.children && (
                <FileTree
                  nodes={node.children}
                  currentPath={currentPath}
                  depth={depth + 1}
                />
              )}
            </>
          ) : (
            <Link
              href={`/specs/${node.path}`}
              className={`flex items-center gap-2 w-full px-2 py-1.5 text-left text-sm rounded transition-colors ${
                currentPath === node.path
                  ? 'bg-[#8a6fb7] text-white'
                  : 'text-[#e8e3f0] hover:bg-[#4a2b7b]'
              }`}
            >
              <span className="text-[#8a6fb7] invisible">▶</span>
              {node.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function SpecsLayout({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Extract current file path from URL
  const currentPath = pathname.replace('/specs/', '').replace('/specs', '');

  useEffect(() => {
    fetch('/api/specs')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);

        // If on /specs with no slug, redirect to README
        if (pathname === '/specs' || pathname === '/specs/') {
          const readme = data.files?.find(
            (f: FileNode) => f.type === 'file' && f.name.toLowerCase() === 'readme'
          );
          if (readme) {
            router.replace(`/specs/${readme.path}`);
          }
        }
      })
      .catch(() => setLoading(false));
  }, [pathname, router]);

  return (
    <div className="min-h-screen flex bg-[#2e1a47]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3d2460] border-r border-[#8a6fb7]/30 p-4 overflow-y-auto flex-shrink-0">
        <h2 className="text-base font-semibold text-[#e8e3f0] mb-4">
          Specs
        </h2>
        {loading ? (
          <p className="text-[#8a6fb7] text-sm">Loading...</p>
        ) : files.length === 0 ? (
          <p className="text-[#8a6fb7] text-sm">No markdown files found</p>
        ) : (
          <FileTree nodes={files} currentPath={currentPath} />
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
