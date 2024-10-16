//! -- importaciones

const { upload } = require("../../middleware/files.middleware");
const { isAuth } = require("../../middleware/auth.middleware")
const { 
    registerLargo, 
    registerEstado, 
    registerRedirect, 
    sendCode, 
    login,
    exampleAuth,
    autoLogin,
    resendCode,
    checkNewUser,
    changePassword,
    sendPassword,
    modifyPassword,
    update,
    deleteUser
} = require("../controllers/User.controllers")

//! --- hacer el enrutado

const UserRoutes = require("express").Router();

//! --- rutas

//* rutas sin auth
UserRoutes.post('/register', upload.single('image'), registerLargo);
UserRoutes.post('/registerUtil', upload.single('image'), registerEstado);
UserRoutes.post('/login', login);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post("/resendCode", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/sendPassword/:id", sendPassword);

//* rutas con auth
UserRoutes.get('/pruebas', [isAuth], exampleAuth);
UserRoutes.patch('/modifypassword', [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single('image'), update);
UserRoutes.delete("/", [isAuth], deleteUser);

//* rutas con redirect
UserRoutes.post('/registerRedirect', upload.single('image'), registerRedirect);
UserRoutes.post('/register/sendMail/:id', sendCode)
UserRoutes.patch("/forgotpassword", changePassword);

//! --- exportamos

module.exports = UserRoutes;