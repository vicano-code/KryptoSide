import unittest
from unittest.mock import patch, MagicMock
import app
from app import format_currency_int, format_currency_float, format_percent, MarketData
from models.engine import DBStorage

class TestMyFlaskApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_index(self):
        result = self.app.get('/kryptoside')
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'<html>', result.data)

    def test_market(self):
        result = self.app.get('/kryptoside/market')
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'<html>', result.data)

    def test_coin(self):
        with patch('my_flask_app.coins', ['bitcoin', 'ethereum']):
            result = self.app.get('/kryptoside/coin')
            self.assertEqual(result.status_code, 200)
            self.assertIn(b'bitcoin', result.data)
            self.assertIn(b'ethereum', result.data)

    def test_redirect_to_index(self):
        result = self.app.get('/redirect_to_index')
        self.assertEqual(result.status_code, 302)
        self.assertIn(b'kryptoside', result.data)

    def test_redirect_to_market(self):
        result = self.app.get('/redirect_to_market')
        self.assertEqual(result.status_code, 302)
        self.assertIn(b'market', result.data)

    def test_redirect_to_coin(self):
        result = self.app.get('/redirect_to_coin')
        self.assertEqual(result.status_code, 302)
        self.assertIn(b'coin', result.data)

    def test_format_currency_int(self):
        self.assertEqual(format_currency_int(1000), '$1,000')
        self.assertEqual(format_currency_int(1000000), '$1,000,000')

    def test_format_currency_float(self):
        self.assertEqual(format_currency_float(0.12345), '$0.1234')
        self.assertEqual(format_currency_float(12345.6789), '$12,345.68')

    def test_format_percent(self):
        self.assertEqual(format_percent(0.12345), '0.12')
        self.assertEqual(format_percent(12.345), '12.35')

    @patch('app.requests.get')
    def test_update_market_data(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = [{'symbol': 'btc', 'name': 'Bitcoin', 'current_price': 30000}]
        mock_get.return_value = mock_response

        with patch('.storage') as mock_storage:
            mock_storage.all.return_value.filter_by.return_value.first.return_value = None
            mock_storage.new.return_value = None
            mock_storage.save.return_value = None
            mock_storage.close.return_value = None

            response = self.app.post('/update_market_data')
            self.assertEqual(response.status_code, 200)

class TestDBStorage(unittest.TestCase):

    def setUp(self):
        self.storage = DBStorage()

    @patch('DBStorage.__init__', return_value=None)
    def test_all(self, mock_init):
        mock_session = MagicMock()
        mock_session.query.return_value = ['mock_item']
        self.storage._DBStorage__session = mock_session

        result = self.storage.all(MarketData)
        self.assertEqual(result, ['mock_item'])

    @patch('DBStorage.__init__', return_value=None)
    def test_new(self, mock_init):
        mock_session = MagicMock()
        self.storage._DBStorage__session = mock_session
        mock_obj = MagicMock()

        self.storage.new(mock_obj)
        mock_session.add.assert_called_once_with(mock_obj)

    @patch('DBStorage.__init__', return_value=None)
    def test_save(self, mock_init):
        mock_session = MagicMock()
        self.storage._DBStorage__session = mock_session

        self.storage.save()
        mock_session.commit.assert_called_once()

    @patch('DBStorage.__init__', return_value=None)
    def test_count(self, mock_init):
        mock_session = MagicMock()
        mock_session.query.return_value.all.return_value = ['item1', 'item2']
        self.storage._DBStorage__session = mock_session

        result = self.storage.count(MarketData)
        self.assertEqual(result, 2)

    @patch('DBStorage.__init__', return_value=None)
    def test_reload(self, mock_init):
        mock_engine = MagicMock()
        self.storage._DBStorage__engine = mock_engine

        with patch('app.Base.metadata.create_all') as mock_create_all:
            with patch('app.scoped_session') as mock_scoped_session:
                mock_session_factory = MagicMock()
                mock_scoped_session.return_value = mock_session_factory

                self.storage.reload()
                mock_create_all.assert_called_once_with(mock_engine)
                mock_scoped_session.assert_called_once()

    @patch('app.DBStorage.__init__', return_value=None)
    def test_close(self, mock_init):
        mock_session = MagicMock()
        self.storage._DBStorage__session = mock_session

        self.storage.close()
        mock_session.remove.assert_called_once()

if __name__ == '__main__':
    unittest.main()
