import {Schema, model, connect} from "mongoose";

interface User {
    name : string,
    email : string,
    password : string
}

const schema = new Schema<User>({
    // String capital 'S'
    name : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true}
})

const UserModel = model<User>('User', schema)

// using 'new' keyword straight away is not recommended when creating new user
// instead we will use buildUser function

// new UserModel({
//     name : 'Sal',
//     email : 's@sa.com',
//     passord : '2345'
// })

const buildUser = (userAttributes : User) => {
    return new UserModel(userAttributes)
}

// buildUser function checks the properties, try to edit the property name and you will get error
buildUser({
    name : 's',
    email : 's@.com',
    password : 'sad'
})

export {UserModel, buildUser}