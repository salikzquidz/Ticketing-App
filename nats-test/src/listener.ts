import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
// 123 is clientid
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  //   2nd arg is queuegroup name
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group"
  );
  subscription.on("message", (msg: Message) => {
    console.log("Message received");
    console.log(msg.getSubject());
    console.log(msg.getSequence());
    console.log(msg.getData());
    const data = msg.getData();
    // if(typeof data  string){}
  });
});
