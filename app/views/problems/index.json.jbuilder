json.array!(@problems) do |problem|
  json.extract! problem, :id, :title, :pgn_data, :fen, :insert_admin, :move
  json.url problem_url(problem, format: :json)
end
