import React from 'react';

interface ItemProps {
  item: FeedItem;
}

const Item = ({ item }: ItemProps) => {
  const { title, description, link, pubDate } = item;
  let dateStr = '';

  if (pubDate) {
    const dateDate = new Date(pubDate);

    dateStr =
      dateDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      }) +
      ' ' +
      dateDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  return (
    <div className="feed-item">
      <header>
        <h2>{title}</h2>
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
