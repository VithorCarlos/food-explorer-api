-- This is an empty migration.-- Create partial unique index to ensure only one main image per product

CREATE UNIQUE INDEX "unique_main_image_per_product"
ON "product_attachments" ("product_id")
WHERE "is_main" = true;
