const server = require('./src/app');
const {sequelize, SERVER_PORT} = require('./src/db');
sequelize.sync({alter: true})
    .then(()=>{
        server.listen(Number(SERVER_PORT), () => {
            console.log(`Server running on port: ${SERVER_PORT}`);
        });
    })
    .catch((error) => console.log(error.message));
