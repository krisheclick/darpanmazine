"use client";
import { usePathname } from "next/navigation";
import {useEffect} from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

nProgress.configure({showSpinner: true});
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

const ProgressLink = () => {
    const pathname = usePathname();

    useEffect(() => {
        nProgress.start()

        const timer = setTimeout(() => {
            nProgress.done();
        }, 500);

        return () => {
            clearTimeout(timer);
            nProgress.done();
        }

    }, [pathname]);

    return null;
}

export default ProgressLink;