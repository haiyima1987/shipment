function getDataCySelector(name) {
  return `[data-cy="${name}"]`;
}

context('Create shipment page form validation', () => {
  let formFieldData;

  beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/create`);

    cy.fixture('create.json').then(data => {
      formFieldData = data;
    })
  })

  describe('Required and non-required', () => {
    beforeEach(() => {
      cy.fixture('create.json').as('formFieldData');
    })

    it('Show errors for required fields', () => {
      cy.get(getDataCySelector('button-submit')).click();
      // console.log(this.example.name)
      // required fields show errors
      formFieldData.required.map(fieldName => {
        formFieldData.types.map(typeName => {
          cy.get(getDataCySelector(`${typeName}-${fieldName}`)).should('have.class', formFieldData.errorField);
        })
      })
      cy.get(getDataCySelector('service-code')).should('have.class', formFieldData.errorField);
    })

    it('Show no error for non-required fields', () => {
      cy.get(getDataCySelector('button-submit')).click();
      // non-required fields don't show errors
      formFieldData.nonRequired.map(fieldName => {
        formFieldData.types.map(typeName => {
          cy.get(getDataCySelector(`${typeName}-${fieldName}`)).should('not.have.class', formFieldData.errorField);
        })
      })
    })
  })

  describe('Toggle required and non-required', () => {
    it('Postal code becomes non-required for Hong Kong', () => {
      cy.get(getDataCySelector('button-submit')).click()
      // select HK for sender
      cy.get(getDataCySelector('sender-country')).click()
      cy.get(getDataCySelector('sender-country-options'))
        .contains('[class=option-validator-cs]', formFieldData.nonRequiredOption)
        .click()
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('sender-postal-code')).should('not.have.class', formFieldData.errorField)
      // select HK for receiver
      cy.get(getDataCySelector('receiver-country')).click()
      cy.get(getDataCySelector('receiver-country-options'))
        .contains('[class=option-validator-cs]', formFieldData.nonRequiredOption)
        .click()
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('receiver-postal-code')).should('not.have.class', formFieldData.errorField)
    })
  })

  describe('Domestic shipment must have same country', () => {
    it('Domestic service code requires the same country', () => {
      cy.get(getDataCySelector('service-code')).click()
      // select DOMESTIC
      cy.get(getDataCySelector('service-code-options'))
        .contains('[class=option-validator-cs]', 'DOMESTIC')
        .click()
      // set 2 different countries for sender and receiver
      cy.get(getDataCySelector('sender-country')).click()
      cy.get(getDataCySelector('sender-country-options'))
        .contains('[class=option-validator-cs]', 'Netherlands')
        .click()
      cy.get(getDataCySelector('receiver-country')).click()
      cy.get(getDataCySelector('receiver-country-options'))
        .contains('[class=option-validator-cs]', 'Germany')
        .click()
      // expect errors
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('sender-country')).should('have.class', formFieldData.errorField);
      cy.get(getDataCySelector('receiver-country')).should('have.class', formFieldData.errorField);
      // set the same country for receiver
      cy.get(getDataCySelector('receiver-country')).click()
      cy.get(getDataCySelector('receiver-country-options'))
        .contains('[class=option-validator-cs]', 'Netherlands')
        .click()
      // expect errors to disappear
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('sender-country')).should('not.have.class', formFieldData.errorField);
      cy.get(getDataCySelector('receiver-country')).should('not.have.class', formFieldData.errorField);
    })
  })

  describe('International shipment must have different countries', () => {
    it('International service code requires different countries', () => {
      cy.get(getDataCySelector('service-code')).click()
      // select DOMESTIC
      cy.get(getDataCySelector('service-code-options'))
        .contains('[class=option-validator-cs]', 'INTERNATIONAL')
        .click()
      // set 2 different countries for sender and receiver
      cy.get(getDataCySelector('sender-country')).click()
      cy.get(getDataCySelector('sender-country-options'))
        .contains('[class=option-validator-cs]', 'Netherlands')
        .click()
      cy.get(getDataCySelector('receiver-country')).click()
      cy.get(getDataCySelector('receiver-country-options'))
        .contains('[class=option-validator-cs]', 'Netherlands')
        .click()
      // expect errors
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('sender-country')).should('have.class', formFieldData.errorField);
      cy.get(getDataCySelector('receiver-country')).should('have.class', formFieldData.errorField);
      // set the same country for receiver
      cy.get(getDataCySelector('receiver-country')).click()
      cy.get(getDataCySelector('receiver-country-options'))
        .contains('[class=option-validator-cs]', 'Germany')
        .click()
      // expect errors to disappear
      cy.get(getDataCySelector('button-submit')).click()
      cy.get(getDataCySelector('sender-country')).should('not.have.class', formFieldData.errorField);
      cy.get(getDataCySelector('receiver-country')).should('not.have.class', formFieldData.errorField);
    })
  })
})
