require 'rails_helper'
RSpec.describe "Solicitud de precios de cryptos actualizados", type: :request do
  context "se realiza un request para actualizar precios" do
    it "recibe la petición y responde ok" do
      get "/prices"
      jresponse = JSON.parse response.body
      expect(jresponse["ok"]).to eq(true)
    end
  end
end