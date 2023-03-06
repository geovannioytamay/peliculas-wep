module.exports = {

    database: {
       // connectionLimit: 10,
        timeout  : 100000, 
        host: DB_HOST=process.env.DB_HOST || 'localhost',
        user: DB_USER=process.env.DB_USER || 'root',
        password: DB_PASSWORD=process.env.DB_PASSWORD || 'root',
        port: DB_PORT=process.env.DB_PORT || 3306,
        database: DB_NAME=process.env.DB_NAME || 'basepelis'
    }

};