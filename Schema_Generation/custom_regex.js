const regex_types = {
    int_range_1_100: { 
        "type": "int",
        "arg.properties": {
            "range": {
                "min": 1,
                "max": 100
            }
        }
    }  ,
    int_iteration_1000_1: {
        "type": "int",
        "arg.properties": {
            "iteration": {
                "start": 1000,
                "step": 1
            }
        }
    },
    int_range_10000_200000:  {
        "type": "int",
        "arg.properties": {
            "range": {
                "min": 10000,
                "max": 200000
            }
        }
    },
    int_date_18000_19000:  {
        "type": "int",
        "logicalType": "date",
        "arg.properties": {
            "range": {
                "min": 18000,
                "max": 19000
            }
        }
    },
    string_options_accepted:  {
        "type": "string",
        "arg.properties": {
            "options": [
                "accepted"
            ]
        }
    },
    string_regex_user_1_10:  {
        "type": "string",
        "arg.properties": {
            "regex": "User_[1-9]{0,1}"
        }
}
}


export default regex_types;