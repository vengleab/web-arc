const userModel = require("../models/user");
module.exports = {
  async me(req, res) {
    try {
      const userId = req.body.userId;
      const user = await userModel.findOne({_id:userId});
      
      if(!user) throw new Error('Not found');
      res.send({
        data:user,
        status: true,
        message: 'success',
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async creatUser(req, res){
    try {
      const { username, password, email} = req.body;
      
      const user = new userModel({username, password, email});
      res.send(await user.save());
    } catch (error) {
      res.status(400).send(error);
    }
  }
};