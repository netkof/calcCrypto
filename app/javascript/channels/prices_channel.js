import consumer from "./consumer"
//recibe los precios actualizados y actualiza los datos
consumer.subscriptions.create({ channel: "PricesChannel" }, {
  received(data) {
    console.log("se recibio info por socket",data)
    calculateInterests(data.prices.btc,data.prices.eth)
  }
})