
function req_cotacoes () {
    (async () => {
      const rawResponse = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
        const content = await rawResponse.json();
        let req_dolar = parseFloat(content.USDBRL.bid).toFixed(2);
        let req_euro =  parseFloat(content.EURBRL.bid).toFixed(2);
        let req_libra = parseFloat(content.GBPBRL.bid).toFixed(2);

        document.getElementById("dolar").innerHTML = req_dolar.replace(".", ",");
        document.getElementById("euro").innerHTML = req_euro.replace(".", ",");
        document.getElementById("libra").innerHTML = req_libra.replace(".", ",");


    })();
  }
  
setInterval(req_cotacoes, 30000);

window.onload = req_cotacoes;