class PricesController < ApplicationController  
  #solicita una actualizacion del precio
  #el precio se envia por action cable
  #para mostrar funcionalidad de websockets
  def request_update
    ok, prices, error = CryptoApiService::get_prices_messari()
    if ok
      ActionCable.server.broadcast("prices", { prices: prices })
      #se regresa solamente un status de ok
      render json: {ok: true}
    else
      render json: {error: error}, status: 400
    end
  end

end