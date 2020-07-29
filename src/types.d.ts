type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

type FeedImage = {
  url: string;
  title: string;
  link: string;
  width: number;
  height: number;
};

type FeedChannel = {
  title: string;
  description: string;
  link: string;
  copyright: string | null;
  pubDate: string | null;
  lastBuildDate: string | null;
  ttl: number | null;
  image: FeedImage | null;
  item: FeedItem[];
};
