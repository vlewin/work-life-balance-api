module.exports = {
  "type": "object",
  "properties": {
    "user_id": { "type": "string" },
    "timestamp": { "type": "number" },
    // "date": { "type": "string", format: 'date-time' },
    "date": { "type": "string" },
    "duration": { "type": "number" },
    "reason": {
      "enum": [ "vacation","sickness", "holidy", "" ]
    },

    "type": {
      "enum": [ "absence","presence" ], "default": "presence"
    }
  },
  "required": [ "user_id", "timestamp", "type", "reason" ]
}
