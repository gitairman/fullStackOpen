describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Aaron Hopkins',
      username: 'airman',
      password: 'aaronrules'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('shows the login form by default', function() {
    cy.get('#username')
    cy.get('#password')
  })


})