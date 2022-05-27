/**
 * This is the main.ts file. Import global CSS and scripts here.
 * Learn more: gridsome.org/docs/client-api
 */

/**
 * Types imports
 */
import { ClientApiConstructor } from './types';

/**
 * Global css imports
 */
// import '@/assets/styles/global.css';
import '@/assets/styles/main.scss';
import 'prismjs/themes/prism.css';

/**
 * Layout imports
 */
import DefaultLayout from '~/layouts/Default.vue';

/**
 * script imports
 */
import InfiniteLoading from 'vue-infinite-loading';
import 'katex/dist/katex.min.css';
/**
 * Hooks
 */
import Component from 'vue-class-component';
Component.registerHooks([
  'metaInfo', // for vue-meta
]);

/**
 * Client API contructor
 */
const client: ClientApiConstructor = (Vue, { head }) => {
  Vue.component('Layout', DefaultLayout);

  Vue.use(InfiniteLoading);

  // Add an external CSS file
  if (head.link) {
    head.link.push({
      rel: 'stylesheet',
      href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css',
    });
  }
};

export default client;
