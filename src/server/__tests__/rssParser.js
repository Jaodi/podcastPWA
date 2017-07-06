import { podcastRss } from '../mockData/podcastRss';
import { rssParser } from '../rssParser';

describe('rssParser', () => {
  it('parses rss to a particular shaped object', () => {
    return rssParser(podcastRss[1]).then(parsedRss => {
      const { feed } = parsedRss;
      expect(feed).toBeDefined();

      const { description, link: feedLink, title: feedTitle, entries } = feed;
      expect(description).toBeDefined();
      expect(feedLink).toBeDefined();
      expect(feedTitle).toBeDefined();
      expect(entries).toBeDefined();

      const { pubDate, title: entryTitle, link: entryLink, enclosure } = entries[0];
      expect(pubDate).toBeDefined();
      expect(entryTitle).toBeDefined();
      expect(entryLink).toBeDefined();
      expect(enclosure).toBeDefined();

      const { url, type } = enclosure;
      expect(url).toBeDefined();
      expect(type).toBeDefined();
    });
  })
})