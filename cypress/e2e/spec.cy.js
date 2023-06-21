describe('Form Test', () => {
  it('Fills out and submits a form', () => {
    cy.intercept('POST', '/konnektive/creditcard/import-order').as('formSubmit')

    cy.visit('https://staging.trybandoo.com/products/order')

    cy.get('script[src*="https://www.googletagmanager.com/gtm.js"]').should('exist')

    // Check that the dataLayer object exists
    cy.window().its('dataLayer').should('exist')

    // Interact with the form's fields
    cy.get('#email').type('automation+e2e@adtractive.io')
    cy.get('#firstName').type('Robo')
    cy.get('#lastName').type('Cop')
    cy.get('div.react-tel-input input[type="tel"]').type('1234567890')
    cy.get('#address').type('test')
    cy.get('#city').type('city')
    cy.get('#country').select('US')
    cy.get('#state').select('Alabama')
    cy.get('#postalCode').type('123')
    cy.get('#CREDITCARD').check()
    cy.get('#cardNumber').type('7111222233334444')
    cy.get('#expDate').type('0330')
    cy.get('#cvv').type('100')
    cy.get('#checkout-form').submit()

    cy.wait('@formSubmit')


    cy.url().should('include', '/products/promo/0')
  })
})