import express from 'express';
import axios, { AxiosError } from 'axios';
import parser from 'fast-xml-parser';

const fxpOptions = {
  attributeNamePrefix: '', // Don't prefix attributes
  ignoreAttributes: false, // Collect them
  ignoreNamespace: true, // Flatten namespaces
  allowBooleanAttributes: true, // I'm not sure there are any
  parseAttributeValue: true, // Parse out attribute values to Number etc
};

const router = express.Router();

router.get('/:site', async (req: express.Request, res: express.Response) => {
  const { site } = req.params;

  if (!site)
    return res
      .status(429)
      .json({ error: 'No site specified', feed: null, channel: null });

  try {
    const response = await axios.get(site);
    const jsonData = parser.parse(response.data.trim(), fxpOptions, true);

    // First check for /rss/channel
    if (jsonData.rss) {
      const {
        rss: { channel },
      } = jsonData;

      return res.json({ channel, feed: null, error: null });
    }

    // Then try /feed
    if (jsonData.feed) {
      const { feed } = jsonData;

      return res.json({ channel: null, feed, error: null });
    }

    // Finally, try to decode an RDF as a channel
    if (jsonData['rdf:RDF']) {
      const {
        'rdf:RDF': { channel, item },
      } = jsonData;

      // console.log({ jsonData, channel, items: item.length });

      channel.item = item;

      return res.json({ channel, feed: null, error: null });
    }

    res.status(200).json({ error: 'Format not recognised', raw: jsonData });
  } catch (err) {
    console.error(`Error: ${err.message}\n  URL:   ${err.config.url}\n  errno: ${err.errno}\n  code:  ${err.code}\n  syscall: ${err.syscall}`);
    res.status(503).json({ error: err, feed: null, channel: null });
  }
});

export default router;
