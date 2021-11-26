require 'rails_helper'

RSpec.describe "calc/show.html.erb" do
  
  it "renderiza el template de / y verifica que el contenido este correcto (checando que existe el boton de 'calcular')" do
    render
    expect(rendered).to match /calcular/
  end
end