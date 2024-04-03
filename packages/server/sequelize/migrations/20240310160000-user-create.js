// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        secondName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        displayName: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        login: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        avatar: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },

    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
}

module.exports = { up, down };