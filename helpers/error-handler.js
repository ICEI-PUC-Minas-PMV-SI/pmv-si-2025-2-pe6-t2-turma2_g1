function errorHandler(err, req, res, next) {
  if (err.nome === "UnauthorizedError") {
    //jwt authentication error
    return res.status(401).json({ message: "Usuário não autorizado" });
  }

  if (err.nome === "ValidacaoErro") {
    return res.status(401).json({ message: err });
  }

  return res.status(500).json(err);
}
//manipulador de erros para nossa autorização e validação
module.exports = errorHandler;
