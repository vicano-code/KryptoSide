from models.base import CryptoData
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from os import getenv

app = Flask(__name__)

# Connect to MySQL database
username = getenv('KSIDE_MYSQL_USER')
password = getenv('KSIDE_MYSQL_PWD')
database = getenv('KSIDE_MYSQL_DB')
DATABASE_URL = "mysql+mysqldb://"+username+":"+password+"@localhost/"+database

# Set up the database engine
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def format_currency_int(value):
    """Formats an integer value as currency"""
    return f"${value:,.0f}"

def format_currency_float(value):
    """Formats a float value as currency"""
    return f"${value:,.2f}"

@app.route('/', strict_slashes=False)
def index():
  """Fetch data from the database"""
  records = session.query(CryptoData).all()

  # Format the data
  formatted_data = []
  for item in records:
      formatted_data.append({
          'name': item.name,
          'symbol': item.symbol,
          'image': item.image,
          'price': format_currency_float(item.price) if item.price is not None else 'N/A',
          'marketCap': format_currency_int(item.marketCap) if item.marketCap is not None else 'N/A',
          'marketCapRank': item.marketCapRank,
          'volume24hr': format_currency_int(item.volume24hr) if item.volume24hr is not None else 'N/A'
      });
  return render_template('index.html', records=formatted_data)

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)