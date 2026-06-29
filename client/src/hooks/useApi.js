import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook.
 * @param {Function} fetcher async () => response  (should return the parsed payload)
 * @param {Array} deps dependency list that re-triggers the fetch
 */
export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      setData(result);
    } catch (err) {
      setError(err.friendlyMessage || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherRef.current();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err.friendlyMessage || err.message || 'Something went wrong');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: run };
}

export default useApi;
