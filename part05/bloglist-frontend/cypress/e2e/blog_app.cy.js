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
      cy.login({ username: 'airman', password: 'aaronrules' })
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

    describe('when user logs out', function () {
      beforeEach(function () {
        cy.get('#logout-button').click()
      })
      it('cannot delete a blog', function () {
        cy.get('button').contains('view').click()
        cy.get('button').contains('delete blog').should('not.exist')
      })
    })

  })

  describe('When blogs exist', function () {
    before(function () {
      cy.login({ username: 'airman', password: 'aaronrules' })
      cy.createBlog({
        title: 'blog with least likes',
        author: 'miserable guy',
        url: 'leastlikes.com',
        likes: 5
      })
      cy.createBlog({
        title: 'blog with most likes',
        author: 'amazing guy',
        url: 'mostlikes.com',
        likes: 20
      })
      cy.createBlog({
        title: 'blog with average likes',
        author: 'decent guy',
        url: 'averagelikes.com',
        likes: 10
      })
      cy.get('.blogDetails').click({ multiple: true })
    })
    it('they are in sorted order with most likes first', function () {
      const likeArray = []
      cy.get('.likes').each(($span) => {
        likeArray.push(Number($span.text()))
      })
      console.log(likeArray)
      expect(likeArray.every((val, idx, arr) =>
        idx === 0 || val <= arr[idx - 1])
      ).to.eq(true)
    })
  })


})