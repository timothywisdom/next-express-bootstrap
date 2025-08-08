import swaggerJsdoc from "swagger-jsdoc";

const setupSwagger = (apiPort: string | 3001) => {
  // Swagger configuration
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next.js Express API",
        version: "1.0.0",
        description: "A simple Express API with Next.js frontend",
        contact: {
          name: "API Support",
          email: "support@example.com",
        },
        servers: [
          {
            url: `http://localhost:${apiPort}`,
            description: "Development server",
          },
        ],
      },
      components: {
        schemas: {
          HelloResponse: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Hello World",
              },
            },
          },
          EchoRequest: {
            type: "object",
            required: ["text"],
            properties: {
              text: {
                type: "string",
                description: "Text to echo back",
                example: "Hello from API",
              },
            },
          },
          EchoResponse: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Hello from API",
              },
            },
          },
          ErrorResponse: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Text is required",
              },
            },
          },
        },
      },
    },
    apis: ["./src/api/server.ts"], // Path to the API docs
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  return swaggerSpec;
};

export default setupSwagger;
