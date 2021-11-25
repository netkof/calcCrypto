require "rails_helper"
include ActionCable::TestHelper
RSpec.describe PricesChannel, :type => :channel do
  it "suscribe satisfactoriamente al canal y verifica el envio de mensajes" do
    subscribe room_id: 1
    expect(subscription).to be_confirmed

    ActionCable.server.broadcast 'messages', { text: 'hola' }
    assert_broadcasts 'messages', 1
  end
end