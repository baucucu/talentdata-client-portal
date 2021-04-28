import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, CandidatesPage, ProfilePage } from './pages';

const routes = [
  {
    path: '/candidates',
    component: CandidatesPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
