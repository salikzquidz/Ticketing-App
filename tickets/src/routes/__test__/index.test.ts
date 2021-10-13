import request from "supertest";
import { app } from "../../app";
import { Request, Response } from "express";

const createTicket = async (title: string, price: number) => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: title,
    price: price,
  });
};

it("can fetch a list of tickets", async () => {
  await createTicket("AX7", 100);
  await createTicket("Hujan", 15);
  await createTicket("Nirvana", 55);

  const response = await request(app).get("/api/tickets").send().expect(200);
  //   console.log(response);
  expect(response.body.length).toEqual(3);
});
