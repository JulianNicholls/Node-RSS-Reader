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

    const response = await axios.get(`${PROXY_URL}${BBC_RSS_URL}`);

    if (response.status === 200) {
      setRSSChannel(response.data.channel);
      setLoading(false);
    } else {
      console.error(response.data.error);
      setError(response.data.error.message);
    }
  };

  useEffect(() => {
    loadRSS();
  }, []);

  const reload = () => loadRSS();

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="App">
      <Channel channel={rssChannel} reload={reload} />
      <footer>RSS Reader</footer>
    </div>
  );
}

export default App;
