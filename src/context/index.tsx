import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

type FeedState = {
  feeds: FeedDocument[];
};

const FeedsContext = React.createContext<FeedState>({ feeds: [] });

export const FeedsProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  const [feeds, setFeeds] = useState<FeedDocument[]>([]);

  useEffect(() => {
    const loadFeeds = async () => {
      const response = await axios.get('/api/feeds');

      if (!response.data.error) setFeeds(response.data.feeds);
    };

    loadFeeds();
  }, []);

  const state: FeedState = {
    feeds,
  };

  return <FeedsContext.Provider value={state}>{children}</FeedsContext.Provider>;
};

export const useFeeds = (): FeedState => {
  const context = useContext(FeedsContext);

  if (context === undefined)
    throw new Error('useFeeds() must be used inside a FeedProvider block');

  return context;
};
