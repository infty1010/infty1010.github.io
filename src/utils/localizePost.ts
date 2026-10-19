import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;
export const postLanguage = (lang?: string) =>
  lang?.startsWith("zh") ? "zh" : "en";

export async function getPostTranslation(post: Post, locale: string) {
  const translations = await getCollection("translations");
  return translations.find(entry => entry.id === `${locale}/${post.id}`);
}

export async function localizePost(post: Post, locale: string): Promise<Post> {
  const translation = await getPostTranslation(post, locale);
  return translation
    ? {
        ...post,
        data: {
          ...post.data,
          ...translation.data,
          lang: locale === "zh" ? "zh-CN" : "en",
        },
      }
    : post;
}

export async function getLocalizedPosts(locale: string) {
  const posts = await getCollection("posts");
  return Promise.all(posts.map(post => localizePost(post, locale)));
}
