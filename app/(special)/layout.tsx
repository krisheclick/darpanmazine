import seoData from "@/seo.config"
import { Inter, Tinos } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import "@/app/globals.css";
import "@/app/responsive.css";
import "@/components/common/box/style.css";
import ProgressLink from "@/utlis/ProgressLink";

const inter = Inter({
    variable: "--font-primary",
    subsets: ["latin"],
    preload: false,
});

const tinos = Tinos({
    weight: ["400", "700"],
    variable: "--font-tinos",
    subsets: ["latin"],
    preload: false,
});

export async function generateMetadata() {
    return seoData;
}


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const webInfo = await fetch(`${apiURL}/settings-items`, { cache: "no-store" });
    const { response_data } = await webInfo.json();

    const menu = await fetch(`${apiURL}/menu`, { cache: "no-store" });
    const navigation = await menu.json();


    return (
        <html lang="en">
            <body className={`${inter.variable} ${tinos.variable}`}>
                <ProgressLink />
                <main className="mainContainer">{children}</main>
            </body>
        </html>
    );
}
