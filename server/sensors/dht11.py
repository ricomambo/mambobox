import Adafruit_DHT

def read():
    ''' returns tuple of temperature and humidity '''
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 2)

    data = [
        {
            "measurement": "humidity",
            "fields": {
                "value": humidity
            }
        },
        {
            "measurement": "temperature",
            "fields": {
                "value": temperature
            }
        },
    ]

    return data
