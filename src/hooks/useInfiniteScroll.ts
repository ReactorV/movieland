import { useEffect, useState, useRef, useCallback } from "react";
import { throttle, debounce } from "lodash";
import { useAppDispatch } from "../data/hooks";

type FetchFunction<T> = (url: string) => Promise<T> | void;

export const useInfiniteScroll = (fetchData, isLoading) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const observer = useRef<IntersectionObserver>();
    const dispatch = useAppDispatch()
console.log("currentPage :", currentPage)
    const debouncedFetchDataPage = useCallback(
        (url: string) => dispatch(fetchData(url)),
        [fetchData]
    );
    console.log("fetchData :", fetchData.pending)

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        return entries.forEach((entry) => {
            console.log("entry.isIntersecting :", entry.isIntersecting)
            console.log("fetchData.fetchStatus :",fetchData.fetchStatus)
            if (entry.isIntersecting && (isLoading && isLoading !== 'loading')) {
                setCurrentPage((prev) => prev + 1);
            }
        });
    }, [fetchData?.fetchStatus]);


    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });

        const endOfList = document.querySelector("#end-of-movies-list");

        if (observer.current && endOfList) {
            observer.current.observe(endOfList);
        }

        return () => {
            if (observer.current) {
                observer.current?.disconnect()
            }
        };
    }, [handleObserver]);

    return [debouncedFetchDataPage, currentPage, observer];
};
