module.exports = {
    created: `INSERT INTO ARQ_RUBRICAS
        (ID, CPF, ORGAO, MES_PERIODO, ANO, TIPO_PAGAMENTO, DESCONTO, VALOR)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,

    checkDescontos:`SELECT SUM(RUB.VALOR) AS DESCONTO_TOTAL 
FROM ARQ_FOLHADEPAGAMENTOS fl
INNER JOIN ARQ_RUBRICAS rub
ON fl.ORGAO = RUB.ORGAO 
INNER JOIN ORGAO o 
ON fl.ORGAO = o.ID 
WHERE fl.CPF = RUB.CPF AND RUB.DESCONTO = 1 AND rub.CPF = '01659729394' AND o.UUID = '483bcd1babe83af2d8e22d0a0b2acc87b495d941'`,
}