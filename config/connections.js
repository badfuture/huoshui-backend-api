/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
   *                                                                          *
   * Local disk storage for DEVELOPMENT ONLY                                  *
   *                                                                          *
   * Installed by default.                                                    *
   *                                                                          *
   ***************************************************************************/
  // for temporary testing ONLY
  // not suitable for production
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
   *                                                                          *
   * MySQL is the world's most popular relational database.                   *
   * http://en.wikipedia.org/wiki/MySQL                                       *
   *                                                                          *
   * Run: npm install sails-mysql                                             *
   *                                                                          *
   ***************************************************************************/
  localMysqlServer: {
     adapter: 'sails-mysql',
     host: 'localhost',
     user: 'admin', //optional
     password: 'huoshui', //optional
     database: 'huoshui' //optional
  },

  /***************************************************************************
   *                                                                          *
   * MongoDB is the leading NoSQL database.                                   *
   * http://en.wikipedia.org/wiki/MongoDB                                     *
   *                                                                          *
   * Run: npm install sails-mongo                                             *
   *                                                                          *
   ***************************************************************************/
  localMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: 'huoshui', //optional
    password: 'huoshui', //optional
    database: 'huoshui' //optional

  },

  //oversee MongoDB lab dev account, anybody can use this for testing
  remoteMongodbServer: {
    adapter: 'sails-mongo',
    host: 'ds056698.mlab.com',
    port: 56698,
    user: 'paladinze', //optional
    password: '921021', //optional
    database: 'huoshui' //optional
  },
  /***************************************************************************
   *                                                                          *
   * PostgreSQL is another officially supported relational database.          *
   * http://en.wikipedia.org/wiki/PostgreSQL                                  *
   *                                                                          *
   * Run: npm install sails-postgresql                                        *
   *                                                                          *
   *                                                                          *
   ***************************************************************************/

  localPostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    port: 5432,
    user: 'huoshui',
    password: 'huoshui',
    database: 'huoshui'
  },

  //hosted on aliyun, remember to modify the credentials locally
  remotePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: '114.55.26.28',
    port: 5432,
    user: 'huoshui',
    password: 'huoshui',
    database: 'huoshui'
  }
};
