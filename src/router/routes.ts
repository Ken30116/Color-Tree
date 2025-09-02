import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import HomePage from 'pages/HomePage.vue';
import DetailPage from 'pages/DetailPage.vue';
import AnalyzePage from 'pages/AnalyzePage.vue';
import SimulationPage from 'pages/SimulationPage.vue';
import AboutPage from 'pages/AboutPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage,
      },
      {
        path: 'color',
        component: DetailPage,
        children: [
          {
            path: ':id',
            name: 'DetailPage',
            component: DetailPage,
          },
        ],
      },
      {
        path: 'analyze',
        name: 'AnalyzePage',
        component: AnalyzePage,
      },
      {
        path: 'simulation',
        name: 'SimulationPage',
        component: SimulationPage,
      },
      {
        path: 'about',
        name: 'AboutPage',
        component: AboutPage,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
