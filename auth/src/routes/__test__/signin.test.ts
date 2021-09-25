import request from "supertest";
import { app } from "../../app";

it('fails when email does not exist supplied', async()=> {
    await request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : "password"
        })
        .expect(400)
})
it('fails when incorrect password supplied', async()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : "test@test.com",
            password : "password"
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : "password123"
        })
        .expect(400)
})
it('response with a cookie for valid credentials', async()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : "test@test.com",
            password : "password"
        })
        .expect(201)
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : "password"
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined();
})