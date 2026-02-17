'use client';

import React, { forwardRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Style from './style.module.css';

type PageCoverProps = {
    children: ReactNode;
    imageSrc?: string;
    alt?: string;
};

type PageProps = {
    children?: ReactNode;
    imageSrc?: string;
    number: number;
};

type FlipEvent = {
    data: number;
};

type ChangeEvent = {
    data: string;
};

type MyBookState = {
    page: number;
    totalPage: number;
    state: string;
    orientation: string;
};

type FlipBookHandle = {
    pageFlip: () => {
        flipNext: () => void;
        flipPrev: () => void;
        getPageCount: () => number;
    } | undefined;
};


const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(({ children, imageSrc, alt }, ref) => {
    return (
        <div className={`${Style.flipBookPage} ${Style.flipBookCover}`} ref={ref}>
            <div className={`${Style.flipBookCoverContent}`}>
                {imageSrc ? (
                    <div className={Style.flipBookPageImage}>
                        <img
                            src={imageSrc}
                            alt={alt ?? 'Cover page'}
                            className={Style.flipBookPageImageEL}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ) : (
                    <h2>{children}</h2>
                )}
            </div>
        </div>
    );
});

PageCover.displayName = 'PageCover';

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, imageSrc, number }, ref) => {
    return (
        <div className={`${Style.flipBookPage}`} ref={ref}>
            <div className={`${Style.flipBookPageContent}`}>
                {/* <h2 className="page-header">Page header - {number}</h2> */}
                <div className={Style.flipBookPageImage}>
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={`PDF page ${number}`}
                            className={Style.flipBookPageImageEL}
                            loading="lazy"
                            decoding="async"
                        />
                    ) : null}
                </div>
                {/* <div className="page-text">{children}</div> */}
                {/* <div className="page-footer">{number + 1}</div> */}
            </div>
        </div>
    );
});

Page.displayName = 'Page';

const Flipbook = () => {
    const BOOK_RATIO = 1.414;
    const BOOK_WIDTH = 400;
    const BOOK_MIN_WIDTH = 315;
    const BOOK_MAX_WIDTH = 500;
    const BOOK_STAGE_MAX_WIDTH = BOOK_MAX_WIDTH * 2;
    const BOOK_HEIGHT = Math.round(BOOK_WIDTH * BOOK_RATIO);
    const BOOK_MIN_HEIGHT = Math.round(BOOK_MIN_WIDTH * BOOK_RATIO);
    const BOOK_MAX_HEIGHT = Math.round(BOOK_MAX_WIDTH * BOOK_RATIO);
    const INITIAL_PDF_PAGES = 4;
    const flipBookRef = useRef<FlipBookHandle | null>(null);
    const [pdfPages, setPdfPages] = useState<Array<string | null>>([]);
    const [isLoadingPdf, setIsLoadingPdf] = useState(true);
    const [isLoadingMorePages, setIsLoadingMorePages] = useState(false);
    const [pdfError, setPdfError] = useState<string | null>(null);
    const [bookState, setBookState] = useState<MyBookState>({
        page: 0,
        totalPage: 0,
        state: 'read',
        orientation: 'landscape',
    });

    const getBook = useCallback(() => flipBookRef.current?.pageFlip(), []);

    const nextButtonClick = useCallback(() => {
        getBook()?.flipNext();
    }, [getBook]);

    const prevButtonClick = useCallback(() => {
        getBook()?.flipPrev();
    }, [getBook]);

    const onPage = useCallback((e: FlipEvent) => {
        setBookState((prev) => ({ ...prev, page: e.data }));
    }, []);

    const onChangeState = useCallback((e: ChangeEvent) => {
        setBookState((prev) => ({ ...prev, state: e.data }));
    }, []);

    const onChangeOrientation = useCallback((e: ChangeEvent) => {
        setBookState((prev) => ({ ...prev, orientation: e.data }));
    }, []);

    const syncTotalPages = useCallback(() => {
        setBookState((prev) => ({ ...prev, totalPage: getBook()?.getPageCount() ?? 0 }));
    }, [getBook]);

    // useEffect(() => {
    //     syncTotalPages();
    // }, [syncTotalPages, pdfPages.length]);

    useEffect(() => {
        let isCancelled = false;

        const loadPdfPages = async () => {
            try {
                setIsLoadingPdf(true);
                setIsLoadingMorePages(false);
                setPdfError(null);

                const pdfjs = await import('pdfjs-dist');
                pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                    'pdfjs-dist/build/pdf.worker.min.mjs',
                    import.meta.url
                ).toString();

                const pdf = await pdfjs.getDocument('/DemoMagazine.pdf').promise;
                const renderPage = async (pageIndex: number) => {
                    const page = await pdf.getPage(pageIndex);
                    const viewport = page.getViewport({ scale: 1.414 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (!context) {
                        throw new Error('Could not create canvas context for PDF rendering.');
                    }

                    canvas.width = Math.floor(viewport.width);
                    canvas.height = Math.floor(viewport.height);

                    await page.render({ canvas, canvasContext: context, viewport }).promise;
                    return canvas.toDataURL('image/jpeg', 0.9);
                };

                const initialPagesToLoad = Math.max(1, Math.min(INITIAL_PDF_PAGES, pdf.numPages));
                const initialPages: Array<string | null> = Array.from({ length: pdf.numPages }, () => null);

                for (let pageIndex = 1; pageIndex <= initialPagesToLoad; pageIndex += 1) {
                    initialPages[pageIndex - 1] = await renderPage(pageIndex);
                }

                if (!isCancelled) {
                    setPdfPages(initialPages);
                    setIsLoadingPdf(false);
                }

                if (initialPagesToLoad < pdf.numPages) {
                    if (!isCancelled) {
                        setIsLoadingMorePages(true);
                    }

                    const remainingPages = [...initialPages];
                    for (let pageIndex = initialPagesToLoad + 1; pageIndex <= pdf.numPages; pageIndex += 1) {
                        const pageImage = await renderPage(pageIndex);
                        remainingPages[pageIndex - 1] = pageImage;
                    }

                    if (!isCancelled) {
                        setPdfPages(remainingPages);
                    }
                }
            } catch {
                if (!isCancelled) {
                    setPdfError('Failed to load PDF pages.');
                }
            } finally {
                if (!isCancelled) {
                    setIsLoadingPdf(false);
                    setIsLoadingMorePages(false);
                }
            }
        };

        loadPdfPages();

        return () => {
            isCancelled = true;
        };
    }, []);

    if (isLoadingPdf) {
        return (
            <div className={Style.flipbookWrapper}>
                <div
                    className={Style.flipbookStage}
                    style={{
                        width: '100%',
                        maxWidth: BOOK_STAGE_MAX_WIDTH,
                        minWidth: BOOK_MIN_WIDTH,
                        height: BOOK_MAX_HEIGHT,
                        minHeight: BOOK_MIN_HEIGHT,
                    }}
                >
                    <div className={Style.flipbookSkeleton}>
                        <div className={Style.flipbookSkeletonPage} />
                        <div className={Style.flipbookSkeletonSpine} />
                        <div className={Style.flipbookSkeletonPage} />
                        <div className={Style.flipbookSkeletonShimmer} />
                    </div>
                </div>
                <div className={Style.flipbookSkeletonCaption}>Loading PDF pages...</div>
                <div className={Style.flipbookControlsSkeleton}>
                    <div className={Style.flipbookControlsSkeletonRow} />
                    <div className={Style.flipbookControlsSkeletonRowSmall} />
                </div>
            </div>
        );
    }

    if (pdfError) {
        return <div className={Style.flipbookWrapper}>{pdfError}</div>;
    }

    const totalPdfPages = pdfPages.length;
    const frontCoverImage = totalPdfPages > 0 ? pdfPages[0] : null;
    const endCoverImage = totalPdfPages > 1 ? pdfPages[totalPdfPages - 1] : null;
    const middlePages = totalPdfPages > 2 ? pdfPages.slice(1, totalPdfPages - 1) : [];

    return (
        <div className={Style.flipbookWrapper}>
            <div
                className={Style.flipbookStage}
                style={{
                    width: '100%',
                    maxWidth: BOOK_STAGE_MAX_WIDTH,
                    minWidth: BOOK_MIN_WIDTH,
                    height: BOOK_MAX_HEIGHT,
                    minHeight: BOOK_MIN_HEIGHT,
                }}
            >
                <HTMLFlipBook
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    width={BOOK_WIDTH}
                    height={BOOK_HEIGHT}
                    size="stretch"
                    minWidth={BOOK_MIN_WIDTH}
                    maxWidth={BOOK_MAX_WIDTH}
                    minHeight={BOOK_MIN_HEIGHT}
                    maxHeight={BOOK_MAX_HEIGHT}
                    startPage={0}
                    drawShadow={false}
                    flippingTime={1000}
                    usePortrait
                    startZIndex={0}
                    autoSize={false}
                    maxShadowOpacity={0}
                    mobileScrollSupport
                    clickEventForward
                    useMouseEvents
                    swipeDistance={30}
                    showPageCorners
                    disableFlipByClick={false}
                    showCover
                    onFlip={onPage}
                    onInit={syncTotalPages}
                    onChangeOrientation={onChangeOrientation}
                    onChangeState={onChangeState}
                    className={Style.flipBook}
                    ref={(el) => {
                        flipBookRef.current = el as unknown as FlipBookHandle | null;
                    }}
                >
                    <PageCover imageSrc={frontCoverImage ?? undefined} alt="PDF first page cover">
                        BOOK TITLE
                    </PageCover>
                    {middlePages.map((imageSrc, index) => (
                        <Page key={`pdf-page-${index + 2}`} number={index + 2} imageSrc={imageSrc ?? undefined}>
                            {imageSrc ? `DemoMagazine.pdf page ${index + 2}` : `Loading page ${index + 2}...`}
                        </Page>
                    ))}
                    <PageCover imageSrc={endCoverImage ?? undefined} alt="PDF last page end cover">
                        THE END
                    </PageCover>
                </HTMLFlipBook>
            </div>

            <div className="book-controls">
                <div className="book-actions">
                    <button type="button" onClick={prevButtonClick}>
                        Previous page
                    </button>

                    <span>
                        [<strong>{bookState.page + 1} - {bookState.page + 2}</strong> of <strong>{bookState.totalPage}</strong>]
                    </span>

                    <button type="button" onClick={nextButtonClick}>
                        Next page
                    </button>
                </div>

                <div className="book-status">
                    State: <i>{bookState.state}</i>, orientation: <i>{bookState.orientation}</i>
                </div>
                {isLoadingMorePages ? <div className="book-status">Loading more PDF pages...</div> : null}
            </div>
        </div>
    );
};

export default Flipbook;
