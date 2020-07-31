import React from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import Item from './Item';

interface ChannelProps {
  channel: FeedChannel;
  reload: () => void;
}

const Channel = ({ channel, reload }: ChannelProps) => {
  const {
    image,
    title,
    description,
    copyright,
    lastBuildDate,
    pubDate,
    item: items,
  } = channel;

  let dateStr = lastBuildDate ? lastBuildDate : pubDate ? pubDate : null;

  if (dateStr) {
    const dateDate = new Date(dateStr);

    dateStr = dateDate.toLocaleDateString() + ' ' + dateDate.toLocaleTimeString();
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
          <span>Items: {items.length}</span>
          <FiRefreshCcw className="big-icon" onClick={reload} />
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
