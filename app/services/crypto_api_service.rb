module CryptoApiService
  include HTTParty
  format :json
  headers 'Accept' => 'application/json', "Content-Type"=>"application/json"

  def self.get_prices_messari
    begin
      response1 = get('https://data.messari.io/api/v1/assets/bitcoin/metrics')
      response2 = get('https://data.messari.io/api/v1/assets/ethereum/metrics')
      btc_price = response1.parsed_response["data"]["market_data"]["price_usd"]
      eth_price = response2.parsed_response["data"]["market_data"]["price_usd"]
      return true, { eth:eth_price, btc:btc_price }
    rescue => e
      #TODO: log de error y tipo
      return false, nil, "Error al obtener precios de messari"
    end
  end
end