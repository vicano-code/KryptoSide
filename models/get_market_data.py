#!/usr/bin/python3
from os import getenv
import requests


apiKey = getenv('COINGECKO_API_KEY')
# Fetch marrket data from API
url = f'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,7d,30d,1y&per_page=250&x_cg_demo_api_key={apiKey}'
headers = {
    'accept': 'application/json'
}
response = requests.get(url, headers=headers)
data = response.json()
