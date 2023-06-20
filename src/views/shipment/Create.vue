<template>
  <div class="create-page-wrapper">
    <div class="back-button-wrapper">
      <router-link :to="{ name: ROUTE_NAMES_SHIPMENT.SHIPMENT_OVERVIEW }" class="button-back">
        <font-awesome-icon icon="arrow-left" class="fa-arrow-left"/>&nbsp;
        BACK TO OVERVIEW
      </router-link>
    </div>
    <div class="card">
      <div class="card-header">
        <h2 class="title-card">Add shipment</h2>
      </div>
      <hr class="divider">
      <div class="card-body">
        <FormWrapper :on-form-valid="onFormValid">
          <template #content>
            <div class="form-group-wrapper flex-layout">
              <div class="form-container col-xl-50">
                <h3>Sender Info</h3>
                <AddressFormPartial
                    :name="'sender'"
                    :is-postal-code-required="senderPostalCodeRequired"/>
                <div class="flex-layout">
                  <div class="col-70">
                    <CustomSelectField
                        :field-title="'Country'"
                        :field-name="'senderCountry'"
                        :rules="'required'"
                        :options="countries"
                        :value-key="'name'"
                        :text-key="'name'"
                        :custom-errors="errorMessages"
                        :placeholder="'Select country'"
                        :data-cy="'sender-country'"
                        :data-cy-options="'sender-country-options'"
                        @value-changed="onSenderCountryChange"/>
                  </div>
                </div>
              </div>
              <div class="form-container col-xl-50">
                <h3>Receiver Info</h3>
                <AddressFormPartial
                    :name="'receiver'"
                    :is-postal-code-required="receiverPostalCodeRequired"/>
                <div class="flex-layout">
                  <div class="col-70">
                    <CustomSelectField
                        :field-title="'Country'"
                        :field-name="'receiverCountry'"
                        :rules="'required'"
                        :options="countries"
                        :value-key="'name'"
                        :text-key="'name'"
                        :custom-errors="errorMessages"
                        :placeholder="'Select country'"
                        :data-cy="'receiver-country'"
                        :data-cy-options="'receiver-country-options'"
                        @value-changed="onReceiverCountryChange"/>
                  </div>
                </div>
              </div>
            </div>
            <hr class="divider divider-service-code">
            <div class="flex-layout">
              <div class="col-70 col-xl-50">
                <CustomSelectField
                    :field-title="'Service code'"
                    :field-name="'serviceCode'"
                    :rules="'required'"
                    :type="'text'"
                    :options="SERVICE_CODES"
                    :has-search="false"
                    :placeholder="'Select service code'"
                    :data-cy="'service-code'"
                    :data-cy-options="'service-code-options'"
                    @value-changed="onValueChanged"/>
              </div>
            </div>
          </template>
          <template #submit>
            <div class="button-submit-wrapper">
              <button ref="buttonSubmit"
                      type="submit"
                      class="validator-button-submit button-save"
                      data-cy="button-submit"
                      @click="checkCountryValid">
                SAVE
              </button>
            </div>
          </template>
        </FormWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import FormWrapper from '@/components/form/FormWrapper';
import AddressFormPartial from '@/components/partials/AddressFormPartial';
import CustomSelectField from '@/components/form/CustomSelectField';
import countries from '@/utils/countries.json';
import { SERVICE_CODES } from '@/models/Shipment';
import { ROUTE_NAMES_SHIPMENT } from '@/router/modules/shipment';

export default {
  name: 'Create',
  components: {
    FormWrapper,
    AddressFormPartial,
    CustomSelectField
  },
  data: () => ({
    ROUTE_NAMES_SHIPMENT,
    countries,
    SERVICE_CODES,
    senderPostalCodeRequired: 'required',
    receiverPostalCodeRequired: 'required',
    errorMessages: '',
    sameCountry: false
  }),
  methods: {
    onValueChanged: function (value) {
      this.sameCountry = value === 1;
    },
    onSenderCountryChange: function (value) {
      this.senderCountry = value;
      this.senderPostalCodeRequired = value === 'Hong Kong' ? '' : 'required';
    },
    onReceiverCountryChange: function (value) {
      this.receiverCountry = value;
      this.receiverPostalCodeRequired = value === 'Hong Kong' ? '' : 'required';
    },
    checkCountryValid: function () {
      this.errorMessages = [];
      if (this.sameCountry) {
        if (this.senderCountry !== this.receiverCountry) {
          this.errorMessages = ["The sender's country must be the same as receiver's country if the shipment is domestic."];
          return false;
        }
        return true;
      } else {
        if (this.senderCountry === this.receiverCountry) {
          this.errorMessages = ["The sender's country must be different from receiver's country if the shipment is international."];
          return false;
        }
        return true;
      }
    },
    onFormValid: function (data) {
      // here it is easier to keep a local variable to check country before sending the form
      // yo-validator can do the same but the logic will be more complex, so the simpler way is chosen
      if (!this.checkCountryValid()) return;
      this.$store.dispatch('createShipment', data).then(response => {
        if (response) {
          this.$router.push({name: ROUTE_NAMES_SHIPMENT.SHIPMENT_OVERVIEW});
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/_base.functions.scss";
@import "~@/assets/css/_base.variables.scss";

.create-page-wrapper {
  padding: rem(60) 0 rem(80);
  max-width: rem(900);

  @media screen and (min-width: $screen-xl) {
    max-width: rem(1200);
  }
}

.back-button-wrapper {
  padding: 0 0 rem(30) 0;

  .button-back {
    font-size: rem(18);
    color: var(--color-blue);
    box-shadow: none;
    font-weight: bold;
  }
}

.divider-service-code {
  margin: rem(40) 0 0;
}

.button-submit-wrapper {
  padding-top: rem(40);
  text-align: right;
}
</style>
