<template>
  <div class="validator-form-wrapper">
    <FormValidator
      ref="form"
      v-slot="props"
      :name="name"
      :mode="mode"
      :error-mode="errorMode"
      :valid="valid">
      <form novalidate
            @submit.prevent="props.handleSubmit(onFormValid)">
        <slot name="content" />
        <slot name="submit"
              :is-pristine="props.isPristine"
              :is-dirty="props.isDirty"
              :is-touched="props.isTouched"
              :is-untouched="props.isUntouched"
              :is-valid="props.isValid"
              :is-invalid="props.isInvalid" />
      </form>
    </FormValidator>
  </div>
</template>

<script>
export default {
  name: 'FormWrapper',
  props: {
    onFormValid: {
      required: true
    },
    name: {
      default: 'validationForm'
    },
    mode: {
      default: 1
    },
    errorMode: {
      default: 1
    },
    valid: {
      required: false
    }
  },
  methods: {
    reset: function () {
      this.$refs.form.reset();
    }
  }
}
</script>

<style>
</style>
