class PricesChannel < ApplicationCable::Channel
  def subscribed
    #solo se ocupara un canal por lo que no se le adjunta un identificador de 'room'
    stream_from "prices"
  end
end