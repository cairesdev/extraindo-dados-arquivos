module.exports = {
    login: `SELECT LOGIN, SENHA, SISTEMA, ORGAO, SISTEMA_ARQ_FL
            FROM USUARIO
            WHERE LOGIN=? AND SENHA=? AND SISTEMA_ARQ_FL > 0`
}
  