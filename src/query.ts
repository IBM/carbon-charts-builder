export const allChartsQuery = `
{
	charts {
		id,
		title,
		lastModified,
		owners,
		sharing,
		labels
	}
}
`;

export const allUsersQuery = `
{
	users {
		email,
		givenName,
		familyName,
		lastSeen,
		isAdmin
	}
}
`;

export const updateUserQuery = `
mutation($id: String, $user: UserInput) {
	updateUser(id: $id, user: $user) {
		email,
		givenName,
		familyName,
		isAdmin
	}
}
`;

export const chartQuery = `
query($id: String!) {
	chart(id: $id) {
		id,
		title,
		type,
		lastModified,
		options {
			chartsVersion,
			rawChartOptions
		},
		data,
		owners,
		sharing,
		labels
	}
}
`;

export const deleteChartQuery = `
mutation($id: String) {
	deleteChart(id: $id) {
		id
	}
}
`;

export const wipeUserQuery = `
mutation($id: String) {
	wipeUser(id: $id) {
		id
	}
}
`;

export const userDataQuery = `
query($id: String) {
	userData(id: $id) {
		user {
			id,
			email,
			givenName,
			familyName,
			lastSeen
			isAdmin
		},
		charts {
			id,
			title,
			lastModified,
			options {
				chartsVersion,
				rawChartOptions
			},
			data,
			owners,
			sharing,
			labels
		}
	}
}
`;

export const updateChartQuery = `
mutation($id: String, $input: ChartInput) {
	updateChart(id: $id, input: $input) {
		id
		type
		title
		labels
		owners
		sharing
		data
		options {
			rawChartOptions
			chartsVersion
		}
	}
}
`;

