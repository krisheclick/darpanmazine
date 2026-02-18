"use client";
import Image, { ImageLoader } from "next/image";
import { CSSProperties, useState } from "react";

interface ImageProps {
    className?: string;
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    fallBack?: string;
    style?: CSSProperties;
    staticImage?: boolean;
    backGroundImage?: boolean;
}
const default_image = 'assets/images/noimage.webp';
const asset_prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

const imageLoader:ImageLoader = ({src, width, quality}) => {
    return `${process.env.NEXT_PUBLIC_MEDIA_URL}${src}?w=${width}&q=${quality || 75}`;
}
const ImageFunction = ({
    className,
    src,
    alt="Default Alt",
    width,
    height,
    fallBack,
    style,
    staticImage = false,
    backGroundImage = false
}: ImageProps) => {
    const [hasLoading, setLoading] = useState(true);

    const imageFallback = `${asset_prefix}${fallBack || default_image}`;
    const imageSrc = src || imageFallback;
    const isFixed = typeof width === "number" && typeof height === "number";
    
    return(
        <figure
            className={`custom_image${!isFixed ? " fixedImage" : ""}${staticImage ? ' staticImage':''} ${className || ''}`}
            // style={
            //     backGroundImage
            //     ? { "--bg-image": `url(${imageSrc})` } as React.CSSProperties
            //     : undefined
            // }
        >
            <Image
                loader={imageLoader}
                src={imageSrc}
                alt={alt}
                {...(isFixed ? ({width, height}) : ({fill: true}))}
                priority
                placeholder="blur"
                blurDataURL={imageFallback}
                onLoad={() => setLoading(false)}
                className={`${hasLoading ? 'loading': 'loaded'}`}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src= imageFallback
                }}
                style={style}
            />
        </figure>
    )
}

export default ImageFunction;