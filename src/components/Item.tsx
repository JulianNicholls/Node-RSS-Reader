import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';

import humanTime from '../humantime';

interface ItemProps {
  item: FeedItem;
}

const Item = ({ item }: ItemProps) => {
  const { title, description, content, link, pubDate } = item;
  const dcdate = item['dc:date'];
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const setNewDateStr = () => {
      let dateDate: Date | null = null;

      if (pubDate) dateDate = new Date(pubDate);
      else if (dcdate) dateDate = new Date(dcdate);

      if (dateDate) setDateStr(humanTime(dateDate));
    };

    setNewDateStr();

    const id = setInterval(setNewDateStr, 80000 + Math.random() * 20000);

    return () => {
      clearInterval(id);
    };
  }, [pubDate, dcdate]);

  return (
    <Card bg="info" text="white" className="p-2 mb-1">
      <Card.Title className="d-flex justify-content-between">
        <a
          className="item-link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5 className="mb-0">{title}</h5>
        </a>
        {dateStr && <div className="stamp text-right">{dateStr}</div>}
      </Card.Title>
      <Card.Text className="d-flex justify-content-between">
        {description && <span className="d-inline-block mr-5">{description}</span>}
        {content && (
          <span className="d-inline-block mr-5">{content['#text']}</span>
        )}

        {link && (
          <a
            className="item-link d-inline-block ml-5"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Story
          </a>
        )}
      </Card.Text>
    </Card>
  );
};

export default Item;
