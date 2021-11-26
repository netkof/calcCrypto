import consumer from "./consumer"
//recibe los precios actualizados de btc y eth y actualiza la interfaz mediante la funcion calculateInterests()
consumer.subscriptions.create({ channel: "PricesChannel" }, {
  received(data) {
    console.log("se recibio info por socket",data)
    calculateInterests(data.prices.btc,data.prices.eth)
  }
})