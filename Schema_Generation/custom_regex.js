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
regex_types.int_iteration_1000_1 = {
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
regex_types.int_date_18000_19000 = {
    "type": "int",
    "logicalType": "date",
    "arg.properties": {
        "range": {
            "min": 18000,
            "max": 19000
        }
    }
}
regex_types.string_options_accepted = {
    "type": "string",
    "arg.properties": {
        "options": [
            "accepted"
        ]
    }
}
regex_types.string_regex_user_1_10 = {
    "type": "string",
    "arg.properties": {
        "regex": "User_[1-9]{0,1}"
    }
}


export default regex_types;