import Image from "next/image";
import React from "react";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { CodeCopyButton } from "./CodeCopyButton";

export const BlogComponents: MDXComponents = {
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
    // ✅ REQUIRED type guard
    if (typeof src !== "string") {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        {...props}
        width={800}
        height={400}
        className="rounded-lg"
      />
    );
  },

  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mb-6 text-4xl font-bold" {...props} />
  ),

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mb-4 mt-8 text-3xl font-semibold" {...props} />
  ),

  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-3 mt-6 text-2xl font-medium" {...props} />
  ),

  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props} />
  ),

  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />
  ),

  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />
  ),

  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7 text-muted-foreground" {...props} />
  ),

  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string" || typeof node === "number") {
        return String(node);
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
      }
      if (React.isValidElement(node)) {
  const element = node as React.ReactElement<{ children?: React.ReactNode }>;
  return getTextContent(element.props.children);
}

      return "";
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative mb-4">
        <pre
          className="overflow-x-auto rounded-lg border bg-muted/30 p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },

  code: ({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },

  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
};
