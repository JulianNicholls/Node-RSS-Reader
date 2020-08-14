import React, { useState, useEffect } from 'react';

import humanTime from '../humantime';

interface ItemProps {
  item: FeedItem;
}

const Item = ({ item }: ItemProps) => {
  const { title, description, content, link, pubDate } = item;
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const setNewDateStr = () => {
      if (pubDate) {
        const dateDate = new Date(pubDate);

        setDateStr(humanTime(dateDate));
      }
    };

    setNewDateStr();

    const id = setInterval(setNewDateStr, 80000 + Math.random() * 20000);

    return () => {
      clearInterval(id);
    };
  }, [pubDate]);

  return (
    <div className="feed-item">
      <header>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h2>{title}</h2>
        </a>
        {dateStr && <div className="stamp right">{dateStr}</div>}
      </header>
      <div className="feed-body">
        {description && <span>{description}</span>}
        {content && <span>{content['#text']}</span>}

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
