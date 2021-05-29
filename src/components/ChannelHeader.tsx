import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiRefreshCw } from 'react-icons/fi';

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

  const itemCount = item ? item.length : entry.length;
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
      '<a class="header-link" href="$&" target="_blank" rel="noopener noreferrer">$&</a>'
    );
  };

  // Create data for 'dangerouslySetHtml'
  const makeHtml = (text: string) => ({ __html: text });

  return (
    <Row className="bg-secondary text-white pb-2 mb-3">
      <Col sm={2} className="border-right mt-3">
        {image && <img className="ml-3" src={image.url} alt={image.title} />}
      </Col>
      <Col sm={6}>
        <h2>{title}</h2>
        {description !== title && <p>{description}</p>}
        {copyright && <p dangerouslySetInnerHTML={makeHtml(linkify(copyright))} />}
        {dateStr && <p>Last updated {dateStr}</p>}
      </Col>
      <Col sm={2} className="d-flex">
        <SelectFeed />
      </Col>
      <Col
        sm={2}
        className="d-flex flex-column justify-space-between pl-3 border-left"
      >
        <span>{itemCount} stories</span>
        <FiRefreshCw className="display-4" onClick={reload} />
      </Col>
    </Row>
  );
};

export default ChannelHeader;
