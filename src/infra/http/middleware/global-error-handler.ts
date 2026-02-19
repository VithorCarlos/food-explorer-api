import { env } from "@/env";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function globalErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    reply.status(400).send({
      statusCode: 400,
      error: "Validation Error",
      message: "Some fields are invalid",
      details: formattedErrors,
    });
  }

  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      error: "Validation Error",
      message: "Invalid request parameters",
      details: error.validation.map((err) => ({
        field: err.instancePath.replace("/", ""),
        message: err.message,
        ...(err.params && { params: err.params }),
      })),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  });
}
