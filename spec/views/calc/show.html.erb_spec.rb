require 'rails_helper'

RSpec.describe "calc/show.html.erb" do
  
  it "renderiza el template de / y muestra un boton de calcular" do
    render
    expect(rendered).to match /calcular/
  end
end