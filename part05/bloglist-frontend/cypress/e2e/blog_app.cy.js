describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Aaron Hopkins',
      username: 'airman',
      password: 'aaronrules'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('shows the login form by default', function () {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.get('#username').clear()
      cy.get('#password').clear()
    })
    it('is denied login with invalid credentials', function () {
      cy.get('#username').type('johnny')
      cy.get('#password').type('appleseed')
      cy.get('#login-button').click()
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('invalid')
    })
    it('succeeds with valid credentials', function () {
      cy.get('#username').type('airman')
      cy.get('#password').type('aaronrules')
      cy.get('#login-button').click()
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Successfully')
    })
  })




})