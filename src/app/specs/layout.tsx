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
  expandedFolders,
  onToggleFolder,
}: {
  nodes: FileNode[];
  currentPath: string;
  depth?: number;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
}) {
  const toggleFolder = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onToggleFolder(path);
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
                  expandedFolders={expandedFolders}
                  onToggleFolder={onToggleFolder}
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

// Collect all folder paths up to a certain depth
function collectFolderPaths(nodes: FileNode[], maxDepth: number, currentDepth = 0): string[] {
  if (currentDepth >= maxDepth) return [];
  const paths: string[] = [];
  for (const node of nodes) {
    if (node.type === 'folder') {
      paths.push(node.path);
      if (node.children) {
        paths.push(...collectFolderPaths(node.children, maxDepth, currentDepth + 1));
      }
    }
  }
  return paths;
}

// Get folder paths that contain the current file path
function getPathAncestors(filePath: string): string[] {
  const parts = filePath.split('/');
  const ancestors: string[] = [];
  for (let i = 1; i < parts.length; i++) {
    ancestors.push(parts.slice(0, i).join('/'));
  }
  return ancestors;
}

export default function SpecsLayout({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Extract current file path from URL
  const currentPath = pathname.replace('/specs/', '').replace('/specs', '');

  const toggleFolder = (path: string) => {
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

  useEffect(() => {
    fetch('/api/specs')
      .then((res) => res.json())
      .then((data) => {
        const fetchedFiles = data.files || [];
        setFiles(fetchedFiles);
        setLoading(false);

        // Auto-expand folders on initial load
        if (!initialized && fetchedFiles.length > 0) {
          // Expand folders up to 3 levels deep by default
          const defaultExpanded = collectFolderPaths(fetchedFiles, 3);
          // Also expand ancestors of the current path
          const pathAncestors = getPathAncestors(currentPath);
          setExpandedFolders(new Set([...defaultExpanded, ...pathAncestors]));
          setInitialized(true);
        }

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
  }, [pathname, router, currentPath, initialized]);

  // Expand ancestors when navigating to a file
  useEffect(() => {
    if (currentPath && initialized) {
      const pathAncestors = getPathAncestors(currentPath);
      if (pathAncestors.length > 0) {
        setExpandedFolders((prev) => {
          const next = new Set(prev);
          pathAncestors.forEach((p) => next.add(p));
          return next;
        });
      }
    }
  }, [currentPath, initialized]);

  return (
    <div className="min-h-screen flex bg-[#2e1a47]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-12' : 'w-64'
        } bg-[#3d2460] border-r border-[#8a6fb7]/30 overflow-y-auto flex-shrink-0 transition-all duration-200 flex flex-col`}
      >
        {/* Header with toggle */}
        <div className="flex items-center justify-between p-3 border-b border-[#8a6fb7]/30">
          {!sidebarCollapsed && (
            <h2 className="text-base font-semibold text-[#e8e3f0]">Specs</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded hover:bg-[#4a2b7b] text-[#8a6fb7] hover:text-[#e8e3f0] transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        </div>

        {/* File tree */}
        {!sidebarCollapsed && (
          <div className="p-4 flex-1 overflow-y-auto">
            {loading ? (
              <p className="text-[#8a6fb7] text-sm">Loading...</p>
            ) : files.length === 0 ? (
              <p className="text-[#8a6fb7] text-sm">No markdown files found</p>
            ) : (
              <FileTree
                nodes={files}
                currentPath={currentPath}
                expandedFolders={expandedFolders}
                onToggleFolder={toggleFolder}
              />
            )}
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
