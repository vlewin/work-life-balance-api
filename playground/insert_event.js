const event = [{
    "eventID": "e92c69ec987d932a59c376f0b6e428f9",
    "eventName": "INSERT",
    "eventVersion": "1.1",
    "eventSource": "aws:dynamodb",
    "awsRegion": "eu-central-1",
    "dynamodb": {
        "ApproximateCreationDateTime": 1525893720,
        "Keys": {
            "user_id": {
                "S": "github|611466"
            },
            "timestamp": {
                "N": "1518116739735"
            }
        },
        "NewImage": {
            "date": {
                "S": "Thu Feb 08 2018"
            },
            "duration": {
                "N": "8"
            },
            "reason": {
                "S": "sickness"
            },
            "user_id": {
                "S": "github|611466"
            },
            "type": {
                "S": "absence"
            },
            "timestamp": {
                "N": "1518116739735"
            }
        },
        "SequenceNumber": "330900000000001400412500",
        "SizeBytes": 128,
        "StreamViewType": "NEW_AND_OLD_IMAGES"
    },
    "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
}]
