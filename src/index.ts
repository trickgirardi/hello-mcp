#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpServer,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

