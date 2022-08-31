import Head from "next/head";
 
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/Layout";
 
export default function Home({ story }) {
  story = useStoryblokState(story, {
    resolveRelations: ["popular-articles.articles"],
});
 
  return (
    <div>
      <Head>
        <title>Digics | Web and marketing agency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header>
        <h1>{story ? story.name : "My Site"}</h1>
      </header> */}
      <Layout>
      <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}
 
export async function getServerSideProps(context) {
  // get the query object
  const insideStoryblok = context.query._storyblok;
  const shouldLoadDraft = context.preview || insideStoryblok;
 
  let slug = "home";
 
  let sbParams = {
    version: "draft", // or 'published',
    resolve_relations: ["popular-articles.articles"],
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