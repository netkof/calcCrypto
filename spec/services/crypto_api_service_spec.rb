require "rails_helper"

RSpec.describe "Servicio de conexion con api externa de precios crypto" do

  it "obtiene los precios actuales de btc y eth y revisa que regresen correctamente" do
    ok, prices, error = CryptoApiService::get_prices_messari()
    expect(ok).to eq(true)
    expect(error).to eq(nil)
    expect(prices).to include({
      eth: be_a_kind_of(Float),
      btc: be_a_kind_of(Float)
    })
  end
end

