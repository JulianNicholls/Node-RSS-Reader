import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Channel from './components/Channel';

import './App.css';

const PROXY_URL = 'https://nearby-proxy.vercel.app/api/getRSSFeed?feed=';
const BBC_RSS_URL = 'http://feeds.bbci.co.uk/news/rss.xml';
// const APPLE_URL = 'http://developer.apple.com/news/rss/news.rss';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [rssChannel, setRSSChannel] = useState<FeedChannel>({} as FeedChannel);

  const loadRSS = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${PROXY_URL}${BBC_RSS_URL}`);
      const { data } = response;

      if (response.status === 200) {
        setRSSChannel(data.channel);
      } else {
        console.error(data.error);
        setError(data.error.message);
      }
    } catch (err) {
      console.error({ err });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRSS();
  }, []);

  const reload = () => loadRSS();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <Channel channel={rssChannel} reload={reload} />
      <footer>RSS Reader</footer>
    </div>
  );
}

export default App;
