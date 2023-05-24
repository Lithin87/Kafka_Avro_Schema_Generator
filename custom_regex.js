const regex_types = {};

regex_types.int_range_1_100 = {
    "type": "int",
    "arg.properties": {
        "range": {
            "min": 1,
            "max": 100
        }
    }
}
regex_types.int_iteration_1000 = {
    "type": "int",
    "arg.properties": {
        "iteration": {
            "start": 1000,
            "step": 1
        }
    }
}
regex_types.int_range_10000_200000 = {
    "type": "int",
    "arg.properties": {
        "range": {
            "min": 10000,
            "max": 200000
        }
    }
}
regex_types.date_time_millis = {
    "type": "long",
    "logicalType": "timestamp-millis",
    "arg.properties": {
        "iteration": {
            "start": 1609459200000,
            "step": 100000
        }
    }
}
regex_types.string_options_status = {
    "type": "string",
    "arg.properties": {
        "options": [
            "accepted",
            "failure",
            "pending",
            "rejected",
            "confirmed",
            "unauthorized",
            "approved"
        ]
    }
}
regex_types.string_user_1_10 = {
    "type": "string",
    "arg.properties": {
        "regex": "User_[1-9]{0,1}"
    }
}

regex_types.float_1_10 = {
    "type":"float",
    "arg.properties":{
       "range":{
          "min":0.1,
          "max":10.0
       }
    }
 }

 regex_types.double_100000000 = {
    "type":"float",
    "arg.properties":{
       "range":{
          "min":2000000000000.1000,
          "max":4000000000000.1000,
       }
    }
 }
export default regex_types;