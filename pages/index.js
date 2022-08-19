import Head from "next/head";
import styles from "../styles/Home.module.css";
 
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
 
export default function Home({ story, preview }) {
  story = useStoryblokState(story, {}, preview);
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <header>
        <h1>{story ? story.name : "My Site"}</h1>
      </header>
 
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
 
export async function getServerSideProps(context) {
  // get the query object
  const insideStoryblok = context.query._storyblok;
  const shouldLoadDraft = context.preview || insideStoryblok;
 
  let slug = "home";
 
  let sbParams = {
    version: "published", // or 'draft'
  };
 
  if (shouldLoadDraft) {
    sbParams.version = "draft";
  }
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: shouldLoadDraft || false,
    },
  };
}