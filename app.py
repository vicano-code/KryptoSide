#!/usr/bin/python3
import models
from models import storage
from models.market_data import MarketData
from models import get_market_data
from os import getenv
from flask import Flask, render_template, request, redirect, url_for, session
import requests

apiKey = getenv('COINGECKO_API_KEY')

app = Flask(__name__)

coins = []
for item in get_market_data.data:
    coins.append(item.get('name'))

def format_currency_int(value):
    """Formats an integer value as currency"""
    return f"${value:,.0f}"

def format_currency_float(value):
    """Formats a float value as currency"""
    if value < 1:
        # Format to 5 significant figures
        return f"${value:,.4g}"
    else:
        # Format to 7 significant figures
        return f"${value:,.2f}"

def format_percent(value):
    """formats the percentage value"""
    return f"{value:.2f}"

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

@app.route('/update_market_data', methods=['POST'])
def update_market_data():
    """update the database with current api data"""
    for item in get_market_data.data:
        symbol = item.get('symbol').upper()
        market_data = storage.all(MarketData).filter_by(symbol=symbol).first()
  
        if market_data:
            market_data.name = item.get('name')
            market_data.symbol = item.get('symbol').upper()
            market_data.image = item.get('image')
            market_data.current_price = item.get('current_price')
            market_data.market_cap = item.get('market_cap')
            market_data.market_cap_rank = item.get('market_cap_rank')
            market_data.total_volume = item.get('total_volume')
            market_data.price_change_24h = item.get('price_change_24h')
            market_data.price_change_percent_1h = item.get('price_change_percentage_1h_in_currency')
            market_data.price_change_percent_24h = item.get('price_change_percentage_24h')
            market_data.price_change_percent_7d = item.get('price_change_percentage_7d_in_currency')
            market_data.price_change_percent_30d = item.get('price_change_percentage_30d_in_currency')
            market_data.price_change_percent_1y = item.get('price_change_percentage_1y_in_currency')
            market_data.market_cap_change_24h = item.get('market_cap_change_24h')
            market_data.market_cap_change_percent_24h = item.get('market_cap_change_percentage_24h')
            market_data.last_updated = item.get('last_updated')
        else:
            new_record = MarketData(
                name = item.get('name'),
                symbol = item.get('symbol').upper(),
                image = item.get('image'),
                current_price = item.get('current_price'),
                market_cap = item.get('market_cap'),
                market_cap_rank = item.get('market_cap_rank'),
                total_volume = item.get('total_volume'),
                price_change_24h = item.get('price_change_24h'),
                price_change_percent_1h = item.get('price_change_percentage_1h_in_currency'),
                price_change_percent_24h = item.get('price_change_percentage_24h'),
                price_change_percent_7d = item.get('price_change_percentage_7d_in_currency'),
                price_change_percent_30d = item.get('price_change_percentage_30d_in_currency'),
                price_change_percent_1y = item.get('price_change_percentage_1y_in_currency'),
                market_cap_change_24h = item.get('market_cap_change_24h'),
                market_cap_change_percent_24h = item.get('market_cap_change_percentage_24h'),
                last_updated = item.get('last_updated'),
            )
            storage.new(new_record)
    storage.save()
    storage.close()

@app.route('/kryptoside-home', strict_slashes=False)
def index():
    """Fetch market data from the database"""
    update_market_data()
    market_data = storage.all(MarketData)
    # Format the data
    formatted_data = []
    for item in market_data:
        formatted_data.append({
            'id': item.id,
            'name': item.name,
            'symbol': item.symbol,
            'image': item.image,
            'current_price': format_currency_float(item.current_price) if item.current_price is not None else 'N/A',
            'market_cap': format_currency_int(item.market_cap) if item.market_cap is not None else 'N/A',
            'market_cap_rank': item.market_cap_rank,
            'total_volume': format_currency_int(item.total_volume) if item.total_volume is not None else 'N/A',
            'price_change_percent_1h': format_percent(item.price_change_percent_1h) if item.price_change_percent_1h is not None else 'N/A',
            'price_change_percent_24h': format_percent(item.price_change_percent_24h) if item.price_change_percent_24h is not None else 'N/A', 
            'price_change_percent_7d': format_percent(item.price_change_percent_7d) if item.price_change_percent_7d is not None else 'N/A',
            'price_change_percent_30d': format_percent(item.price_change_percent_30d) if item.price_change_percent_30d is not None else 'N/A',
            'price_change_percent_1y': format_percent(item.price_change_percent_1y) if item.price_change_percent_1y is not None else 'N/A',
        });
    return render_template('index.html', records=formatted_data, crypto_coins=coins, api_key=apiKey)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5001)