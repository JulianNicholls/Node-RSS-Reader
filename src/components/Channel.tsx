import React from 'react';

import Item from './Item';

interface ChannelProps {
  channel: FeedChannel;
}

const Channel = ({ channel }: ChannelProps) => {
  const {
    image,
    title,
    description,
    lastBuildDate,
    pubDate,
    item: items,
  } = channel;

  let dateStr = lastBuildDate ? lastBuildDate : pubDate ? pubDate : null;

  if (dateStr) {
    const dateDate = new Date(dateStr);

    dateStr = dateDate.toLocaleDateString() + ' ' + dateDate.toLocaleTimeString();
  }

  return (
    <>
      <div className="channel-header">
        <div className="channel-img">
          {image && <img src={image.url} alt={image.title} />}
        </div>

        <div className="channel-info">
          <h2>{title}</h2>
          {description !== title && <p>{description}</p>}
          {dateStr && <p>Last updated {dateStr}</p>}
        </div>

        <div className="channel-info2">Items: {items.length}</div>
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
