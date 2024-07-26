import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Example view component
import RegisterPage from '../views/RegisterPage.vue'; // Example view component
import DrawPage from '../views/DrawPage.vue'; // Example view component
import ResultsPage from '../views/ResultsPage.vue'; // Example view component

const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterPage },
  { path: '/draw', component: DrawPage },
  { path: '/results', component: ResultsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
