'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kanji_progress', {
      progress_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'account',
          key: 'account_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      kanji_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'kanji',
          key: 'kanji_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      learned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kanji_progress');
  }
};
