import Adafruit_DHT

def read():
    ''' returns tuple of temperature and humidity '''
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 2, delay_seconds=0.1)
    metric = {
        "name": 'dht11',
        "measurements":[
            {
                "name":"humidity",
                "value":humidity
            },
            {
                "name":"temperature",
                "value":temperature
            }
        ]

    }
    return metric