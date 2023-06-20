<template>
  <div v-if="isLoading"
       class="icon-loading-wrapper">
    <div class="spinner">
      <font-awesome-icon icon="spinner" class="fa-spin fa-spinner"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'LoadingIcon',
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>

<style scoped>
</style>
