import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Channel from './components/Channel';
import { useFeeds } from './context';

import './App.css';

const PROXY_URL = '/api/site/';
// const PROXY_URL = 'https://nearby-proxy.vercel.app/api/getRSSFeed?feed=';
// const LOCAL_PROXY_URL = 'http://localhost:3001/api/getRSSFeed?feed=';
// const BBC_URL = 'http://feeds.bbci.co.uk/news/rss.xml';
// const APPLE_URL = 'http://developer.apple.com/news/rss/news.rss';
// const FUN_URL = 'https://funwithforms.com/feed/feed.xml';

function App() {
  const { currentFeed } = useFeeds();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [rssChannel, setRSSChannel] = useState<FeedChannel>({} as FeedChannel);

  const loadRSS = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `${PROXY_URL}${encodeURIComponent(currentFeed)}`
      );
      const { data } = response;

      if (response.status === 200) {
        if (data.channel) setRSSChannel(data.channel);
        else if (data.feed) {
          console.log('Feed, not channel');
          setRSSChannel(data.feed);
        } else setError(`Unexpected feed or channel: ${data.error}`);
      } else {
        console.error(data);
        setError(data.error.message);
      }
    } catch (err: any) {
      console.error({ err });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentFeed]);

  useEffect(() => {
    // console.log({ feeds });

    if (currentFeed) loadRSS();
  }, [currentFeed, loadRSS]);

  const reload = () => loadRSS();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Channel channel={rssChannel} reload={reload} />
      <footer className="mt-2 p-2 bg-secondary text-white">RSS Reader</footer>
    </>
  );
}

export default App;
