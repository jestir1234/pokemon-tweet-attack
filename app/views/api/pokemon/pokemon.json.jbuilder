json.array!(@pokemon) do |pokemon|
  json.name pokemon['name']
  json.url pokemon['url']
  json.image_url pokemon['image_url']
  json.gif_url pokemon['gif_url']
  json.id pokemon['id']
  # json.search_results @search_results[pokemon['name']]
end
