import nats, { Message, Stan } from "node-nats-streaming";
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
  const options = stan
    .subscriptionOptions()
    .setAckWait(1000)
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounting-service");
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

  // setInterval(() => {
  //   console.log("...");
  // }, 10000);
});

// watching for interrupt signal or terminate signal
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait: number = 5000; // 5second
  abstract onMessage(data: any, msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setAckWait(this.ackWait)
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName); // make it same with queue group name
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on("message", (msg: Message) => {
      console.log(
        `Message received: ${this.subject} ,  ${this.queueGroupName}`
      );
      const parsedData = this.parseMessage(msg);
      // on message
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8")); // for buffer
  }
}
