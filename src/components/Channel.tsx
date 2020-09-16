import React, { useRef, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

import Item from './Item';
import SelectFeed from './SelectFeed';
import humanTime from '../humantime';

interface HeaderProps {
  channel: FeedChannel;
  reload: () => void;
}

const ChannelHeader = ({ channel, reload }: HeaderProps) => {
  const {
    image,
    title,
    description,
    copyright,
    lastBuildDate,
    pubDate,
    updated,
    item,
    entry,
  } = channel;

  const items = item ? item.length : entry.length;
  let dateStr: string | null = null;

  if (lastBuildDate) dateStr = lastBuildDate;
  else if (pubDate) dateStr = pubDate;
  else if (updated) dateStr = updated;

  if (dateStr) {
    const dateDate = new Date(dateStr);

    dateStr = humanTime(dateDate).toLowerCase();
  }

  // Convert textual links to <a>s
  const linkify = (text: string) => {
    // If there are already links embedded, then return unchanged
    if (/<a/.test(text)) return text;

    return text.replace(
      /(https?:\/\/\S+)/g,
      '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>'
    );
  };

  // Create data for 'dangerouslySetHtml'
  const makeHtml = (text: string) => ({ __html: text });

  return (
    <div className="channel-header">
      <div className="channel-img">
        {image && <img src={image.url} alt={image.title} />}
      </div>

      <div className="channel-info">
        <h2>{title}</h2>
        {description !== title && <p>{description}</p>}
        {copyright && (
          <p
            className="copyright"
            dangerouslySetInnerHTML={makeHtml(linkify(copyright))}
          />
        )}
        {dateStr && <p>Last updated {dateStr}</p>}

        <SelectFeed />
      </div>

      <div className="channel-info2">
        <span>{items} stories</span>
        <FiRefreshCw className="big-icon" onClick={reload} />
      </div>
    </div>
  );
};

interface ChannelProps {
  channel: FeedChannel;
  reload: () => void;
}

const Channel = ({ channel, reload }: ChannelProps) => {
  const reloadRef = useRef<NodeJS.Timeout | null>(null);

  const { ttl, item, entry } = channel;

  let items = item ? [...item] : [...entry];

  items.sort((a, b) => {
    if (a.pubDate && b.pubDate) {
      const left = new Date(a.pubDate).valueOf();
      const right = new Date(b.pubDate).valueOf();

      return right - left;
    }

    return 1;
  });

  useEffect(() => {
    if (ttl) reloadRef.current = setTimeout(reload, ttl * 60 * 1000);

    return () => {
      if (reloadRef.current) clearTimeout(reloadRef.current);
    };
  }, [reload, ttl]);

  return (
    <>
      <ChannelHeader channel={channel} reload={reload} />

      <div className="container">
        {items.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    </>
  );
};

export default Channel;
