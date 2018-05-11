const sicknessEvent = {
  "Records": [{
    "dynamodb": {
      "NewImage" : {
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
            "S": "user12345"
        },
        "type": {
            "S": "absence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      }
    }
  }]
}

const vacationEvent = {
  "Records": [{
    "dynamodb": {
      "NewImage" : {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "8"
        },
        "reason": {
            "S": "vacation"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "absence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      }
    }
  }]
}

const newItemEvent = {
  "Records": [{
    "dynamodb": {
      "NewImage" : {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "9.5"
        },
        "total": {
            "N": "1.5"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "presence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      }
    }
  }]
}

const updatedPositivItemEvent = {
  "Records": [{
    "dynamodb": {
      "NewImage" : {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "8.5"
        },
        "total": {
            "N": "0.5"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "presence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      },

      "OldImage": {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "8.0"
        },
        "total": {
            "N": "0"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "presence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      },
    }
  }]
}

const updatedNegativItemEvent = {
  "Records": [{
    "dynamodb": {
      "NewImage" : {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "8.5"
        },
        "total": {
            "N": "0.5"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "presence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      },

      "OldImage": {
        "date": {
            "S": "Thu Feb 08 2018"
        },
        "duration": {
            "N": "9.5"
        },
        "total": {
            "N": "1.5"
        },
        "user_id": {
            "S": "user12345"
        },
        "type": {
            "S": "presence"
        },
        "timestamp": {
            "N": "1518116739735"
        }
      },
    }
  }]
}

const removeItemEvent = {
    "Records": [
        {
            "eventID": "eed91c8ac826dbe3f54f62744631b28b",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-central-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1525961280,
                "Keys": {
                    "user_id": {
                        "S": "user12345"
                    },
                    "timestamp": {
                        "N": "1525647600000"
                    }
                },
                "OldImage": {
                    "date": {
                        "S": "Mon May 07 2018"
                    },
                    "duration": {
                        "N": "8"
                    },
                    "user_id": {
                        "S": "user12345"
                    },
                    "start": {
                        "S": "08:00"
                    },
                    "end": {
                        "S": "16:30"
                    },
                    "type": {
                        "S": "presence"
                    },
                    "pause": {
                        "S": "00:30"
                    },
                    "timestamp": {
                        "N": "1525647600000"
                    }
                },
                "SequenceNumber": "3438000000000000759791105",
                "SizeBytes": 139,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
        }
    ]
}

const insertPresencePlusEvent = {
  "Records": [
      {
          "eventID": "a9111f10bf6e58f8df5408f776e04d1d",
          "eventName": "INSERT",
          "eventVersion": "1.1",
          "eventSource": "aws:dynamodb",
          "awsRegion": "eu-central-1",
          "dynamodb": {
              "ApproximateCreationDateTime": 1525940940,
              "Keys": {
                  "user_id": {
                      "S": "user12345"
                  },
                  "timestamp": {
                      "N": "1525940283315"
                  }
              },
              "NewImage": {
                  "date": {
                      "S": "Thu May 10 2018"
                  },
                  "duration": {
                      "N": "8.5"
                  },
                  "total": {
                      "N": "0.5"
                  },
                  "user_id": {
                      "S": "user12345"
                  },
                  "start": {
                      "S": "10:20"
                  },
                  "end": {
                      "S": "18:50"
                  },
                  "type": {
                      "S": "presence"
                  },
                  "pause": {
                      "S": "00:30"
                  },
                  "timestamp": {
                      "N": "1525940283315"
                  }
              },
              "SequenceNumber": "2688800000000000785431276",
              "SizeBytes": 143,
              "StreamViewType": "NEW_AND_OLD_IMAGES"
          },
          "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
      }
  ]
}

module.exports = {
  insertPresencePlusEvent: {
    "Records": [
        {
            "eventID": "a9111f10bf6e58f8df5408f776e04d1d",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-central-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1525940940,
                "Keys": {
                    "user_id": {
                        "S": "user12345"
                    },
                    "timestamp": {
                        "N": "1525940283315"
                    }
                },
                "NewImage": {
                    "date": {
                        "S": "Thu May 10 2018"
                    },
                    "duration": {
                        "N": "8.5"
                    },
                    "total": {
                        "N": "0.5"
                    },
                    "user_id": {
                        "S": "user12345"
                    },
                    "start": {
                        "S": "10:20"
                    },
                    "end": {
                        "S": "18:50"
                    },
                    "type": {
                        "S": "presence"
                    },
                    "pause": {
                        "S": "00:30"
                    },
                    "timestamp": {
                        "N": "1525940283315"
                    }
                },
                "SequenceNumber": "2688800000000000785431276",
                "SizeBytes": 143,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
        }
    ]
  },

  insertPresenceMinusEvent: {
    "Records": [
        {
            "eventID": "a9111f10bf6e58f8df5408f776e04d1d",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-central-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1525940940,
                "Keys": {
                    "user_id": {
                        "S": "user12345"
                    },
                    "timestamp": {
                        "N": "1525940283315"
                    }
                },
                "NewImage": {
                    "date": {
                        "S": "Thu May 10 2018"
                    },
                    "duration": {
                        "N": "7.5"
                    },
                    "total": {
                        "N": "-0.5"
                    },
                    "user_id": {
                        "S": "user12345"
                    },
                    "start": {
                        "S": "10:20"
                    },
                    "end": {
                        "S": "18:50"
                    },
                    "type": {
                        "S": "presence"
                    },
                    "pause": {
                        "S": "00:30"
                    },
                    "timestamp": {
                        "N": "1525940283315"
                    }
                },
                "SequenceNumber": "2688800000000000785431276",
                "SizeBytes": 143,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808"
        }
    ]
  },

  modifyPresencePlusEvent: {
      "Records": [
          {
              "eventName": "MODIFY",
              "dynamodb": {
                  "Keys": {
                      "user_id": {
                          "S": "user12345"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  },
                  "NewImage": {
                      "duration": {
                          "N": "8.5"
                      },
                      "total": {
                          "N": "0.5"
                      },
                      "user_id": {
                          "S": "user12345"
                      },
                      "type": {
                          "S": "presence"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  },
                  "OldImage": {
                      "duration": {
                          "N": "8"
                      },
                      "total": {
                          "N": "0"
                      },
                      "user_id": {
                          "S": "user12345"
                      },
                      "type": {
                          "S": "presence"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  }
              }
          }
      ]
  },

  modifyPresenceMinusEvent: {
      "Records": [
          {
              "eventName": "MODIFY",
              "dynamodb": {
                  "Keys": {
                      "user_id": {
                          "S": "user12345"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  },
                  "NewImage": {
                      "duration": {
                          "N": "8"
                      },
                      "total": {
                          "N": "0"
                      },
                      "user_id": {
                          "S": "user12345"
                      },
                      "type": {
                          "S": "presence"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  },
                  "OldImage": {
                      "duration": {
                          "N": "9"
                      },
                      "total": {
                          "N": "1"
                      },
                      "user_id": {
                          "S": "user12345"
                      },
                      "type": {
                          "S": "presence"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  }
              }
          }
      ]
  },

  removePresenceEvent: {
      "Records": [
          {
              "eventName": "REMOVE",
              "dynamodb": {
                  "Keys": {
                      "user_id": {
                          "S": "user12345"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  },
                  "OldImage": {
                      "date": {
                          "S": "Mon May 07 2018"
                      },
                      "duration": {
                          "N": "8.5"
                      },
                      "total": {
                          "N": "0.5"
                      },
                      "user_id": {
                          "S": "user12345"
                      },
                      "start": {
                          "S": "08:00"
                      },
                      "end": {
                          "S": "17:00"
                      },
                      "type": {
                          "S": "presence"
                      },
                      "pause": {
                          "S": "00:30"
                      },
                      "timestamp": {
                          "N": "1525647600000"
                      }
                  }
              }
          }
      ]
  }

}
