
const ethInterest = 0.05, btcInterest = 0.03
let r, table, head, monthlyInterests, csvContent, investment = 0, auxBtc, auxEth, loop

//loop para actualizar precios
window.initialize = function(){
  requestPrices()
  if(loop == null)
    loop = setInterval(requestPrices,8000)
}
//solicita la actualizacion de precios y estos llegan por websocket en /app/javascript/channels/prices_channel
//ya que de otro modo se tendria que configurar un servicio en el servidor que siempre este corriendo 
//mandando los precios actualizados
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
  for(let i = 1; i <= 12; i++){
    auxBtc = `Mes${i}: ${investment/btcPrice + (btcInterest*i)*investment/btcPrice} BTC`
    auxEth = `Mes${i}: ${investment/ethPrice + (ethInterest*i)*investment/ethPrice} ETH`
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

window.generateAndDownloadCsv = function(){
  let doc = "data:text/csv;charset=utf-8," 
    + csvContent.map(e => e.join(",")).join("\n")
  
  let a = document.createElement("a")
  a.href = doc
  a.download = "intereses.csv"
  a.click()
}