
const expressRoutes = require("express").Router();
const getSymbols = require("./symbols");
const { authenticate, authMiddleWare } = require("./auth");

const _methodNotAllowed = (_, res, next) => { 
  res.status(405).json({ "message": "method not supported"});
}

expressRoutes.get("/", (req, res) => {
  res.status(200).json({ "message": "Server connected" });
});

expressRoutes
  .route("/status")
  .post(authMiddleWare, (_, res) => {
    res.status(200).json({ "status": "okay" });
  }).get(_methodNotAllowed);


expressRoutes.post("/auth", authenticate);

expressRoutes
.route("/symbol")
.all(authMiddleWare, getSymbols)
.get(_methodNotAllowed);

module.exports = expressRoutes;