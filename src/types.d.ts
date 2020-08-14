type Atom2Item = {
  title: string;
  link: string;
  description: string;
  // Optional from here
  author?: string;
  pubDate?: string;
  image?: FeedImage;
};

type AtomItem = {
  title: string;
  subtitle: string;
  link: string;
  content: { '#text': string };
  // Optional from here
  updated?: string;
  image?: FeedImage;
};

type FeedItem = AtomItem & Atom2Item;

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
  item: FeedItem[]; // Hopefully this...
  entry: FeedItem[]; // ...or this
  // Optional from here
  subtitle?: string;
  copyright?: string;
  pubDate?: string;
  lastBuildDate?: string;
  updated?: string;
  ttl?: number;
  image?: FeedImage;
};
