<template>
  <div>
    <router-view />
    <LoadingIcon />
    <ErrorAlert />
  </div>
</template>

<script>
import LoadingIcon from '@/components/generic/LoadingIcon';
import ErrorAlert from '@/components/generic/ErrorAlert';

export default {
  name: 'App',
  components: {
    LoadingIcon,
    ErrorAlert
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/_layout.shared.scss";
</style>
