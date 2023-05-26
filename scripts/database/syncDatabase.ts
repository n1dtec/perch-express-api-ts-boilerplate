/* eslint-disable no-console */
import sequelize from '../../src/database';

async function sync() {
	await sequelize.sync({ force: true })
		.catch(error => (console.error(error)))
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		.finally(async () => {
			await sequelize.close();
			console.log('Database sync complete');
		});
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
sync();
