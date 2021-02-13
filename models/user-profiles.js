// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const UserProfiles = sequelize.define(
    "userProfiles",
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
      },
      phone: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      provincy: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: "user_profiles",
      underscored: true,
      schema: process.env.DATABASE_SCHEMA,
      hooks: {
        beforeUpdate(userProfiles, options) {
          userProfiles.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        },
      },
    }
  );

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  UserProfiles.associate = models => {};

  return UserProfiles;
};