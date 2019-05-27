var users = [{ id:1 , email: 'hongly@slash.co', password: '123' }];

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          req.session.credential = {
            isAuthenticated: true,
            userId: user.id,
          }
          res.send({
            status: true,
            message: 'Login successfully',
          });
        } else {
          res.status(401).send({
            status: false,
            message: 'Email or Password is incorrect',
          });
        }
      } 
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
  