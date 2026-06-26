from django.test import TestCase

class DBConnectivityTests(TestCase):
    def test_api_endpoint_exists(self):
        response = self.client.get('/api/testing/db/')
        self.assertEqual(response['Content-Type'], 'application/json')
