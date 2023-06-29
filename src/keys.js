module.exports = {

    database: {
        connectionLimit: 10,
        timeout  : 100000,         
        host: DB_HOST=process.env.DB_HOST || 'aws.connect.psdb.cloud',
        user: DB_USER=process.env.DB_USER || 'm1k3ycyplhkkaum41gz9',
        password: DB_PASSWORD=process.env.DB_PASSWORD || 'pscale_pw_kFsIEJfoQyekz1VMEVs3vHWseO4xCiS8I7755lxy27q',
        port: DB_PORT=process.env.DB_PORT || 3306,
        database: DB_NAME=process.env.DB_NAME || 'basepelis' ,
        ssl:{
            rejetUnauthorized:false
        }      
     
    }
  

};