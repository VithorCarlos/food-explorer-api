import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify-jwt";
import { uploadAttachment } from "../controllers/upload/upload-attachment";

export const uploadRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        description: "Upload Attachment",
        tags: ["Upload"],
        summary: "Upload Attachment",
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            file: {
              isFile: true,
            },
          },
          required: ["file"],
        },
      },
      validatorCompiler: () => () => true,
      preHandler: [verifyJWT],
    },

    uploadAttachment
  );
};
