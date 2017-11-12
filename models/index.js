var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    author: {
        type: Sequelize.TEXT,
        allowNull: true
    }
},
{
    getterMethods: {
        route() {
            return '/wiki' + this.urlTitle
        },
    }
});
Page.beforeValidate('page', function(str) {
    if (str.urlTitle) {
        str.urlTitle =  str.urlTitle.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        str.urlTitle =  Math.random().toString(36).substring(2, 7);
      }
})
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

module.exports = {
    Page: Page,
    User: User
  };