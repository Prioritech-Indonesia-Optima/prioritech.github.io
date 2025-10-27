"use client";

import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

/**
 * Code Block Component
 * 
 * Displays code blocks with terminal aesthetic, optional line numbers,
 * and syntax highlighting support.
 * 
 * @param children - Code content to display
 * @param language - Programming language for syntax highlighting (optional)
 * @param showLineNumbers - Whether to show line numbers (default: true)
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing the code block
 */
export function CodeBlock({
  children,
  language = "javascript",
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  const codeString = typeof children === "string" ? children : String(children);
  const lines = codeString.split("\n");

  return (
    <div
      className={`relative bg-main/80 border border-secondary/30 rounded-lg overflow-hidden ${className}`}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-main border-b border-secondary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary/60 font-mono">~/{language}</span>
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto font-mono text-sm">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="group">
                {showLineNumbers && (
                  <td className="w-12 px-4 py-1 text-secondary/40 text-right select-none border-r border-secondary/20">
                    {index + 1}
                  </td>
                )}
                <td className="px-4 py-1 text-secondary/80 whitespace-pre">
                  <span className="text-accent">{line || " "}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

