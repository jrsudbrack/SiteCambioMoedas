const axios = require('axios').default;

async function atualizaCotacao (){
    cotacaoJSON = {}
    let response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL')
        try {
            cotacaoJSON = {
                "dolar": parseFloat(response.data.USDBRL.bid).toFixed(2),
                "euro": parseFloat(response.data.EURBRL.bid).toFixed(2),
                "libraEsterlina": parseFloat(response.data.GBPBRL.bid).toFixed(2)
            }
            return cotacaoJSON
        } catch (error) {
            console.log(error);
        }
}

async function convertemoeda(valor, tipo){
    cotacao = await atualizaCotacao();
    valorfinal = valor/cotacao[tipo];
    return parseFloat(valorfinal.toFixed(2));
};

module.exports = { convertemoeda }