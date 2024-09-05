const { extractDataXLS_Servidores, extractDataXML_Servidores } = require('../ultils/extractData');

const {executeQuery,executeQueryTrx} = require('../database/type');
const { v4: uuid } = require('uuid');


const processCSV =  async(file, request, response)=>{
    
    const {buffer} = file
    const {
        columnNome, 
        columnVinculo, 
        columnMes_Periodo,
        columnAno,
        columnOrgao,
        columnCpf, 
        columnMatricula, 
        columnCargo, 
        columnDataAdmissao, 
        columnCargaHoraria, 
        columnValorBruto, 
        columnValorLiquido, 
        columnValorDesconto
            } = request.body

    
    const readableFile = new Readable();
    readableFile.push(buffer)
    readableFile.push(null)
    const dataLine = readLine.createInterface({
        input: readableFile
    })
    const data = []

    for await(let line of dataLine){
        const lineSplit = line.split('|');

        data.push({
        nome: lineSplit[columnNome],
        vinculo: lineSplit[columnVinculo],       
        mes_periodo: lineSplit[columnMes_Periodo],
        ano: lineSplit[columnAno],
        orgao: lineSplit[columnOrgao],
        cpf: lineSplit[columnCpf],
        matricula: lineSplit[columnMatricula], 
        cargo: lineSplit[columnCargo],
        dataAdmissao: lineSplit[columnDataAdmissao],//10
        cargaHoraria: lineSplit[columnCargaHoraria],
        valorBruto: parseFloat(lineSplit[columnValorBruto]),
        valorLiquido: parseFloat(lineSplit[columnValorLiquido]),
        valorDesconto: parseFloat(lineSplit[columnValorDesconto]),
        })


    }
    
    /*
    for await (let {nome,vinculo,mes_periodo,ano,orgao,cpf,matricula,cargo,dataAdmissao,cargaHoraria,valorBruto,valorLiquido,valorDesconto} of data){
        await client.DadosExatraidosFolhaDePagementos.create(
            {
                data:{nome,vinculo,mes_periodo,ano,orgao,cpf,matricula,cargo,cargaHoraria,valorBruto,valorLiquido,valorDesconto}
            })
        }
        */


    return response.json(data);

}
const processXLS = async(file, request, response)=>{

    const {buffer} = file
    const params = request.body
    
    const resultExtract = await extractDataXLS_Servidores(buffer,params)

    response.json({"resultExtract": resultExtract})
}
const processXML = async(file, request, response)=>{
    const {buffer} = file

    const resultExtract = await extractDataXML_Servidores(buffer)

    response.json({"resultExtract": resultExtract})
}


module.exports = {
    insert: async( request, response)=>{
        //console.log(request.file);
        const file = request.file
        const {body} = request
    
        console.log(file)
        //console.log(body) 
    
        switch (file.mimetype) {
            case 'text/csv':
                console.log("__CSV")
                processCSV(file, request, response);
                break;
            case 'application/vnd.ms-excel':
                console.log("__XLS_EXECEL")
                processXLS(file,request, response);
                break;
            case 'application/xml':
                console.log("__XML")
                processXML(file,request, response);
                break;
            case 'application/json':
                console.log("__JSON")
                processJSON(file,request, response);
                break;
            default:
                response.status(400).json('Unsupported file type');
        }
    },
    joinCSV: async( request, response)=>{
        //console.log(request.file);
        const {files} = request
        const {body} = request
       response.status(400).json({"Novo Arquivo": files[0].buffer})
    },
    show: (request, response)=>{
        try {/*
        const sql = type.executeQuery(
            
                `INSERT INTO ORGAO
                (ID, CNPJ, NOME, UUID)
                VALUES(?, ?, ?, ?);`,
            [
              uuid(),
              'a',
              'b', 
              'c',
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                return response.status(501).json({
                  error: true,
                 
                });
              }
              return response.status(200).json({
                error: false,
                
              });
            }
          );*/
    
        executeQuery(
            `SELECT * FROM ORGAO`
             ,[],
            (err, result) => {
                if (err) {
                console.log(err);
                return response.status(501).json({
                    error: true,
                    data: []
                });
                }
                //xconsole.log(result)
                return response.status(200).json({
                error: false,
                data: result
                });
            }
            );
        }catch(error){
            return response.send('<h1>ERRO</h1>');
        }
    },
    list: async ( request, response)=>{
    
        //const a = await client.DadosExatraidosFolhaDePagementos.findMany();
        //console.log(a)
        return response.status(200).json({"error": false, "result": 'a'});
    },

}