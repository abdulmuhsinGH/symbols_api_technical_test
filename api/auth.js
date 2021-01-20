const jwt = require("jsonwebtoken");


const authMiddleWare = (req, res, next)=>{
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).json({"status":"forbidden"});
      return;
    }
    const result = jwt.decode(token, {json:true});
    if (!result || !result.username || !result.password) {
      res.status(401).json({"status":"forbidden"});
      return;
    }
  } catch (error) {
    res.status(500).json({"status":"error"});
  }
  next();
}

const authenticate = (req, res)=>{
  try {
    let {username, password } = req.body;
    if (!username) {
      res.status(401).json({"message":"Please provide a valid username"});
      return
    }
    if (!password) {
      res.status(401).json({"message":"Please provide a valid password"});
      return;
    }
    const token = jwt.sign(JSON.stringify(req.body), process.env.JWT_SECRET).toString();

    res.status(200).json({"message":"Json Web Token", "token":token});
  } catch (error) {
    console.error(error);
    res.status(500).json({"message":"Something went wrong; Please try again later"});
  }

}

module.exports = {authMiddleWare, authenticate}
