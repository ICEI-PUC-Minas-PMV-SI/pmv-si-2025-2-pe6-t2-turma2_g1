const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/api\/v1\/produtos(.*)/,
        methods: ["GET", "OPTIONS", "POST"],
      },
      { url: /\/api\/v1\/categorias(.*)/, methods: ["GET", "OPTIONS"] },
      {
        url: /\/api\/v1\/pedidos(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
      },
      { url: /\/api\/v1\/usuarios\/login/, methods: ["POST"] },
      { url: /\/api\/v1\/usuarios\/registrar/, methods: ["POST"] },
      `${api}/usuarios/login`,
      `${api}/usuarios/registrar`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
