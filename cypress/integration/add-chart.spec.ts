describe('Add new chart', () => {
	it.only('should create a new simple bar chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Simple bar chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'simple-bar-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a new scatter chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Scatter chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'scatter-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a donut chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Donut chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'donut-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a stacked bar chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Stacked bar chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'stacked-bar-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a stacked bar chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Stacked bar chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'stacked-bar-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a line chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Line chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'line-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a grouped bar chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Grouped bar chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'grouped-bar-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
	it.only('should create a pie chart', () => {
		// login as guest
		cy.visit('http://localhost:5000/api/guest-login');

		cy.contains('New chart').click();
		cy.contains('Pick a chart type').click();
		cy.contains('Next').click();
		cy.contains('Pie chart').click();
		cy.contains('Done').click();
		cy.get('button[title="Open menu"]').click();
		cy.contains('General').click();
		cy.get('select[id="type"]').find(':selected').should('have.value', 'pie-chart');
		// remove chart when done
		cy.get('button[title="Delete chart"]').click();
		cy.contains(/Delete/).click();
	})
});
