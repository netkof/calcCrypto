
//intereses del 5% y 3%
const ethInterest = 0.05, btcInterest = 0.03
let r, table, head, monthlyInterests, csvContent, investment = 0, auxBtc, auxEth, loop, accumulatedEth = 0, accumulatedBtc = 0

//loop para actualizar precios
window.initialize = function(){
  requestPrices()
  if(loop == null)
  // los precios se solicitan cada 8s (por restricciones de la api externa)
    loop = setInterval(requestPrices,8000)
}
//solicita la actualizacion de precios y estos llegan por websocket (para probar la funcionalidad de los sockets) en /app/javascript/channels/prices_channel
//ya que de otro modo se tendria que configurar un servicio en el servidor que siempre este corriendo y enviando automaticamente los precios actuales
window.requestPrices = async function (){
  let error, ok = false
  await fetch("/prices/")
  .then((data) => data.json())
  .then((json) => {
    if(!json.ok){
      console.log("error al solicitar precios actualizados",json.error)
    }else{
      console.log("se solicitaron precios actualizados")
    }
  }).catch(e => console.log("Error al solicitar precios",e))
}

//calcula los intereses de 12 meses sobre el monto inicial y actualiza la tabla
window.calculateInterests = async function(btcPrice,ethPrice){
  monthlyInterests = []
  csvContent = []
  //console.log(`btc ${btcPrice} eth ${ethPrice}`)
  investment = document.getElementById('investment').value || 0
  table = document.getElementById('mtable')
  head = `<tr>
            <th>INVERSIÓN</th>
            <th>$ ${investment} dls</th>
          </tr>
          <tr>
            <th>Bitcoin $${btcPrice} dls</th>
            <th>Ethereum $${ethPrice} dls</th>
          </tr>
        `
  csvContent.push(['Inversión',investment])
  csvContent.push(['Bitcoin','Ethereum'])
  //el calculo se hara sobre el saldo acumulado 
  accumulatedEth = investment
  accumulatedBtc = investment
  for(let i = 1; i <= 12; i++){
    accumulatedEth = accumulatedEth * (1 + ethInterest)
    accumulatedBtc = accumulatedBtc * (1 + btcInterest)
    auxBtc = `Mes${i}: ${accumulatedBtc/btcPrice} BTC`
    auxEth = `Mes${i}: ${accumulatedEth/ethPrice} ETH`
    monthlyInterests.push(`
      <tr>
        <th>${auxBtc}</th>
        <th>${auxEth}</th>
      </tr>
    `)
    csvContent.push([auxBtc,auxEth])
  }
  //console.log(monthlyInterests)
  table.innerHTML = head + monthlyInterests.reduce((v1,v2)=>`${v1}${v2}`)
  
  //se habilita boton para descarga 
  document.getElementById('btn-download').disabled = false
}

//genera el archivo csv y lo descarga
window.generateAndDownloadCsv = function(){
  let doc = "data:text/csv;charset=utf-8," 
    + csvContent.map(e => e.join(",")).join("\n")
  
  let a = document.createElement("a")
  a.href = doc
  a.download = "intereses.csv"
  a.click()
}