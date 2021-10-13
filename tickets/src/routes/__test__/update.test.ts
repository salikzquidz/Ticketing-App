import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns 404 if id not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "sad",
      price: 10,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "aslkdfj",
      price: 20,
    })
    .expect(401);
});

it("returns 401 if not the ticket owner", async () => {
  //   const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", global.signin())
    .send({
      title: "aslkdfj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "update",
      price: 21,
    })
    .expect(401);
});

it("returns 400 for invalid title or price", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "aslkdfj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 15,
    })
    .expect(400);
});

it("update ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "aslkdfj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "update",
      price: 15,
    })
    .expect(200);

  const ticket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticket.body.title).toEqual("update");
  expect(ticket.body.price).toEqual(15);
});
