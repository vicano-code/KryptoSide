import requests
from os import getenv


apiKey = getenv('API_KEY')
# Fetch marrket data from API
url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key='+apiKey
headers = {
    'accept': 'application/json'
}
response = requests.get(url, headers=headers)
data = response.json()

# Fetch coin-specific data
url = "https://api.coingecko.com/api/v3/coins/id?x_cg_demo_api_key="+apiKey
