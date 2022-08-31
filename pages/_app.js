import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import Config from "../components/Config";
import HeaderMenu from "../components/HeaderMenu";
import MenuLink from "../components/MenuLink";
import Hero from '../components/Hero';
 
const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  config: Config,
  hero: Hero,
  "header_menu": HeaderMenu,
  "menu_link": MenuLink
};
 
storyblokInit({
  accessToken: process.env.PREVIEW_TOKEN,
  use: [apiPlugin],
  components
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp