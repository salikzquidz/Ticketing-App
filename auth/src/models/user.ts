import {Schema, model, connect, Model, Document} from "mongoose";
import {Password} from '../security/password'

// An interface that describes the properties required to create a new User

interface UserAttrs {
    name : string,
    email : string,
    password : string
}

// An interface that describes the properties that a User Model has.
// To tell TS that there is build function available on the User Model.

interface UserModel extends Model<UserDoc>{
    build(attrs : UserAttrs) : UserDoc
}

// Interface that describes the property that a User Document has

interface UserDoc extends Document {
    name : string;
    email : string;
    password : string;
}

const schema = new Schema<UserAttrs>({
    // String capital 'S'
    name : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true}
})


// 'Pre' in mongoose to hash password before save into db
schema.pre('save', async function(done) {
    // If the password is modified
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed);
    }

    done();
})

// custom function into the model
// add static properties to remove buildUser(), and to avoid export 2 things (User and buildUser, but now only User)
// Define the static methods of our model, functions which can be called on the model itself
schema.statics.build = (userAttributes : UserAttrs) => {
    return new User(userAttributes)
}

const User = model<UserDoc, UserModel>('User', schema)

// const userA = User.build({
//     name : 'sad',
//     email : 's@s.com',
//     password : 'sad'
// })

export {User}