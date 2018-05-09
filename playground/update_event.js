const event = [{
    "eventID": "3afa9501ff9efedfffc1d8782a086325",
    "eventName": "MODIFY",
    "eventVersion": "1.1",
    "eventSource": "aws:dynamodb",
    "awsRegion": "eu-central-1",
    "dynamodb": {
        "ApproximateCreationDateTime": 1525893420,
        "Keys": {
            "user_id": {
                "S": "github|611466"
            },
            "timestamp": {
                "N": "1514833539735"
            }
        },
        "NewImage": {
            "date": {
                "S": "Mon Jan 01 2018"
            },
            "duration": {
                "N": "8.5"
            },
            "user_id": {
                "S": "github|611466"
            },
            "start": {
                "S": "08:00"
            },
            "end": {
                "S": "18:00"
            },
            "type": {
                "S": "presence"
            },
            "pause": {
                "S": "00:30"
            },
            "timestamp": {
                "N": "1514833539735"
            }
        },
        "OldImage": {
            "date": {
                "S": "Mon Jan 01 2018"
            },
            "duration": {
                "N": "9.5"
            },
            "user_id": {
                "S": "github|611466"
            },
            "start": {
                "S": "08:00"
            },
            "end": {
                "S": "18:00"
            },
            "type": {
                "S": "presence"
            },
            "pause": {
                "S": "00:30"
            },
            "timestamp": {
                "N": "1514833539735"
            }
        },
        "SequenceNumber": "330700000000001400408572",
        "SizeBytes": 251,
        "StreamViewType": "NEW_AND_OLD_IMAGES"
    },
    "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
}]
