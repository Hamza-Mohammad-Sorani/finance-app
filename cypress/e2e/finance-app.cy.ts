describe('Finance App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Sidebar and Language Tests', () => {
    it('should toggle sidebar (desktop) and switch language', () => {
      cy.viewport(1280, 720); // Desktop
      // Sidebar should be visible
      cy.get('[data-cy="sidebar"]').should('be.visible');
      // Close sidebar (desktop toggle is the second one)
      cy.get('[data-cy="sidebar-toggle"]').eq(1).click();
      // Reopen sidebar
      cy.get('[data-cy="sidebar-toggle"]').eq(1).click();
      cy.get('[data-cy="sidebar"] .MuiDrawer-paper').should($el => {
        const style = window.getComputedStyle($el[0]);
        expect(parseInt(style.width, 10)).to.be.greaterThan(100); // Open
      });
      // Switch language and check dir attribute
      cy.get('html')
        .invoke('attr', 'lang')
        .then(langBefore => {
          cy.get('[data-cy="language-switcher"]').click();
          cy.get('html')
            .invoke('attr', 'lang')
            .should(langAfter => {
              expect(langAfter).not.to.eq(langBefore);
            });
        });
    });

    it('should toggle sidebar (mobile)', () => {
      cy.viewport(375, 667); // Mobile
      // Sidebar should not be visible initially
      cy.get('[data-cy="sidebar"]').should('not.be.visible');
      // Open sidebar (mobile toggle is the first one)
      cy.get('[data-cy="sidebar-toggle"]').eq(0).click();
      cy.get('[data-cy="sidebar"]').should('be.visible');
      // Close sidebar
      cy.get('[data-cy="sidebar-toggle"]').eq(0).click();
      cy.get('[data-cy="sidebar"]').should('not.be.visible');
    });
  });

  describe('Expenses Page Tests', () => {
    beforeEach(() => {
      cy.visit('/expenses');
    });

    it('should filter expenses correctly', () => {
      // Test Pending filter
      cy.get('[data-cy="filter-pending"]').click();
      cy.get('[data-cy="expense-item"]').each($el => {
        cy.wrap($el).should('contain', 'Pending');
      });

      // Test other filters
      cy.get('[data-cy="filter-approved"]').click();
      cy.get('[data-cy="expense-item"]').each($el => {
        cy.wrap($el).should('contain', 'Approved');
      });

      cy.get('[data-cy="filter-rejected"]').click();
      cy.get('[data-cy="expense-item"]').each($el => {
        cy.wrap($el).should('contain', 'Rejected');
      });
    });

    it('should add, edit, and delete expense', () => {
      // Add new expense
      const testExpense = {
        amount: '100',
        description: 'Test Expense',
        status: 'Pending',
      };

      cy.get('[data-cy="add-expense-button"]').click();
      cy.get('[data-cy="expense-amount"]').type(testExpense.amount);
      cy.get('[data-cy="expense-description"]').type(testExpense.description);
      cy.get('[data-cy="expense-status"]').click();
      cy.get('[role="option"]').contains(testExpense.status).click();
      cy.get('[data-cy="submit-expense"]').click();

      // Verify new expense is at the top
      cy.get('[data-cy="expense-item"]')
        .first()
        .should('contain', testExpense.description);

      // Edit expense
      cy.get('[data-cy="expense-item"]')
        .first()
        .find('[data-cy="edit-expense"]')
        .click();
      cy.get('[data-cy="expense-description"]').clear().type('Updated Expense');
      cy.get('[data-cy="submit-expense"]').click();
      cy.get('[data-cy="expense-item"]')
        .first()
        .should('contain', 'Updated Expense');

      // Delete expense
      cy.get('[data-cy="expense-item"]')
        .first()
        .find('[data-cy="delete-expense"]')
        .click();
      cy.get('[data-cy="confirm-delete"]').click();
      cy.get('[data-cy="expense-item"]')
        .first()
        .should('not.contain', 'Updated Expense');
    });

    it('should approve and reject expense', () => {
      // Approve expense
      cy.get('[data-cy="expense-item"]')
        .first()
        .find('[data-cy="approve-expense"]')
        .click();
      cy.get('[data-cy="confirm-approve"]').click();
      cy.get('[data-cy="expense-item"]').first().should('contain', 'Approved');

      // Add new expense
      const testExpense = {
        amount: '100',
        description: 'Test Expense',
        status: 'Pending',
      };

      cy.get('[data-cy="add-expense-button"]').click();
      cy.get('[data-cy="expense-amount"]').type(testExpense.amount);
      cy.get('[data-cy="expense-description"]').type(testExpense.description);
      cy.get('[data-cy="expense-status"]').click();
      cy.get('[role="option"]').contains(testExpense.status).click();
      cy.get('[data-cy="submit-expense"]').click();

      // Verify new expense is at the top
      cy.get('[data-cy="expense-item"]')
        .first()
        .should('contain', testExpense.description);

      // Reject expense
      cy.get('[data-cy="expense-item"]')
        .first()
        .find('[data-cy="reject-expense"]')
        .click();
      cy.get('[data-cy="confirm-reject"]').click();
      cy.get('[data-cy="expense-item"]').first().should('contain', 'Rejected');
    });
  });

  describe('Cards Page Tests', () => {
    beforeEach(() => {
      cy.visit('/cards');
    });

    it('should filter cards correctly', () => {
      // Test active filter
      cy.get('[data-cy="filter-active"]').click();
      cy.get('[data-cy="card-item"]').each($el => {
        cy.wrap($el).should('contain', 'Active');
      });

      // Test inactive filter
      cy.get('[data-cy="filter-inactive"]').click();
      cy.get('[data-cy="card-item"]').each($el => {
        cy.wrap($el).should('contain', 'Inactive');
      });
    });

    it('should add, edit, and delete card', () => {
      // Add new card
      const testCard = {
        cardholderName: 'Test Card',
        last4Digits: '1234',
        status: 'Active',
      };

      cy.get('[data-cy="add-card-button"]').click();
      cy.get('[data-cy="card-name"]').type(testCard.cardholderName);
      cy.get('[data-cy="card-number"]').type(testCard.last4Digits);
      cy.get('[data-cy="card-status"]').click();
      cy.get('[role="option"]').contains(testCard.status).click();
      cy.get('[data-cy="submit-card"]').click();

      // Verify new card exists
      cy.get('[data-cy="card-item"]').should(
        'contain',
        testCard.cardholderName,
      );

      // Edit card
      cy.get('[data-cy="card-item"]')
        .first()
        .find('[data-cy="edit-card"]')
        .click();
      cy.get('[data-cy="card-name"]').clear().type('Updated Card');
      cy.get('[data-cy="submit-card"]').click();
      cy.get('[data-cy="card-item"]').first().should('contain', 'Updated Card');

      // Delete card
      cy.get('[data-cy="card-item"]')
        .first()
        .find('[data-cy="delete-card"]')
        .click();
      cy.get('[data-cy="confirm-delete"]').click();
      cy.get('[data-cy="card-item"]')
        .first()
        .should('not.contain', 'Updated Card');
    });

    it('should activate and deactivate card', () => {
      // Deactivate card
      cy.get('[data-cy="card-item"]')
        .first()
        .find('[data-cy="deactivate-card"]')
        .click();
      cy.get('[data-cy="confirm-deactivate"]').click();
      cy.get('[data-cy="card-item"]').first().should('contain', 'Inactive');

      // Activate card
      cy.get('[data-cy="card-item"]')
        .first()
        .find('[data-cy="activate-card"]')
        .click();
      cy.get('[data-cy="confirm-activate"]').click();
      cy.get('[data-cy="card-item"]').first().should('contain', 'Active');
    });
  });
});
