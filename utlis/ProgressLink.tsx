"use client";
import { usePathname } from "next/navigation";
import {useEffect} from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

nProgress.configure({showSpinner: true});

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