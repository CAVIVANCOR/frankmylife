const express = require('express');
const morgan = require('morgan');
const mainRoute = require('./routes/index.js');
const {responseError} = require('./utils/index.js');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Importar path
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Authorization', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
}));
// Configurar el middleware de multer para manejar la carga de archivos
const storageFotos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/fotos'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});
const uploadFotos = multer({ storage: storageFotos });
// Ruta para manejar la carga de archivos en /media/usuarios
app.post('/media/fotos', uploadFotos.single('file'), (req, res) => {
    res.status(200).json({ message: 'Foto subido exitosamente' });
});
app.use('/media/fotos',express.static('media/fotos'));
const storageVideos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/videos'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});
const uploadVideos = multer({ storage: storageVideos });
// Ruta para manejar la carga de archivos en /media/usuarios
app.post('/media/videos', uploadVideos.single('file'), (req, res) => {
    res.status(200).json({ message: 'Video subido exitosamente' });
});
app.use('/media/videos',express.static('media/videos'));
app.use('/media/audios',express.static('media/audios'));
// Configurar el middleware de multer para manejar la carga de archivos
const storageUsuarios = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/usuarios'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});
const uploadUsuarios = multer({ storage: storageUsuarios });
// Ruta para manejar la carga de archivos en /media/usuarios
app.post('/media/usuarios', uploadUsuarios.single('file'), (req, res) => {
    res.status(200).json({ message: 'Archivo subido exitosamente' });
});
app.use('/media/usuarios',express.static('media/usuarios'));
app.use('/media/sistema',express.static('media/sistema'));


// Servir archivos estáticos del frontend en producción
//app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Redirigir todas las rutas a index.html para manejar el enrutamiento del frontend
//app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'frontend/dist', 'index.html'));
//});





app.use(mainRoute);
app.use((err,req,res,next)=>{
    responseError(res,err.statusCode,err.message,err.nameTable);
});
module.exports = app;