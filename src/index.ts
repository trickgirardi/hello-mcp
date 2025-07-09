import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

const server = new Server(
  {
    name: "hello-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_users",
        description: "Get a list of users",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return {
      users: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to fetch users",
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP iniciado!");
}

main().catch(console.error);
