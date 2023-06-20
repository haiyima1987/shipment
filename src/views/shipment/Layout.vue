<template>
  <div>
    <Header :logo-route-name="ROUTE_NAMES_SHIPMENT.SHIPMENT_OVERVIEW"/>
    <div class="page-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/partials/Header';
import {ROUTE_NAMES_SHIPMENT} from '@/router/modules/shipment';

export default {
  name: 'Layout',
  components: {
    Header
  },
  data: () => ({
    ROUTE_NAMES_SHIPMENT
  })
}
</script>

<style lang="scss">
</style>
