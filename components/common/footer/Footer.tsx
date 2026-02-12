 "use client";

import Link from "next/link";
import { Container, FormControl } from "react-bootstrap";
import Social from "../social/Social";
import { FormEvent, useState } from "react";
import "./style.css"
import ImageFunction from "@/utlis/ImageFunction";
import ImageFunctionLink from "@/utlis/ImageFunctionLink";
type SocialItem = {
    site_social_link_name: string;
    site_social_link_url: string;
}
type Site = {
    title?: string;
    logo_mobile?: string;
    copyright?: string;
}
type Webdata = {
    site?: Site;
    socials?: SocialItem[];
};
type MenuItem = {
    url: string;
    label: string;
    before_footer_menu?: MenuItem[];
}
type Props = {
    data?: Webdata;
    menu?: MenuItem;
}
const Footer = ({data, menu} : Props) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const webLink = process.env.NEXT_PUBLIC_ENV_URL;
    const mediaLink = process.env.NEXT_PUBLIC_MEDIA_URL;
    const staticLink = process.env.NEXT_PUBLIC_ASSET_PREFIX;
    const title = data?.site?.title;
    const logo = data?.site?.logo_mobile;

    const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setStatusMessage("");

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Email is required.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            setError("Please enter a valid email.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmedEmail }),
            });

            if (!res.ok) throw new Error("Failed to submit");

            const data = await res.json();
            if(!data.response_code){
                setStatusMessage(data?.response_message);                
            }
            setStatusMessage(data?.response_message || "Subscription successful!");
            setEmail("");
        } catch {
            setStatusMessage("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <footer className="mainFooter">
            <Container>
                <div className="footerGrid">
                    <div className="left_column">
                        {menu?.before_footer_menu && menu?.before_footer_menu.length > 0 && (
                            <div className="fnav">
                                <ul>
                                    {menu?.before_footer_menu.map((value, index) => {
                                        const {url, label} = value;
                                        return(
                                            <li key={index} className="menu-item">
                                                <Link href={`${webLink}/${url}`}>{label}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                        <div className="logoRow d-flex align-items-end justify-content-between gap-3">
                            <ImageFunctionLink
                                href={webLink}
                                className="f_logo"
                                src={`${mediaLink}${logo}`}
                                alt={`${title} Logo` || 'Darpan Logo'}
                                width={280} height={80}
                                style={{objectFit: "contain"}}
                                fallBack="assets/images/logo.webp"
                            />
                            <Social data={data?.socials} classProps="footer_social" />
                        </div>
                        <div className="copyright">
                            <p>&#169; {new Date().getFullYear()} {data?.site?.copyright}</p>
                        </div>
                    </div>
                    <div className="right_column">
                        <ImageFunction
                            className="max-width other-logo"
                            src={`${staticLink}assets/images/week-unwrapped.png`}
                            alt="another logo"
                            width={206}
                            height={69}
                            style={{objectFit:"contain"}}
                        />
                        <div className="subscribe-part">
                            <p>{`Subscribe to 'The Week Unwrapped' your weekly passport to what matters - news, culture, community`}</p>
                            <form onSubmit={handleSubscribe} className="subscribeForm">
                                <div className="subscribeInput d-flex align-items-start">
                                    <FormControl
                                        type="email"
                                        name="email"
                                        placeholder="Enter  Your Email"
                                        className="rounded-0 bg-white"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <button type="submit" className="rj-btn-subscribe transparent-btn text-white" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Subscribe Now"}
                                    </button>
                                </div>
                                {error && <span className="text-danger mt-1 d-inline-block">{error}</span>}
                                {statusMessage && !error && (
                                    <span
                                        className={`mt-1 d-inline-block ${statusMessage.toLowerCase().includes("success") ? "text-success" : "text-danger"}`}
                                    >
                                        {statusMessage}
                                    </span>
                                )}
                            </form>
                        </div>
                        <div className="darpan-issue">
                            <div className="issue-title">{`DARPAN's Latest Issue`}</div>
                            <div className="btn_wrap">
                                <Link href="#" className="rj-btn-edition btn-edition">Digital Edition Here</Link>
                                <Link href="#" className="rj-btn-doorstep transparent-btn doorstep-btn text-white">Get DARPAN at Your Doorstep</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;
