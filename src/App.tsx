import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './App.css';

const PROXY_URL = 'https://nearby-proxy.vercel.app/api/getRSSFeed?feed=';
const BBC_RSS_URL = 'http://feeds.bbci.co.uk/news/rss.xml';

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

type FeedImage = {
  url: string;
  title: string;
  link: string;
  width: number;
  height: number;
};

type Channel = {
  title: string;
  description: string;
  link: string;
  copyright: string | null;
  pubDate: string | null;
  lastBuildDate: string | null;
  ttl: number | null;
  image: FeedImage | null;
  item: FeedItem[];
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [rssChannel, setRSSChannel] = useState<Channel>({} as Channel);

  useEffect(() => {
    const loadRSS = async () => {
      const response = await axios.get(`${PROXY_URL}${BBC_RSS_URL}`);

      if (response.status === 200) {
        const { channel } = response.data;
        console.log({ channel: channel, items: channel.item });
        setRSSChannel(channel);
        setLoading(false);
      } else {
        console.error(response.data.error);
        setError(response.data.error.message);
      }
    };

    setLoading(true);
    setError('');
    loadRSS();
  }, []);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="App">
      <h1>RSS Reader</h1>

      <div className="header">
        {rssChannel.image && (
          // <span style={{ color: 'blue' }}>
          //   {rssChannel.image.url} / {rssChannel.image.title}
          // </span>
          <img src={rssChannel.image.url} alt={rssChannel.image.title} />
        )}
        <h2>{rssChannel.title}</h2>
        <p>{rssChannel.description}</p>
        <p>{rssChannel.lastBuildDate}</p>
        {/* <p>{rssChannel.item.length}</p> */}

        {rssChannel.item.map((item) => (
          <p key={item.title}>{item.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
