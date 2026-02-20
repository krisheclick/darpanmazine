"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
    html: string;
    className?: string;
};

export default function DangerHTML({ html, className }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    window.instgrm?.Embeds.process();
    if (window.twttr?.widgets) {
        window.twttr.widgets.load();
    }

    useEffect(() => {
        if (!html) return;
        
        const interval = setInterval(() => {
            // Twitter
            if (window.twttr?.widgets) {
                window.twttr.widgets.load(containerRef.current ?? undefined);
            }

            // Instagram
            if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process();
            }

            // Telegram
            const telegramScript = document.createElement("script");
            telegramScript.src = "https://telegram.org/js/telegram-widget.js?22";
            telegramScript.async = true;

            containerRef.current?.querySelectorAll("script[data-telegram-post]").forEach((oldScript) => {
                oldScript.parentNode?.replaceChild(
                    telegramScript.cloneNode(true),
                    oldScript
                );
            });

            clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);
    }, [html]);

    return (
        <>
            <div
                ref={containerRef}
                className={className}
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <Script
                src="https://platform.twitter.com/widgets.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://www.instagram.com/embed.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://telegram.org/js/telegram-widget.js?22"
                strategy="lazyOnload"
            />
        </>
    );
}