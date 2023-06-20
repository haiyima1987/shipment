<template>
  <div class="flex-layout">
    <div class="col-md-50">
      <InputField
          :field-title="'First Name'"
          :field-name="getFieldName('FirstName')"
          :data-cy="getDataCy('first-name')"
          :rules="''"
          :type="'text'"
          :placeholder="'Enter first name'"/>
    </div>
    <div class="col-md-50">
      <InputField
          :field-title="'Last Name'"
          :field-name="getFieldName('LastName')"
          :data-cy="getDataCy('last-name')"
          :rules="''"
          :type="'text'"
          :placeholder="'Enter last name'"/>
    </div>
  </div>
  <div class="flex-layout">
    <div class="col-70 col-md-60">
      <InputField
          :field-title="'Street'"
          :field-name="getFieldName('Street')"
          :data-cy="getDataCy('street')"
          :rules="'required'"
          :type="'text'"
          :placeholder="'Enter street'"/>
    </div>
    <div class="col-70 col-md-40">
      <InputField
          :field-title="'Postal Code'"
          :field-name="getFieldName('PostalCode')"
          :data-cy="getDataCy('postal-code')"
          :rules="isPostalCodeRequired"
          :type="'text'"
          :placeholder="'Enter postal code'"/>
    </div>
  </div>
  <div class="flex-layout">
    <div class="col-70 col-md-70">
      <InputField
          :field-title="'City'"
          :field-name="getFieldName('City')"
          :data-cy="getDataCy('city')"
          :rules="'required'"
          :type="'text'"
          :placeholder="'Enter city'"/>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/form/InputField';

export default {
  name: 'AddressFormPartial',
  components: {
    InputField
  },
  props: {
    name: {
      required: true
    },
    isPostalCodeRequired: {
      default: 'required'
    }
  },
  methods: {
    getFieldName: function (value) {
      return `${this.name}${value}`;
    },
    getDataCy: function (value) {
      return `${this.name}-${value}`;
    }
  }
}
</script>
