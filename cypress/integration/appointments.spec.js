describe('Appointments', ()=>{
  
  it("should book an interview", () => {
    cy.request('GET','/api/debug/reset');
    cy.visit("/");
    cy.contains("Monday");
    cy.get('[alt=Add]')
      .first()
      .click();
    cy.get('input')
      .first()
      .type('Lydia Miller-Jones')
    cy.get('[alt="Sylvia Palmer"]')
      .first()
      .click()
    cy.contains('Save')
      .click()
  });

})