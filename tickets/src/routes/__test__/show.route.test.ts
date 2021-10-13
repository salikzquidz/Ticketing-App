import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
it("returns 404 if ticket not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Konsert Hujan",
      price: "15.00",
    })
    .expect(201);

  const ticketresponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketresponse.body.title).toEqual("Konsert Hujan");
});
