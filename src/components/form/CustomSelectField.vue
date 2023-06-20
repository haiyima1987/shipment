<template>
  <div class="validator-field-wrapper">
    <h3 v-if="!!fieldTitle" class="validator-title">{{ fieldTitle }}</h3>
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
      <div :id="ID_SELECT_WRAPPER" class="validator-custom-select-wrapper">
        <div :class="{ 'validator-error-field': errors.length > 0 || parsedErrors.length > 0 }"
             :data-cy="dataCy"
             class="validator-cs-text-wrapper"
             @click="toggleSelect($event)">
          <div v-if="selectedOption"
               :class="{'none-value': !selectedOption.value}"
               class="selected-text-validator-cs">{{ selectedOption.text }}
          </div>
          <div v-else class="placeholder-validator-cs">{{ placeholder }}</div>
        </div>
        <div v-if="isOpen" class="validator-cs-option-list-wrapper">
          <div v-if="hasSearch" class="list-search-wrapper">
            <input type="text"
                   class="validator-input"
                   @click="(e) => e.stopPropagation()"
                   @input="onUserInput($event)">
          </div>
          <div :data-cy="dataCyOptions" class="validator-cs-option-list">
            <div v-for="(option, index) in parsedOptions"
                 v-show="option.isShown"
                 :key="index"
                 :class="{'selected': option.isSelected, 'none-value': !option.value}"
                 class="option-validator-cs"
                 @click="handleClick($event, option)">
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedOptions.length > 0" class="validator-cs-selected-list">
        <div v-for="(option, index) in selectedOptions" :key="index"
             class="tag-validator-cs-selected"
             @click="removeOption(option)">{{ option.text }}
          <div class="icon-delete-tag-wrapper">
            <i class="fas fa-times icon-delete-tag"/>
          </div>
        </div>
      </div>
      <div v-if="parsedErrors.length > 0" class="validator-error-messages">
        <p v-for="(error, index) of parsedErrors" :key="index" class="validator-error">{{ error }}</p>
      </div>
      <div v-if="errors.length > 0" class="validator-error-messages">
        <p v-for="(error, index) of errors" :key="index" class="validator-error">{{ error }}</p>
      </div>
    </FieldValidator>
  </div>
</template>

<script>
const EVENT_VALUE_CHANGED = 'value-changed';
const ID_SELECT_WRAPPER = 'customSelectWrapper';

export default {
  name: 'CustomSelectField',
  props: {
    // required
    fieldName: {
      required: true
    },
    options: {
      required: true
    },
    callback: {
      required: false
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
    valueKey: {
      default: 'value'
    },
    textKey: {
      default: 'text'
    },
    // html
    fieldTitle: {
      required: true
    },
    placeholder: {
      default: 'Select an option'
    },
    fieldWidth: {
      default: '100%'
    },
    isMultiple: {
      default: false
    },
    hasSearch: {
      default: true
    },
    // test
    dataCy: {
      required: false
    },
    dataCyOptions: {
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
    ID_SELECT_WRAPPER,
    input: '',
    parsedOptions: [],
    parsedErrors: [],
    selectedOption: undefined,
    selectedOptions: [],
    isOpen: false,
    setData: undefined,
  }),
  watch: {
    value: function (newVal) {
      this.checkValue(newVal);
    },
    customErrors: function (newVal) {
      if (Array.isArray(newVal)) {
        this.parsedErrors = newVal;
      }
    },
    isOpen: function (newVal) {
      if (newVal) {
        document.addEventListener('click', this.checkEvent);
      } else {
        document.removeEventListener('click', this.checkEvent);
        this.showAllOptions();
      }
    }
  },
  mounted() {
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
    validateOnSetData: function (data) {
      this.$refs.validator.setFieldData(data);
      this.$refs.validator.validateData(data);
    },
    handleClick: function (e, option) {
      e.stopPropagation();
      this.onOptionSelected(option);
      this.setData(this.input);
      this.$emit(EVENT_VALUE_CHANGED, this.input);
    },
    onOptionSelected: function (option) {
      this.parsedOptions = this.parsedOptions.map(parsedOption => {
        parsedOption.isSelected = parsedOption.value && parsedOption.value === option.value;
        return parsedOption
      })
      this.selectedOption = option;
      this.input = option.value;
      this.isOpen = false;
    },
    onOptionSelectedMultiple: function (option) {
      option.isSelected = !option.isSelected;
      this.selectedOptions = this.parsedOptions.filter(parsedOption => parsedOption.isSelected);
      this.input = this.selectedOptions.map(option => option.value);
    },
    removeOption: function (option) {
      option.isSelected = false;
      this.selectedOptions = this.parsedOptions.filter(parsedOption => parsedOption.isSelected);
      this.input = this.selectedOptions.map(option => option.value);
      this.setData(this.input);
    },
    toggleSelect: function (e) {
      e.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    checkEvent: function (e) {
      if (!document.getElementById(ID_SELECT_WRAPPER).contains(e.target)) {
        this.isOpen = false;
      }
    },
    onUserInput: function (e) {
      const value = e.target.value;
      this.parsedOptions = this.parsedOptions.map(option => {
        option.isShown = option.text.toLowerCase().includes(value.toLowerCase());
        return option;
      });
    },
    showAllOptions: function () {
      this.parsedOptions = this.parsedOptions.map(option => {
        option.isShown = true;
        return option;
      });
    },
    initializeOptions: function () {
      const options = this.$props.options;
      if (options && Array.isArray(options)) {
        this.parsedOptions = options.map(option => {
          const value = option[this.valueKey];
          const text = option[this.textKey];
          return {value, text, isShown: true};
        });
      }
    },
    checkValue: function (value) {
      if (value) {
        this.parsedOptions = this.parsedOptions.map(parsedOption => {
          if (parsedOption.value === value) {
            parsedOption.isSelected = true;
            this.selectedOption = parsedOption;
            this.input = parsedOption.value;
          } else {
            parsedOption.isSelected = false;
          }
          return parsedOption
        })
        this.setData(this.input);
      }
    },
    checkValueMultiple: function (value) {
      if (value && Array.isArray(value)) {
        this.parsedOptions = this.parsedOptions.map(parsedOption => {
          if (value.includes(parsedOption.value)) {
            parsedOption.isSelected = true;
            if (!this.input.includes(parsedOption.value)) {
              this.selectedOptions = this.selectedOptions.concat(parsedOption);
              this.input = this.input.concat(parsedOption.value);
            }
          } else {
            parsedOption.isSelected = false;
          }
          return parsedOption
        })
        this.setData(this.input);
      }
    },
    initialize: function () {
      this.input = this.$props.isMultiple ? [] : '';
      this.checkValue = this.$props.isMultiple ? this.checkValueMultiple : this.checkValue;
      this.onOptionSelected = this.$props.isMultiple ? this.onOptionSelectedMultiple : this.onOptionSelected;
      this.setData = this.$props.mode === 3 ? this.validateOnSetData : this.setFieldData;
      this.initializeOptions();
      this.checkValue(this.$props.value);
    }
  }
}
</script>
