interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedLink({ href, className, children }: AnimatedLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// Static text wrapper kept for compatibility with Webflow-derived components.
export function ShuffleText({
  children,
  className,
  tag: Tag = "span",
}: {
  children: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}) {
  const Comp = Tag as React.ElementType;
  return <Comp className={className}>{children}</Comp>;
}
