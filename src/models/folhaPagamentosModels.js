module.exports = {
        created: `INSERT INTO ARQ_FOLHADEPAGAMENTOS
                (ID, NOME, MES_PERIODO, ANO, TIPO_FOLHA, ORGAO, CPF, MATRICULA, CBO, CARGO, LOTACAO, VINCULO, DATAADMISSAO, CARGAHORARIA, VALORBRUTO, VALORLIQUIDO, VALORDESCONTO)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,

        checkPortal:`
                SELECT ID, CNPJ, NOME
                FROM ORGAO o
                WHERE UUID=?;`,

        updateDesconto:`
                UPDATE ARQ_FOLHADEPAGAMENTOS
                SET  VALORDESCONTO=?
                WHERE ID=?;`,

        select: `SELECT ID, NOME, MES_PERIODO, ANO, TIPO_FOLHA, ORGAO, CPF, MATRICULA, CBO, CARGO, LOTACAO, VINCULO, DATAADMISSAO, CARGAHORARIA, VALORBRUTO, VALORLIQUIDO, VALORDESCONTO
                FROM ARQ_FOLHADEPAGAMENTOS;`,

        listAll: `SELECT AFL.*, atf.NOME AS TIPO_FOLHA
FROM ARQ_FOLHADEPAGAMENTOS afL
INNER JOIN ORGAO o  
ON O.ID = AFL.ORGAO 
INNER JOIN ARQ_TIPOS_FOLHAS atf
ON atf.ID = afl.TIPO_FOLHA 
                WHERE AFL.VISUALIZACAO = 1 AND O.UUID=?`,

        listAllAndNotDisplayed: `SELECT AFL.*, atf.NOME AS TIPO_FOLHA
FROM ARQ_FOLHADEPAGAMENTOS afL
INNER JOIN ORGAO o  
ON O.ID = AFL.ORGAO 
INNER JOIN ARQ_TIPOS_FOLHAS atf
ON atf.ID = afl.TIPO_FOLHA 
                WHERE O.UUID=?`,

        searchByPeriod:`
                SELECT AFL.*, atf.NOME AS TIPO_FOLHA
FROM ARQ_FOLHADEPAGAMENTOS afL
INNER JOIN ORGAO o  
ON O.ID = AFL.ORGAO 
INNER JOIN ARQ_TIPOS_FOLHAS atf
ON atf.ID = afl.TIPO_FOLHA 
                WHERE AFL.VISUALIZACAO = 1 AND AFL.MES_PERIODO=? AND AFL.ANO=? AND O.UUID = ?
        `,

        searchByPeriodAndNotDisplayed:`
                SELECT AFL.*, atf.NOME AS TIPO_FOLHA
FROM ARQ_FOLHADEPAGAMENTOS afL
INNER JOIN ORGAO o  
ON O.ID = AFL.ORGAO 
INNER JOIN ARQ_TIPOS_FOLHAS atf
ON atf.ID = afl.TIPO_FOLHA 
                WHERE AFL.MES_PERIODO=? AND AFL.ANO=? AND O.UUID = ?
        `,


        changeView:`
                UPDATE ARQ_FOLHADEPAGAMENTOS afl
                SET afl.VISUALIZACAO = ?
                WHERE afl.MES_PERIODO = ?
                AND afl.ANO = ?
                AND afl.ORGAO IN (
                SELECT o.ID 
                FROM ORGAO o
                WHERE o.UUID = ?);`,

        selectPeriods:`
                SELECT DISTINCT AFL.MES_PERIODO, AFL.ANO 
                FROM ARQ_FOLHADEPAGAMENTOS afL
                INNER JOIN ORGAO o  
                ON O.ID = AFL.ORGAO 
                WHERE O.UUID = ? ANF;`,

}