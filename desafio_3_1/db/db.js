import Sequelize from 'sequelize';

const sequelize = new Sequelize('consultorio', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5034,
  storage: '..\\data',
  logging: false,
});

export default sequelize;
