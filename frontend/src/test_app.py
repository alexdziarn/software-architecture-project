import unittest
from mock import patch, Mock
import requests
import json
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
    #test home
    def test_main(self):
        response = self.client.get("/")
        assert response.status_code == 200
        self.assertIn("form", response.get_data(as_text=True))

        
    

if __name__ == '__main__':
    unittest.main()