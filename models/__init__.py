#!/usr/bin/python3
"""
initialize the models package
"""
from models.engine.db_storage import DBStorage
from models.market_data import MarketData
from models import get_market_data

storage = DBStorage()
storage.reload()  