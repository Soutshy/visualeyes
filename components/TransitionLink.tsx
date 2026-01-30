"use client";

import { useTransition } from "@/components/TransitionContext";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
    const { startTransition } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        startTransition(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}
