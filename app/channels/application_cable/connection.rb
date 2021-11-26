module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :uuid
    #ya que no se autentica a los clientes se les asigna un uuid aleatorio
    def connect
      self.uuid = SecureRandom.uuid
    end
  end
end
