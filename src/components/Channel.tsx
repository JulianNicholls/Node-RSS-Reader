import React, { useRef, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

import Item from './Item';

interface ChannelProps {
  channel: FeedChannel;
  reload: () => void;
}

const Channel = ({ channel, reload }: ChannelProps) => {
  const reloadRef = useRef<NodeJS.Timeout | null>(null);

  const {
    image,
    title,
    description,
    copyright,
    lastBuildDate,
    pubDate,
    ttl,
    item: items,
  } = channel;

  let dateStr = lastBuildDate ? lastBuildDate : pubDate ? pubDate : null;

  useEffect(() => {
    if (ttl) reloadRef.current = setTimeout(reload, ttl * 60 * 1000);

    return () => {
      if (reloadRef.current) clearTimeout(reloadRef.current);
    };
  }, [reload, ttl]);

  if (dateStr) {
    const dateDate = new Date(dateStr);

    dateStr =
      dateDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      }) +
      ' ' +
      dateDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
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
    <>
      <div className="channel-header">
        <div className="channel-img">
          {image && <img src={image.url} alt={image.title} />}
        </div>

        <div className="channel-info">
          <h2>{title}</h2>
          {description !== title && <p>{description}</p>}
          {copyright && (
            <p dangerouslySetInnerHTML={makeHtml(linkify(copyright))} />
          )}
          {dateStr && <p>Last updated {dateStr}</p>}
        </div>

        <div className="channel-info2">
          <span>{items.length} stories</span>
          <FiRefreshCw className="big-icon" onClick={reload} />
        </div>
      </div>

      <div className="container">
        {items.map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </div>
    </>
  );
};

export default Channel;
