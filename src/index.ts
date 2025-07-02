import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

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

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "",
        name: "All phrases",
        description: "All phrases",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const frases = await daathAPI.getAllPhrases();
  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify(frases),
      },
    ],
  };
});

server.setRequestHandler(ListToolsRequestSchama, async () => {
  return {
    tools: [
      {
        name: "search-contextual-phrase",
        description: "Search for a phrase in the context of user prompt",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The query to search for",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "search-contextual-phrase") {
    const { query } = request.params.arguments;
    const phrase = await daathAPI.searchContextualPhrase(query);

    return {
      content: [
        {
          type: "text",
          text: `${phrase.text} - ${phrase.author}`,
        },
      ],
    };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
