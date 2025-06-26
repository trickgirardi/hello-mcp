import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";


class OKXServer {
  private server: Server;
  private axiosInstance;

  constructor() {
    console.log('Initialing OKXServer')

    this.server = new Server(
      {
        name: 'okx-mcp-server',
        version: '1.0.0',
        
      },
      {
        capabilities: {
          tools: {},
        }
      }
    );
    this.axiosInstance = axios.create({
      baseURL: 'https://api.okx.com',
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    this.setupToolHandlers()

    this.server.onerror = (error) => console.error("error", error);
    process.on('SIGINT', async () => {
      await this.server.close()
      process.exit(0)
    })
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get-price',
          description: 'Get the current price of a currency pair',
          inputSchema: {
            type: 'object',
            properties: {
              instrument: {
                type: 'string',
                description: 'The currency pair to get the price for',
              }
            },
            required: ['instrument']
          }
        },
        {
          name: 'get_candlesticks',
          description: 'Get the candlesticks for a currency pair',
          inputSchema: {
            type: 'object',
            properties: {
              instrument: {
                type: 'string',
                description: 'instrument id'
              },
              bar: {
                type: 'string',
                description: 'bar size',
              },
              limit: {
                type: 'number',
                description: 'limit',
                default: 100,
              }
            },
            required: ['instrument']
          }
        }
      ]
    }));
  }
}