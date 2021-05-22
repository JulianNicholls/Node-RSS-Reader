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
        <span>{itemCount} stories</span>
        <FiRefreshCw className="big-icon" onClick={reload} />
      </div>
    </div>
  );
};

export default ChannelHeader;
