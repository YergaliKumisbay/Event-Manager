'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Header.module.css";

/**
 * Grid-навигация, активный пункт, skip-link, sticky, мобильное меню.
 */

const NAV_ITEMS = [
    { href: "/events", label: "События" },
    { href: "/favorites", label: "Избранное" },
];

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => setMenuOpen(false), [pathname]);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? "open" : ""}`}>
            <a href="#main" className={styles.skip}>Skip to content</a>

            <div className={styles.inner}>
                <Link href="/" className={styles.logo} aria-label="Event Manager — go to home">
                    <span className={styles.logoMark}>E</span>
                    <span>Event&nbsp;Manager</span>
                </Link>

                <nav className={styles.nav} aria-label="Primary navigation">
                    <button
                        type="button"
                        className={styles.menuBtn}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="main-nav"
                        onClick={() => setMenuOpen(v => !v)}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                            {menuOpen
                                ? <path fill="currentColor" d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.42L10.6 13.4l-6.3 6.3 1.41 1.41 6.3-6.29 6.29 6.29 1.42-1.41-6.3-6.3 6.3-6.3z"/>
                                : <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>}
                        </svg>
                        <span className={styles.visuallyHidden}>Menu</span>
                    </button>

                    <div id="main-nav" className={styles.navList} role="menubar">
                        {NAV_ITEMS.map(({ href, label }) => {
                            const active = pathname === href || pathname?.startsWith(href + "/");
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                                    role="menuitem"
                                    aria-current={active ? "page" : undefined}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className={styles.actions}>
                    <Link href="/events/new" className={`${styles.cta} ${styles.ctaPrimary}`} aria-label="Create new event">
                        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z"/>
                        </svg>
                        <span>New</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
