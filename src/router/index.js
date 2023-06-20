import {createRouter, createWebHistory} from 'vue-router';
import modules, {ROUTE_NAMES_ROOT} from '@/router/modules';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: modules
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  /** User enters an invalid url **/
  if (to.matched.length === 0) {
    // decide to use login or not found depending on projects
    return next({name: ROUTE_NAMES_ROOT.NOT_FOUND});
  }
  for (const route of to.matched) {
    if (route.meta && route.meta.guard) {
      /** Let each guard handle route access **/
      const result = await route.meta.guard.handleRouteEnter();
      if (result !== true) {
        return next({name: result});
      }
    }
  }
  return next();
});

export default router;
