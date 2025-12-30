import "./style.css";
import Link from "next/link";
import {
    faFacebookF,
    faInstagram,
    faPinterest,
    faTiktok,
    faXTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SocialItem = {
    site_social_link_name: string;
    site_social_link_url: string;
}
type Props = {
    data?: SocialItem[];
    classProps?: string ;
}

const socialIconMap: Record<string, IconDefinition> = {
    facebook: faFacebookF,
    instagram: faInstagram,
    twitter: faXTwitter,
    youtube: faYoutube,
    pinterest: faPinterest,
    tiktok: faTiktok
};

const Social = ({ data, classProps}: Props) => {
    return (
        <div className={`social ${classProps}`}>
            {data?.map((item, index) => {
                const iconName = item.site_social_link_name.toLowerCase();
                const icon = socialIconMap[iconName];
                if (!icon) return null;

                return (
                    <Link
                        key={index}
                        href={item.site_social_link_url}
                        target="_blank"
                        aria-label={item.site_social_link_name}
                        className={iconName ? `rj_${iconName}` : ''}
                    >
                        <span><FontAwesomeIcon icon={icon} /></span>                        
                    </Link>
                );
            })}
        </div>
    )
}

export default Social;

