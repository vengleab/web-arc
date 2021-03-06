import JWTUtils from '../utils/JWTUtils'

module.exports =  (req, res, next) => {
  const authurization = req.header('authorization');
  const [authType, token] = authurization ? authurization.split(' ') : [];
  
  
  if( authType==='Bearer' && token){
    try {
      const userId = JWTUtils.extractPayload(token);

      Object.assign(req.body, {userId});
      //req.user = 
      next();
      return ; 
    } catch (error) {
      console.log(error);
    }
  }

  res.status(401).send({ status: false, message: 'Not Authorized' });
};
