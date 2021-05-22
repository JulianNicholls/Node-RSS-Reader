import { useRef, useEffect } from 'react';

import ChannelHeader from './ChannelHeader';
import Item from './Item';

interface ChannelProps {
  channel: FeedChannel;
  reload: () => void;
}

const Channel = ({ channel, reload }: ChannelProps) => {
  const reloadRef = useRef<NodeJS.Timeout | null>(null);

  const { ttl, item, entry } = channel;

  let items = item ? [...item] : [...entry];

  items.sort((a, b) => {
    if (a.pubDate && b.pubDate) {
      const left = new Date(a.pubDate).getTime();
      const right = new Date(b.pubDate).getTime();

      return right - left;
    }

    return 1;
  });

  useEffect(() => {
    if (ttl) reloadRef.current = setTimeout(reload, ttl * 60 * 1000);

    return () => {
      if (reloadRef.current) clearTimeout(reloadRef.current);
    };
  }, [reload, ttl]);

  return (
    <>
      <ChannelHeader channel={channel} reload={reload} />

      <div className="container">
        {items.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    </>
  );
};

export default Channel;
