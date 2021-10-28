export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }
  try {
    const swcs = require("../../export/swc-definition.json");
    res.status(200).json(swcs);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("SWCs not found");
  }
}
