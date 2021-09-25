import request from "supertest";
import { app } from "../../app";

it('returns 201 on successful signup', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : 'test@test.com',
            password : 'password'
        })
        .expect(201)
})

it('returns a 400 with an invalid input', async()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : 'test@testcom',
            password : 'password'
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : 'test@test.com',
            password : 'pa'
        })
        .expect(400)
})

it('disallows duplicate email', async()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : "test@test.com",
            password : "password"
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : "test@test.com",
            password : "password"
        })
        .expect(400)
})

it('sets a cookie after a successful signup', async()=> {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            name : "test",
            email : "test@test.com",
            password : "password"
        })
        .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined();
})