import Sequelize from 'sequelize';
import database from '../db/db.js';

export const ConsultaSchema = database.define('consulta', {
  pacienteCpf: {
    type: Sequelize.STRING(11),
    allowNull: false,
    references: {
      model: 'pacientes',
      key: 'cpf',
    },
  },
  dataConsulta: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  horaInicio: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  horaFim: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  duracao: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});
