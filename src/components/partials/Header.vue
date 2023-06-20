<template>
  <div class="header-wrapper">
    <div class="header-box">
      <div class="image-box">
        <router-link
            :to="{ name: ROUTE_NAMES_SHIPMENT.SHIPMENT_OVERVIEW}"
            class="link-logo">
          <img class="image-logo" src="../../assets/img/shipment-logo.png" alt="logo">
        </router-link>
      </div>
      <div class="text-box">
        Welcome to check your shipment overview here
      </div>
      <div v-if="$route.name !== ROUTE_NAMES_SHIPMENT.SHIPMENT_CREATE" class="button-create-wrapper">
        <router-link
            :to="{ name: ROUTE_NAMES_SHIPMENT.SHIPMENT_CREATE }"
            class="button-main-gradient button-create">
          <font-awesome-icon icon="plus" class="fa-plus icon-create"/>
          <span class="text-button-create">CREATE</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {ROUTE_NAMES_SHIPMENT} from '@/router/modules/shipment';

export default {
  name: 'Header',
  data: () => ({
    ROUTE_NAMES_SHIPMENT
  })
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/_base.mixins.scss";

.header-box {
  padding: rem(10) rem(20);
  height: rem(80);
  background-color: white;
  @include flex-center-vertical();
  @include box-shadow(rem(3), rem(3), rem(20), var(--grey-pale-d));

  @media screen and (min-width: $screen-md) {
    height: rem(100);
  }

  @media screen and (min-width: $screen-lg) {
    padding: rem(10) rem(50);
  }
}

.image-box {
  height: 100%;

  .link-logo {
    height: 100%;
    box-shadow: none;
  }

  .image-logo {
    height: 100%;
  }
}

.text-box {
  margin-left: rem(20);
  font-size: rem(18);
  font-weight: bold;
  flex-grow: 1;

  @media screen and (min-width: $screen-lg) {
    margin-left: rem(50);
    font-size: rem(28);
  }
}

.button-create-wrapper {
  @include position-elevation(fixed, $right: rem(20), $bottom: rem(20), $elevation: 20000);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (min-width: $screen-md) {
    height: rem(100);
    position: static;
  }

  @media screen and (min-width: $screen-lg) {
    padding: rem(10) rem(20);
    @include flex-center();
  }

  @media screen and (min-width: $screen-xl) {
    padding: rem(10) rem(50);
  }

  .button-create {
    padding: rem(2) rem(18);
    height: rem(46);
    @include flex-center();
    color: white;
    font-size: rem(18);
    font-weight: bold;
  }

  .text-button-create {
    display: none;

    @media screen and (min-width: $screen-md) {
      display: inline;
    }
  }

  .icon-create {
    @media screen and (min-width: $screen-md) {
      margin: 0 rem(8) 0 0;
      @include position(relative, $bottom: rem(1));
    }
  }
}
</style>
