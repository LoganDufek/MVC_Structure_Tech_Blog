const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
  // set up method to run on instance data (per user) to check password
   checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

// define table columns and configuration
User.init(
  {
   // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
  },
      // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
     password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    }
  },
  {
    hooks: {
   // set up beforeCreate lifecycle "hook" functionality
  async beforeCreate(newUserDataEntered) {
    newUserDataEntered.password = await bcrypt.hash(newUserDataEntered.password, 10);
    return newUserDataEntered;
    },
    // set up beforeUpdate lifecycle "hook" functionality
  async beforeUpdate(updatedUserDataEntered) {
    updatedUserDataEntered.password = await bcrypt.hash(updatedUserDataEntered.password, 10);
    return updatedUserDataEntered;
  }
},
   
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
  
);

module.exports = User;