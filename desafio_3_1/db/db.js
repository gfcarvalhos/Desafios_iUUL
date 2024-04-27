import Sequelize from 'sequelize';

const sequelize = new Sequelize('consultorio', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5034,
});

export default sequelize;

