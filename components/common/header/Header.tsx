"use client";
import Link from "next/link";
import { Container, FormControl } from "react-bootstrap";
import Social from "../social/Social";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import ImageFunctionLink from "@/utlis/ImageFunctionLink";
import { useEffect } from "react";
import "./style.css";

type Site = {
    favicon?: string;
    title?: string;
    logo?: string;
};

type SocialItem = {
    site_social_link_name: string;
    site_social_link_url: string;
}

type Webdata = {
    site?: Site;
    socials?: SocialItem[];
};

type MenuItem = {
    url?: string;
    label?: string;
};
type Menu = {
    navbar_menu: MenuItem[];
};
type Props = {
    data?: Webdata;
    menu?: Menu;
};
// interface AddData {
//     title?: string;
//     link?: string;
//     image?: string;
// }
// interface AdType {
//     ads?: AddData[];
// }
const Header = ({ data, menu}: Props) => {
    const title = data?.site?.title ?? "Darpan Magazine";
    const logo = data?.site?.logo;

    // const [hasLoading, setLoading] = useState(true);
    // const [ads, setAds] = useState<AdType[] | null>(null);
    // const fetchData = useCallback(async() => {
    //     try{
    //         setLoading(true)
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-ads/`);
    //         const {response_data} = await response.json();
    //         setAds(response_data);
    //     }catch(err: unknown){
    //         console.log('Advertiesment fetch api data is somrthing wrong: ', (err as Error).message)
    //     }finally{
    //         setLoading(false)
    //     }
    // }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    // console.log('ads', ads)

    useEffect(() => {
        const body = document.body as HTMLElement;
        let previousScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 20) {
                if (currentScroll > previousScroll) {
                    body.classList.remove('sticky');
                } else {
                    body.classList.add('sticky');
                }
            } else if (currentScroll < 20) {
                body.classList.remove('sticky');
                body.classList.add('stickyFixed');
            } else {
                body.classList.add('sticky');
                body.classList.add('stickyFixed');
            }

            previousScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={"mainHeader"}>
            <div className="topHeader primary-background">
                <Container>
                    <div className="topHeaderWrapper">
                        <div className="leftArea d-flex align-items-center">
                            <Social data={data?.socials} classProps="round sm white header_social" />
                            <Link href="#" className="rj-btn-newsletter white-btn specialHover newsletterBtn">NEWSLETTER</Link>
                        </div>
                        <ImageFunctionLink
                            href={process.env.NEXT_PUBLIC_ENV_URL}
                            className="logo"
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${logo}`}
                            fallBack="assets/images/logo.webp"
                            alt={`${title} Logo` || "Darpan Magazine Logo"}
                            width={360} height={100}
                            style={{objectFit: "contain"}}
                        />
                        <div className="rightArea text-end">
                            <form className="headerSearch">
                                <div className="searchInput">
                                    <FormControl 
                                        type="text"
                                        name="global_search"
                                        placeholder="Search"
                                        className="rounded-0"
                                    />
                                    <button type="submit" aria-label="Search Button"><FontAwesomeIcon icon={faSearch} /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </div>
            <Navigation data={menu?.navbar_menu} />
        </header>
    )
}
export default Header;