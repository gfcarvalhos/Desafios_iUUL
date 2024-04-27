import Sequelize from 'sequelize';
import database from '../db/db.js';

export const PacienteSchema = database.define('paciente', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  nome: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  dataNascimento: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  idade: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});