<template>
  <div :class="{'is-shown': isShown}"
       class="error-alert-wrapper"
       @click="closeErrorAlert">
    <div class="error-alert-box">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ErrorAlert',
  data: () => ({
    isShown: false
  }),
  computed: {
    ...mapGetters({
      errorText: 'getErrorText'
    })
  },
  watch: {
    errorText: function (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.showErrorAlert();
      }
    }
  },
  methods: {
    showErrorAlert() {
      this.isShown = true;
    },
    closeErrorAlert() {
      this.isShown = false;
      setTimeout(() => {
        this.$store.commit('removeErrorText');
      }, 200);
    }
  }
}
</script>
