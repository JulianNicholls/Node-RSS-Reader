import React from 'react';

interface ItemProps {
  item: FeedItem;
}

const Item = ({ item }: ItemProps) => {
  const { title, description, link, pubDate } = item;
  let dateStr = '';

  if (pubDate) {
    const dateDate = new Date(pubDate);

    dateStr = dateDate.toLocaleDateString() + ' ' + dateDate.toLocaleTimeString();
  }

  return (
    <div className="feed-item">
      <header>
        <h2>{title}</h2>
        {dateStr && <span>{dateStr}</span>}
      </header>
      <div className="feed-body">
        <span>{description}</span>

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Story
          </a>
        )}
      </div>
    </div>
  );
};

export default Item;
