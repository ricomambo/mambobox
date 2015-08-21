import Adafruit_DHT

def read():
    ''' returns tuple of temperature and humidity '''
    humidity, temperature = Adafruit_DHT.read(Adafruit_DHT.DHT11, 2)
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