import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
// 123 is clientid
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  //   in js, usually when addig option ,we pass object right away, but in nats, we chain them on
  const options = stan.subscriptionOptions().setManualAckMode(true);
  //   2nd arg is queuegroup name
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );
  subscription.on("message", (msg: Message) => {
    // console.log("Message received");
    // console.log(msg.getSubject());
    // console.log(msg.getSequence());
    // console.log(msg.getData());
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event ${msg.getSequence()}, with data: ${data}`);
    }

    // msg.ack();
  });
  setTimeout(() => {
    stan.close();
  }, 120000);
  //   setTimeout(() => {
  //     subscription.unsubscribe();
  //     subscription.on("unsubscribed", () => {
  //       stan.close();
  //     });
  //   }, 60000);
});

// watching for interrupt signal or terminate signal
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
