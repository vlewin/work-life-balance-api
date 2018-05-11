module.exports = {
  "type": "object",
  "properties": {
    "user_id": { "type": "string" },
    "timestamp": { "type": "number" },
    "date": { "type": "string" },
    "start": { "type": "string" },
    "pause": { "type": "string" },
    "end": { "type": "string" },
    "duration": { "type": "number" },
    "total": { "type": "number" },
    "reason": {
      "enum": [ "vacation","sickness", "holidy", "" ]
    },

    "type": {
      "enum": [ "absence","presence" ], "default": "presence"
    }
  },
  "required": [ "user_id", "timestamp", "start", "pause", "end" ]
}
