Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/', to: 'calc#show'
  get '/prices/', to: 'prices#request_update'
end
