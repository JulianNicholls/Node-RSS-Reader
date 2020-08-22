import React from 'react';

import { useFeeds } from '../context';

const SelectFeed = () => {
  const { feeds } = useFeeds();

  return (
    <select className="select-css" id="feed-select">
      {feeds.map((feed) => (
        <option key={feed._id} value={feed.url}>
          {feed.name}
        </option>
      ))}

      <option value="edit">Edit...</option>
    </select>
  );
};

export default SelectFeed;
