import request from 'supertest';
import { app } from '../../app';

it('response with details of the current user', async()=> {
    const cookie = await global.signup()
    // const authResponse = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         name : "test",
    //         email : "test@test.com",
    //         password : "password"
    //     })
    //     .expect(201)
    // const cookie = authResponse.get('Set-Cookie')
    console.log(cookie)
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    console.log(response.body)

    expect(response.body.currentUser.email).toEqual('test@test.com')
})