from sqlalchemy import BigInteger, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

# Define the SQLAlchemy ORM model
Base = declarative_base()

class MarketData(Base):
    """Table definition"""
    __tablename__ = 'market_table'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False)
    symbol = Column(String(10), nullable=False)
    image = Column(String(256), nullable=True)
    current_price = Column(Float, nullable=True)
    market_cap = Column(BigInteger, nullable=True)
    market_cap_rank = Column(Integer, nullable=False)
    total_volume = Column(BigInteger, nullable=False)
    price_change_24h = Column(Float, nullable=True)
    price_change_percent_24h = Column(Float, nullable=True)
    market_cap_change_24h = Column(BigInteger, nullable=True)
    market_cap_change_percent_24h = Column(Float, nullable=True)
    last_updated = Column(String(128), nullable=False)
