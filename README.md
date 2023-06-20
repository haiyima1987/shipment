# Welcome!

## Here are the steps to set up:

### Add env file
Go inside directory of "shipment" and copy .env.example file. Then change the name to .env

### NPM set up

Run `npm install`

The used npm version is v16.13.2

### Serve the project

Run `npm run serve`

The project should be up and running on "http://localhost:8080"

## Tests

Run `npx cypress open`

Click E2E testing from the popped up browser, then select your preferred browser.

Click cypress/e2e/create -> create.cy.js to see the test results.

## Form validation

The form validation is done by my own NPM module called yo-validator.

Here is the link for the code of yo-validator: [https://github.com/haiyima1987/yo-validator](https://github.com/haiyima1987/yo-validator)
