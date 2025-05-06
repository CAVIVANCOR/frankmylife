const server = require('./src/app');
const {sequelize, SERVER_PORT} = require('./src/db');
//sequelize.drop();
//console.log("All tables dropped!");
//{alter:true}
//{force:true}
// CREATE DATABASE frankmylife
sequelize.sync({alter: true})
    .then(()=>{
        server.listen(Number(SERVER_PORT), () => {
            console.log(`Server running on port: ${SERVER_PORT}`);
        });
    })
    .catch((error) => console.log(error.message));
