import { useEffect, useState, useRef, useCallback } from "react";
import { throttle, debounce } from "lodash";
import { useAppDispatch } from "../data/hooks";

type FetchFunction<T> = (url: string) => Promise<T> | void;

export const useInfiniteScroll = (fetchData, isLoading) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const observerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
console.log("currentPage :", currentPage)

    const debouncedFetchDataPage = useCallback(debounce(
        (url: string) => dispatch(fetchData(url)), 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fetchData]
    );

    const handleObserver = useCallback(throttle((entries: IntersectionObserverEntry[]) => {
        return entries.forEach((entry) => {
            console.log("entry.isIntersecting :", entry.isIntersecting)
            console.log("isLoading :", isLoading)
            // debugger
            if (entry.isIntersecting && (isLoading && isLoading !== 'loading')) {
                setCurrentPage((prev) => prev + 1);
                /*const scrollTop = window.innerHeight / 2
                console.log("window ", window)
                window.scrollTo({
                    top: scrollTop,
                    left: 0,
                    behavior: 'smooth'
                });*/
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 2000), [isLoading]);


    useEffect(() => {
        const iobserver = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });
        //debugger
        const endOfList = document.querySelector(`#end-of-movies-list-${currentPage}`);
        const prevEndOfList = document.querySelector(`#end-of-movies-list-${currentPage - 1}`);
        const observerCurrent = observerRef.current;

        if (observerCurrent && endOfList) {
            iobserver.observe(endOfList);
        }

        if (prevEndOfList) {
            prevEndOfList.scrollIntoView({ behavior: "smooth" });
        }

        return () => {
            // debugger
            if (observerCurrent) {
                iobserver.unobserve(observerCurrent);
            }
        };
    }, [handleObserver]);

    return [debouncedFetchDataPage, currentPage, observerRef];
};
