import React, { useState, useEffect, useCallback } from 'react';
import ShortenForm from './components/ShortenForm';
import ResultCard from './components/ResultCard';
import UrlList from './components/UrlList';
import { shortenUrl, getUrls, deleteUrl } from './api/urls';

/**
 * Owns all state for the app: the link history, the "just shortened" result,
 * and loading/error flags. ShortenForm, ResultCard, and UrlList are all
 * presentational and only talk to this component through props.
 */
const App = () => {
  const [links, setLinks] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState(null);
  const [deletingCode, setDeletingCode] = useState(null);
  const [latestResult, setLatestResult] = useState(null);

  const fetchUrls = useCallback(async () => {
    try {
      const { data } = await getUrls();
      setLinks(data.urls ?? []);
      // console.log(data.urls)
      setListError(null);
    } catch {
      setListError('Could not load your links. Please refresh the page.');
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  // Initial load.
  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  // "Refreshes when you come back to the tab" - refetch on regained focus.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchUrls();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchUrls]);

  const handleShorten = useCallback(async (longUrl) => {
    const { data } = await shortenUrl(longUrl);
    const newLink = {
      shortUrl: data.shortUrl,
      shortCode: data.shortCode,
      longUrl,
      clicks: 0,
      createdAt: new Date().toISOString(),
    };

    setLatestResult(newLink);
    setLinks((prev) => [newLink, ...prev]);
  }, []);

  const handleDelete = useCallback(async (shortCode) => {
    setListError(null);
    setDeletingCode(shortCode);
    try {
      await deleteUrl(shortCode);
      setLinks((prev) => prev.filter((link) => link.shortCode !== shortCode));
      setLatestResult((prev) => (prev?.shortCode === shortCode ? null : prev));
    } catch {
      setListError('Could not delete that link. Please try again.');
    } finally {
      setDeletingCode(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">Shorten your links</h1>
        <p className="text-slate-400 mt-2 text-sm">
          Paste a long URL, get a short one, and keep track of every click.
        </p>
      </div>

      <ShortenForm onShorten={handleShorten} />
      {latestResult && <ResultCard shortUrl={latestResult.shortUrl} shortCode={latestResult.shortCode} />}

      <UrlList
        links={links}
        isLoading={isLoadingList}
        error={listError}
        deletingCode={deletingCode}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;