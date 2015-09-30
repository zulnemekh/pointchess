json.array!(@trains) do |train|
  json.extract! train, :id, :title, :text_data, :pgn_type, :insert_admin
  json.url train_url(train, format: :json)
end
