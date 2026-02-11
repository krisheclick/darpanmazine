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
import Styles from './style.module.css';

interface ShareProps {
  title?: string; // Changed from data to title to match your usage
}

const Share: React.FC<ShareProps> = ({ title }) => {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_ENV_URL || '';
  const fullUrl = `${baseUrl}${pathname}`;
  
  // URL Encoding ensures special characters in titles don't break the links
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title || '');

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(fullUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={`d-flex align-items-start gap-4 post_share ${Styles.post_share ?? ''}`}>
      <span className='mt-1'>Share in Post: </span>
      <div className={`d-flex align-items-center flex-wrap post_social ${Styles.social}`}>
        <Link 
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} 
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
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </Link>

        <button 
          onClick={copyToClipboard} 
          className="btn-reset" // Use a class to handle the button styling in CSS
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
        >
          <FontAwesomeIcon icon={faLink} />
        </button>

      </div>
    </div>
  );
};

export default Share;