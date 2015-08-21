# import Adafruit_DHT

def read():
    ''' returns tuple of temperature and humidity '''
    # return = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 2)
    metric = (11,14)
    metric = {
        "name": 'dht11',
        "measurement":[
            {
                "name":"humidity",
                "value":14
            },
            {
                "name":"temperature",
                "value":11
            }
        ]

    }
    return metric