const { Schema, model } = require('mongoose');

// schema user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    
    // regex to validate email convention
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
userSchema.virtual('friendCount').get(function(){
  return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;