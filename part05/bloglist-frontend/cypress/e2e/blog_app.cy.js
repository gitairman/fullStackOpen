describe('Blog app', function () {
  before(function () {
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
      cy.visit('http://localhost:5173')
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

  describe('When user logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('airman')
      cy.get('#password').type('aaronrules')
      cy.get('#login-button').click()
    })
    it('can add a new blog', function () {
      cy.get('#title').type('this is a new blog title')
      cy.get('#author').type('this is a new blog author')
      cy.get('#url').type('thisisanewurl.com')
      cy.get('#addBlogBtn').click()
      cy.get('div').should('have.class', 'blog')
    })
    it('can like a blog', function () {
      cy.get('button').contains('view').click()
      cy.get('button').contains('like').click()
      cy.contains('UPDATED')
    })
    it('can delete a blog they created', function () {
      cy.get('button').contains('view').click()
      cy.get('button').contains('delete blog')
    })

    describe('when user logs out', function() {
      beforeEach(function() {
        cy.get('#logout-button').click()
      })
      it('cannot delete a blog', function() {
        cy.get('button').contains('view').click()
        cy.get('button').contains('delete blog').should('not.exist')
      })
    })

  })


})