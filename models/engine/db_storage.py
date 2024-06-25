#!/usr/bin/python3
"""
Contains the class DBStorage
"""
from models.market_data import MarketData, Base
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

#classes = {"MarketData": MarketData}
           
class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        username = getenv('KSIDE_MYSQL_USER')
        password = getenv('KSIDE_MYSQL_PWD')
        host = 'localhost'
        database = getenv('KSIDE_MYSQL_DB')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(username,
                                             password,
                                             host,
                                             database))
    
    def all(self, cls=None):
        """get all data from table in database"""
        if cls:
          return self.__session.query(cls)
        else:
            return None
        
    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def count(self, cls):
        """gets the number of items in database table"""
        obj = self.__session.query(cls).all()
        return len(obj)
      
    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()
        
