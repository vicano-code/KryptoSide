import requests
import json
from sqlalchemy import BigInteger, create_engine, Column, Integer, String, Float, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker
from os import getenv

# Fetch data from API
apiKey = getenv('API_KEY')
url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key='+apiKey
headers = {
    'accept': 'application/json'
}
response = requests.get(url, headers=headers)
data = response.json()  # Assuming the response is in JSON format

# Define the SQLAlchemy ORM model
Base = declarative_base()

class CryptoData(Base):
    """Table definition"""
    __tablename__ = 'crypto_data'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False)
    symbol = Column(String(10), nullable=False)
    image = Column(String(256))
    price = Column(Float)
    marketCap = Column(BigInteger)
    marketCapRank = Column(Integer, nullable=False)
    volume24hr = Column(BigInteger)

# Connect to MySQL database
username = getenv('KSIDE_MYSQL_USER')
password = getenv('KSIDE_MYSQL_PWD')
database = getenv('KSIDE_MYSQL_DB')
DATABASE_URL = "mysql+mysqldb://"+username+":"+password+"@localhost/"+database
engine = create_engine(DATABASE_URL)

# Create the table (if it doesn't exist)
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Parse and insert data into the database
for item in data:
    name = item.get('name')
    symbol = item.get('symbol').upper()
    img = item.get('image')
    price = item.get('current_price')
    mktCap = item.get('market_cap')
    mktCapRank = item.get('market_cap_rank')
    vol24hr = item.get('total_volume')

    new_record = CryptoData(name=name, symbol=symbol, image=img,
                            price=price, marketCap=mktCap,
                            marketCapRank=mktCapRank, volume24hr=vol24hr)
    session.add(new_record)

# Commit the transaction
session.commit()

# Close the session
session.close()
