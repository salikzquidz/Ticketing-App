import {Schema, model, connect, Model} from "mongoose";

// An interface that describes the properties required to create a new User

interface UserAttrs {
    name : string,
    email : string,
    password : string
}

// An interface that describes the properties that a User Model has.
// To tell TS that there is build function available on the User Model.

interface UserModel extends Model<any>{
    build(attrs : UserAttrs) : any
}

const schema = new Schema<UserAttrs>({
    // String capital 'S'
    name : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true}
})

const User = model<any, UserModel>('User', schema)

// custom function into the model
// add static properties to remove buildUser(), and to avoid export 2 things (User and buildUser, but now only User)
// Define the static methods of our model, functions which can be called on the model itself
schema.statics.build = (userAttributes : UserAttrs) => {
    return new User(userAttributes)
}

User.build({
    name : 'sad',
    email : 's@s.com',
    password : 'sad'
})

export {User}