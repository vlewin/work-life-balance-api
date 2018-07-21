module.exports = {
  insertPresencePlusEvent: {
    'Records': [
      {
        'eventID': 'a9111f10bf6e58f8df5408f776e04d1d',
        'eventName': 'INSERT',
        'eventVersion': '1.1',
        'eventSource': 'aws:dynamodb',
        'awsRegion': 'eu-central-1',
        'dynamodb': {
          'ApproximateCreationDateTime': 1525940940,
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1525940283315'
            }
          },
          'NewImage': {
            'date': {
              'S': 'Thu May 10 2018'
            },
            'duration': {
              'N': '8.5'
            },
            'total': {
              'N': '0.5'
            },
            'user_id': {
              'S': 'user12345'
            },
            'start': {
              'S': '10:20'
            },
            'end': {
              'S': '18:50'
            },
            'type': {
              'S': 'presence'
            },
            'pause': {
              'S': '00:30'
            },
            'timestamp': {
              'N': '1525940283315'
            }
          },
          'SequenceNumber': '2688800000000000785431276',
          'SizeBytes': 143,
          'StreamViewType': 'NEW_AND_OLD_IMAGES'
        },
        'eventSourceARN': 'arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808'
      }
    ]
  },

  insertPresenceMinusEvent: {
    'Records': [
      {
        'eventID': 'a9111f10bf6e58f8df5408f776e04d1d',
        'eventName': 'INSERT',
        'eventVersion': '1.1',
        'eventSource': 'aws:dynamodb',
        'awsRegion': 'eu-central-1',
        'dynamodb': {
          'ApproximateCreationDateTime': 1525940940,
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1525940283315'
            }
          },
          'NewImage': {
            'date': {
              'S': 'Thu May 10 2018'
            },
            'duration': {
              'N': '7.5'
            },
            'total': {
              'N': '-0.5'
            },
            'user_id': {
              'S': 'user12345'
            },
            'start': {
              'S': '10:20'
            },
            'end': {
              'S': '18:50'
            },
            'type': {
              'S': 'presence'
            },
            'pause': {
              'S': '00:30'
            },
            'timestamp': {
              'N': '1525940283315'
            }
          },
          'SequenceNumber': '2688800000000000785431276',
          'SizeBytes': 143,
          'StreamViewType': 'NEW_AND_OLD_IMAGES'
        },
        'eventSourceARN': 'arn:aws:dynamodb:eu-central-1:435287293695:table/records-development/stream/2018-05-09T19:03:47.808'
      }
    ]
  },

  modifyPresencePlusEvent: {
    'Records': [
      {
        'eventName': 'MODIFY',
        'dynamodb': {
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          },
          'NewImage': {
            'duration': {
              'N': '8.5'
            },
            'total': {
              'N': '0.5'
            },
            'user_id': {
              'S': 'user12345'
            },
            'type': {
              'S': 'presence'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          },
          'OldImage': {
            'duration': {
              'N': '8'
            },
            'total': {
              'N': '0'
            },
            'user_id': {
              'S': 'user12345'
            },
            'type': {
              'S': 'presence'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          }
        }
      }
    ]
  },

  modifyPresenceMinusEvent: {
    'Records': [
      {
        'eventName': 'MODIFY',
        'dynamodb': {
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          },
          'NewImage': {
            'duration': {
              'N': '8'
            },
            'total': {
              'N': '0'
            },
            'user_id': {
              'S': 'user12345'
            },
            'type': {
              'S': 'presence'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          },
          'OldImage': {
            'duration': {
              'N': '9'
            },
            'total': {
              'N': '1'
            },
            'user_id': {
              'S': 'user12345'
            },
            'type': {
              'S': 'presence'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          }
        }
      }
    ]
  },

  removePresenceEvent: {
    'Records': [
      {
        'eventName': 'REMOVE',
        'dynamodb': {
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          },
          'OldImage': {
            'date': {
              'S': 'Mon May 07 2018'
            },
            'duration': {
              'N': '8.5'
            },
            'total': {
              'N': '0.5'
            },
            'user_id': {
              'S': 'user12345'
            },
            'start': {
              'S': '08:00'
            },
            'end': {
              'S': '17:00'
            },
            'type': {
              'S': 'presence'
            },
            'pause': {
              'S': '00:30'
            },
            'timestamp': {
              'N': '1525647600000'
            }
          }
        }
      }
    ]
  },

  inserAbsenceVacationEvent: {
    'Records': [{
      'eventName': 'INSERT',
      'dynamodb': {
        'Keys': {
          'user_id': {
            'S': 'user12345'
          },
          'timestamp': {
            'N': '1525989600000'
          }
        },
        'NewImage': {
          'date': {
            'S': 'Fri May 11 2018'
          },
          'reason': {
            'S': 'vacation'
          },
          'user_id': {
            'S': 'user12345'
          },
          'type': {
            'S': 'absence'
          },
          'timestamp': {
            'N': '1525989600000'
          }
        }
      }
    }]
  },

  inserAbsenceSicknessEvent: {
    'Records': [{
      'eventName': 'INSERT',
      'dynamodb': {
        'Keys': {
          'user_id': {
            'S': 'user12345'
          },
          'timestamp': {
            'N': '1525989600000'
          }
        },
        'NewImage': {
          'date': {
            'S': 'Fri May 11 2018'
          },
          'reason': {
            'S': 'sickness'
          },
          'user_id': {
            'S': 'user12345'
          },
          'type': {
            'S': 'absence'
          },
          'timestamp': {
            'N': '1525989600000'
          }
        }
      }
    }]
  },

  removeAbsenceVacationEvent: {
    'Records': [
      {
        'eventName': 'REMOVE',
        'dynamodb': {
          'Keys': {
            'user_id': {
              'S': 'user12345'
            },
            'timestamp': {
              'N': '1528840800000'
            }
          },
          'OldImage': {
            'date': {
              'S': 'Wed Jun 13 2018'
            },
            'reason': {
              'S': 'vacation'
            },
            'user_id': {
              'S': 'auth0|5b0fd1cb21652a131b051f7a'
            },
            'type': {
              'S': 'absence'
            },
            'timestamp': {
              'N': '1528840800000'
            }
          }
        }
      }
    ]
  }
}
