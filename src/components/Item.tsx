import React from 'react';

import humanTime from '../humantime';

interface ItemProps {
  item: FeedItem;
}

const Item = ({ item }: ItemProps) => {
  const { title, description, link, pubDate } = item;
  let dateStr = '';

  if (pubDate) {
    const dateDate = new Date(pubDate);

    dateStr = humanTime(dateDate);
  }

  return (
    <div className="feed-item">
      <header>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h2>{title}</h2>
        </a>
        {dateStr && <div className="stamp right">{dateStr}</div>}
      </header>
      <div className="feed-body">
        <span>{description}</span>

        {link && (
          <div className="right">
            <a href={link} target="_blank" rel="noopener noreferrer">
              Story
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
