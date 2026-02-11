"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXTwitter,
    faFacebook,
    faLinkedin,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Styles from './style.module.css'; // Adjust path as needed

interface ShareProps {
    data?: {
        heading?: string;
    };
}

const Share: React.FC<ShareProps> = ({ data }) => {
    const pathname = usePathname();
    const baseUrl = process.env.NEXT_PUBLIC_ENV_URL || '';
    const fullUrl = `${baseUrl}${pathname}`;
    const shareText = encodeURIComponent(data?.heading || '');
    const encodedUrl = encodeURIComponent(fullUrl);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(fullUrl);
        alert("Link copied to clipboard!");
        // Pro-tip: Replace alert with a nice Toast notification later!
    };

    return (
        <div className={`d-flex align-items-start gap-4 post_share ${Styles.post_share ?? ''}`}>
            <span className='mt-1'>Share in Post: </span>
            <div className={`d-flex align-items-center flex-wrap post_social ${Styles.social}`}>
                <Link
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faXTwitter} />
                </Link>
                <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </Link>

                <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </Link>

                <Link
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </Link>

                <button
                    onClick={copyToClipboard}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
                    title="Copy Link"
                >
                    <FontAwesomeIcon icon={faLink} />
                </button>

            </div>
        </div>
    );
};

export default Share;