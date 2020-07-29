// import { HTMLElement } from 'node-html-parser';
// import { parse as parseHTML } from 'node-html-parser';
import parser from 'fast-xml-parser';

import axios from 'axios';

const BBC_RSS_URL = 'http://feeds.bbci.co.uk/news/rss.xml';

const fxpOptions = {
  attributeNamePrefix: '', // Don't prefix attributes
  ignoreAttributes: false, // Collect them
  ignoreNamespace: true, // Flatten namespaces
  allowBooleanAttributes: true, // I'm not sure there are any
  parseAttributeValue: true, // Parse out attribute values to Number etc
};

type FeedItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

const loadPage = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

const main = async () => {
  const page = await loadPage(BBC_RSS_URL);

  try {
    const jsonData = parser.parse(page, fxpOptions, true);

    const {
      rss: {
        channel: { title, description, lastBuildDate, item },
      },
    } = jsonData;

    console.log('Channel:    ', title);
    console.log('Description:', description);
    console.log('BuildDate:  ', lastBuildDate);
    console.log('Items:      ', item.length, '\n');

    item.forEach(({ title, description, link, pubDate }: FeedItem) => {
      console.log(title);
    });

    // console.log(JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
