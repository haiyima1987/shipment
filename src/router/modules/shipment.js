const Layout = () => import('@/views/shipment/Layout.vue');
const Overview = () => import('@/views/shipment/Overview.vue');
const Create = () => import('@/views/shipment/Create.vue');

/**
 * Enum for the 'home'-module route names.
 * @enum
 */
export const ROUTE_NAMES_SHIPMENT = Object.freeze({
  SHIPMENT: 'SHIPMENT',
  SHIPMENT_OVERVIEW: 'SHIPMENT_OVERVIEW',
  SHIPMENT_CREATE: 'SHIPMENT_CREATE'
});

export const shipment = {
  path: '',
  meta: {},
  component: Layout,
  children: [
    {
      path: '',
      name: ROUTE_NAMES_SHIPMENT.SHIPMENT_OVERVIEW,
      component: Overview
    },
    {
      path: 'create',
      name: ROUTE_NAMES_SHIPMENT.SHIPMENT_CREATE,
      component: Create
    }
  ]
}
