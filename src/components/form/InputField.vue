<template>
  <div :style="{'width': fieldWidth}"
       class="validator-field-wrapper">
    <h3 v-if="fieldTitle"
        class="validator-title">
      {{ fieldTitle }}
    </h3>
    <FieldValidator
      ref="validator"
      v-slot="{errors}"
      :field-name="fieldName"
      :rules="rules"
      :is-cross-field="isCrossField"
      :mode="mode"
      :error-mode="errorMode"
      :delay="delay"
      :tag="tag">
      <label :for="fieldName">
        <input
          :id="fieldName"
          ref="inputField"
          v-model="input"
          :type="type"
          :name="fieldName"
          :placeholder="placeholder"
          :data-cy="dataCy"
          :class="{ 'validator-error-field': errors.length > 0 || parsedErrors.length > 0 }"
          class="validator-input">
      </label>
      <div v-if="parsedErrors.length > 0"
           class="validator-error-messages">
        <p v-for="(error, index) of parsedErrors"
           :key="index"
           class="validator-error">
          {{ error }}
        </p>
      </div>
      <div v-if="errors.length > 0"
           class="validator-error-messages">
        <p v-for="(error, index) of errors"
           :key="index"
           class="validator-error">
          {{ error }}
        </p>
      </div>
    </FieldValidator>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    // required
    fieldName: {
      required: true
    },
    type: {
      required: true
    },
    // not required
    rules: {
      default: 'required'
    },
    customErrors: {
      required: false
    },
    value: {
      required: false
    },
    // html
    fieldTitle: {
      required: false
    },
    placeholder: {
      required: false
    },
    fieldWidth: {
      default: '100%'
    },
    // test
    dataCy: {
      required: false
    },
    // validator
    isCrossField: {
      default: false
    },
    mode: {
      required: false
    },
    errorMode: {
      required: false
    },
    delay: {
      default: 10
    },
    tag: {
      default: 'span'
    }
  },
  data: () => ({
    input: '',
    parsedErrors: []
  }),
  watch: {
    value: function (newVal) {
      this.checkValue(newVal);
    },
    customErrors: function (newVal) {
      if (Array.isArray(newVal)) {
        this.parsedErrors = newVal;
      }
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    validate: function () {
      this.$refs.validator.validate();
    },
    validateData: function (data) {
      this.$refs.validator.validateData(data);
    },
    setFieldData: function (data) {
      this.$refs.validator.setFieldData(data);
    },
    checkValue: function (value) {
      if (value) {
        this.input = value;
      }
    },
    initialize: function () {
      this.checkValue(this.$props.value);
    }
  }
}
</script>

<style>
</style>
