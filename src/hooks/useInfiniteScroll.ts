import { useEffect, useState, useRef, useCallback, RefObject } from 'react'
import { throttle, debounce } from 'lodash'
import { useAppDispatch } from '../data/hooks'

export const useInfiniteScroll = (
  fetchData,
  isLoading
): [(url: string) => () => void, number, RefObject<HTMLDivElement>] => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const observerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchDataPage = useCallback(
    debounce((url: string) => dispatch(fetchData(url)), 1000),
    [fetchData]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleObserver = useCallback(
    throttle((entries: IntersectionObserverEntry[]) => {
      const firstElement = entries[0]

      if (firstElement.isIntersecting && isLoading && isLoading !== 'loading') {
        setCurrentPage((prev) => prev + 1)
        dispatch(fetchData.pending())
      }
    }, 500),
    [isLoading]
  )

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    const lastElementRef = observerRef.current

    if (lastElementRef) {
      intersectionObserver.observe(lastElementRef)
    }

    return () => {
      if (lastElementRef) {
        intersectionObserver.unobserve(lastElementRef)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleObserver])

  return [debouncedFetchDataPage, currentPage, observerRef]
}
