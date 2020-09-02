import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

type FeedState = {
  feeds: FeedDocument[];
  currentFeed: string;
  setCurrentFeed: (s: string) => void;
};

const FeedsContext = React.createContext<FeedState>({} as FeedState);

export const FeedsProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  const [feeds, setFeeds] = useState<FeedDocument[]>([]);
  const [currentFeed, setCurrentFeed] = useState<string>('');

  useEffect(() => {
    const loadFeeds = async () => {
      const response = await axios.get('/api/feeds');

      if (!response.data.error) {
        setFeeds(response.data.feeds);
        setCurrentFeed(response.data.feeds[0].url);
      }
    };

    loadFeeds();
  }, []);

  const state: FeedState = {
    feeds,
    currentFeed,
    setCurrentFeed,
  };

  return <FeedsContext.Provider value={state}>{children}</FeedsContext.Provider>;
};

export const useFeeds = (): FeedState => {
  const context = useContext(FeedsContext);

  if (context === undefined)
    throw new Error('useFeeds() must be used inside a FeedProvider block');

  return context;
};
