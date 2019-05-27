import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { 
    require: true, 
    unique: true, 
    type: String 
  },
  password: {
    require: true, 
    type: String 
  },
  salt: { 
    require: true, 
    type: String 
  }
  // instagramAccounts: [{
  //   user: String,
  //   pass: String,
  //   session: {
  //     cookie: String,
  //     createdAt: String
  //   }
  // }]
}, { 
  collection: 'User',
  timestamps: true 
});

// export const UserSchema = new mongoose.Schema({
//   username: { unique: true, type: String },
//   password: String,
//   salt: String,
//   session: {
//     cookie: String,
//     createdAt: String
//   },
//   settings: {
//     timeToUnfollow: { type: Number, default: 24 },
//     limitFollowing: { type: Number, default: 1080 }
//   },
//   numFollows: { type: Number, default: 0 },
//   numLikes: { type: Number, default: 0 },
//   numFollowers: { type: Number, default: 0 }
// }, { 
//   collection: 'User',
//   timestamps: true 
// });