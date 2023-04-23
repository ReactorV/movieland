import { useEffect, useState, useRef, useCallback } from "react";
import { throttle, debounce } from "lodash";

type FetchFunction<T> = (url: string) => Promise<T> | void;

export const useInfiniteScroll = (fetchData: FetchFunction<string>) => {
    const [data, setData] = useState<[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver>();

    const fetchDataPage = useCallback(async (url: string) => {
        try {
            setIsLoading(true);
            const newData = await fetchData(url);
            setData((prevData) => [...prevData, newData]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchData]);

    const debouncedFetchDataPage = useCallback(
        debounce(fetchDataPage, 500),
        [fetchDataPage]
    );

    const handleObserver = useCallback(
        throttle((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading) {
                    setCurrentPage((prev) => prev + 1);
                }
            });
        }, 500),
        [isLoading]
    );

    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });

        return () => {
            if (observer.current) {
                observer.current?.disconnect()
            }
        };
    }, [handleObserver]);

    /*useEffect(() => {
        debouncedFetchDataPage(currentPage);
    }, [currentPage, debouncedFetchDataPage]);*/

    useEffect(() => {
        const currentObserver = observer.current;
        if (currentObserver) {
            currentObserver.disconnect();
        }
        setCurrentPage(1);
        setData([]);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (observer.current) {
            observer.current?.observe(document.querySelector("#end-of-list")!);
        }
        return () => {
            if (observer.current) {
                observer.current?.disconnect();
            }
        };
    }, []);

    return [data, isLoading, debouncedFetchDataPage, currentPage];
};
