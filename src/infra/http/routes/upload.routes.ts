import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify-jwt";
import { uploadAttachmentController } from "../controllers/upload/upload-attachment.controller";

export const uploadRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "",
    {
      schema: {
        description: "Upload Attachment",
        tags: ["Upload"],
        summary: "Upload Attachment",
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            file: {
              type: "file",
              description: "file to upload",
            },
          },
          required: ["file"],
        },
      },
      validatorCompiler: () => () => true,
      preHandler: [verifyJWT],
    },

    uploadAttachmentController,
  );
};
