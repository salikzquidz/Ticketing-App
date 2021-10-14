import nats from "node-nats-streaming";

console.clear();
// abc is clientid
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: 123,
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });

  // setInterval(() => {
  //   console.log("...");
  // }, 10000);
});

const data = JSON.stringify({
  id: 123,
  title: "concert",
  price: 20,
});

stan.on("close", () => {
  console.log("Connection closed");
});
stan.on("error", (err) => {
  console.log("Error:", err);
});
