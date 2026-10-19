import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getLocalizedPosts } from "@/utils/localizePost";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";

export const GET: APIRoute = async ({ url }) => {
  const locale = url.pathname.startsWith("/zh/") ? "zh" : "en";
  const posts = await getLocalizedPosts(locale);
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath, locale),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
};
