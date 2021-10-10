import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

// Tell TS there is a global
// declare global {
//     namespace NodeJS {
//         interface Global {
//             // signin will return promise, which is cookie which has string[] data type
//             signin() : Promise<string>
//         }
//     }
// }

// New way
declare global {
  var signup: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfdadaf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const name = "test";
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      name,
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
