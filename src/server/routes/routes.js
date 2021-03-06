
const router = require("express").Router();
import home from '../controllers/HomeController'
import auth from '../controllers/AuthController'
import user from '../controllers/UserController'
import authUser from '../middlewares/authUser'
import authJWT from '../middlewares/authJWT'

//render view
router.get("/", home.index);

//API Route
router.group('/api/v1', (subRouter) => {
  //========= Auth =========
  subRouter.post('/login', auth.login);

  //========= User =========
  subRouter.group('/user', (userRoute) => {
    userRoute.get('/me',authJWT, user.me);
    userRoute.post("/",user.creatUser);
  });

  subRouter.use((req, res, next)=>{
    res.status(404).send({
      message: 'Not found',
      code: 404,
    });
  })
  
  subRouter.use((err, req, res, next)=>{
    console.log(err);
    
    res.status(500).send({
      message: 'Internal Server Error',
      code: 500,
    });
  });
});


//Eoror
router.use((req, res, next)=>{
  res.status(404).render('404');
})
module.exports = router
