import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server(
  {
    name: "daath-mpc",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);
