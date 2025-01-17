describe('Navigation', () => {

  const labelToProt = 'Show protected information if';

  it('Should navigate to the start page', () => {
    //Start from the index page
    cy.visit('/');

    cy.get('h1').contains('React Practical');
    cy.get('h2').contains("The topic 'Routes'");
    cy.contains(labelToProt);
    cy.get('div').contains('Go to the component programmatically, by checking the box:');
    cy.get('input[type="number"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
  })

  it('Should navigate to the /subtask1 page with parameters', () => {
    const path = '/subtask1';
    const benchmarkContent = 'Subtask1, parameter:';
    const parameters = [3, 5];

    parameters.forEach((parameter) => {
      cy.visit(`${path}/${parameter}`);
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').contains(`${benchmarkContent} ${parameter}`);
    });
  })

  it('Should navigate to the /subtask2 page with query parameters', () => {
    const path = '/subtask2';
    const benchmarkContent = 'Subtask2, query parameters:';
    const queries = ['name=user1', 'name=usr&role=admin'];

    queries.forEach((query) => {
      cy.visit(`${path}?${query}`);
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').contains(`${benchmarkContent} ${query.replaceAll('&', ', ')}`);
    });
  })

  describe('Test /subtask3', () => {
    const path = '/subtask3';
    const benchmarkContent = 'Subtask3, protected information';

    it('Should navigate to the /subtask3 by clicking if the condition is true', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('3');
      cy.contains(labelToProt).click();
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').contains(benchmarkContent);
      cy.url().should('contain', path);
    })
  
    it('Should not navigate to the /subtask3 by clicking if the condition is false', () => {
      cy.visit('/');
      cy.contains(labelToProt).click();
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').should('not.contain', benchmarkContent);
    })

    it('Should not navigate to the /subtask3 through the address bar if the condition is false', () => {
      cy.visit(path);
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').should('not.contain', benchmarkContent);
    })
  
    it('Protected information should disappear as soon as the condition become false', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('5');
      cy.contains(labelToProt).click();
      cy.get('div').contains(benchmarkContent);
      cy.url().should('contain', path);
      cy.get('input[type="number"]').type('2');
      cy.contains(labelToProt).click();
      cy.get('div').should('not.contain', benchmarkContent);
    })
  })

  describe('Test /subtask4', () => {
    const path = '/subtask4';
    const benchmarkContent = 'Subtask4, navigated programmatically';

    it('Should navigate to the /subtask4 page through the address bar', () => {
      cy.visit(path);
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').contains(benchmarkContent);
    })

    it('Should navigate to the /subtask4 page programmatically', () => { 
      cy.visit('/');
      cy.get('div').should('not.contain', benchmarkContent);
      cy.get('input[type="checkbox"]').check();
      cy.get('h1').contains('React Practical');
      cy.get('h2').contains("The topic 'Routes'");
      cy.get('div').contains(benchmarkContent);
      cy.url().should('contain', path);
    })
  })

})
