// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    // Устанавливаем значение по умолчанию для столбца password
    await queryInterface.sequelize.query(
        'UPDATE "Users" SET "password" = \'default_password\' WHERE "password" IS NULL'
    );

    // Изменяем столбец password, разрешая ему содержать null
    await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: true,
    });

    // Изменяем столбец avatar, разрешая ему содержать null
    await queryInterface.changeColumn('Users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: true,
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
    });

    await queryInterface.changeColumn('users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: false,
    });
}
module.exports = { up, down };