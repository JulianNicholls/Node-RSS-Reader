type FeedItem = {
  title: string;
  link: string;
  description: string;
  // Optional from here
  author?: string;
  pubDate?: string;
};

type FeedImage = {
  url: string;
  title: string;
  link: string;
  // Optional from here
  width?: number;
  height?: number;
  description?: string;
};

type FeedChannel = {
  title: string;
  link: string;
  description: string;
  // Optional from here
  copyright?: string;
  pubDate?: string;
  lastBuildDate?: string;
  ttl?: number;
  image?: FeedImage;
  item: FeedItem[];
};
