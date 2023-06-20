/** routes **/
import {shipment} from '@/router/modules/shipment'
import NotFound from '@/views/NotFound'
import Logout from '@/views/Logout';

export const ROUTE_NAMES_ROOT = Object.freeze({
  LOGOUT: 'Logout',
  NOT_FOUND: 'Not Found'
});

/** routes without layout **/
export const root = [
  {
    path: '/logout',
    name: ROUTE_NAMES_ROOT.LOGOUT,
    component: Logout
  },
  {
    // not found
    path: '/not-found',
    name: ROUTE_NAMES_ROOT.NOT_FOUND,
    component: NotFound
  }
]

export default root.concat([shipment]);
