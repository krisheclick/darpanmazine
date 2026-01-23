"use client";
import Link from "next/link";
import Image from "next/image";
import { CSSProperties, useState } from "react";

interface ImageProps {
    className?: string;
    href?: string;
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    fallBack?: string;
    style?: CSSProperties;
}
const noImage = "assets/images/noimage.webp";
const ImageFunctionLink = ({
    className,
    href="#",
    src,
    alt="Default Alt",
    width,
    height,
    fallBack,
    style
}:ImageProps) => {
    const [hasLoading, setLoading] = useState(true);
    const fallBackImage = `${process.env.NEXT_PUBLIC_ASSET_PREFIX}${fallBack || noImage}`;
    const imageSrc = src || fallBackImage;

    const isFixed = typeof width === "number" && typeof height === "number";
    return(
        <Link
            href={href}
            className={`custom_image ${!isFixed ? 'fixedImage': ''} ${className || ''}`}
        >
            <Image
                src={imageSrc}
                alt={alt}
                {...(isFixed ? ({width, height}) : ({fill: true}))}
                priority
                onLoad={() => setLoading(false)}
                placeholder="blur"
                blurDataURL={fallBackImage}
                className={hasLoading ? 'loading': 'loaded'}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src=`${fallBackImage}`;
                }}
                style={style}
            />
        </Link>
    )
}

export default ImageFunctionLink;