-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "PRODUCT_CATEGORIES" AS ENUM ('SWEETS_AND_CAKES', 'ARABIC', 'ACAI', 'BRAZILIAN', 'CHINESE', 'SAVORY_SNACKS', 'ICE_CREAM', 'PIZZA', 'PASTRY', 'ITALIAN', 'APPETIZERS', 'BAKERIES', 'HEALTHY', 'SNACKS', 'MEAL_BOX', 'GOURMET', 'VEGETARIAN', 'JAPANESE', 'MEATS', 'DRINKS');

-- CreateEnum
CREATE TYPE "ATTACHMENT_STATUS" AS ENUM ('PENDING', 'LINKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('DRAFT', 'PENDING', 'PAID', 'PREPARING', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REFUSED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PRODUCT_STATUS" AS ENUM ('ACTIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "RESOURSE_TYPE" AS ENUM ('USER', 'PRODUCT');

-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('PIX', 'CREDIT_CARD', 'DEBIT_CARD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'CLIENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "deletionRequestedAt" TIMESTAMP(3),
    "hardDeleteScheduledAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "PRODUCT_CATEGORIES" NOT NULL,
    "ingredients" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "status" "PRODUCT_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'DRAFT',
    "total_amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "gateway_payment_id" TEXT,
    "method" "PAYMENT_METHOD" NOT NULL,
    "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(10,2) NOT NULL,
    "gateway" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transactions" (
    "id" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "gateway_transaction_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING',
    "response_payload" JSONB NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "status" "ATTACHMENT_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment_link" (
    "id" TEXT NOT NULL,
    "attachment_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "resource_type" "RESOURSE_TYPE" NOT NULL,
    "linked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachment_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "payments_gateway_payment_id_key" ON "payments"("gateway_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_gateway_transaction_id_key" ON "payment_transactions"("gateway_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_product_id_key" ON "favorites"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "idx_resource" ON "attachment_link"("resource_id", "resource_type");

-- CreateIndex
CREATE UNIQUE INDEX "attachment_link_attachment_id_resource_id_resource_type_key" ON "attachment_link"("attachment_id", "resource_id", "resource_type");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment_link" ADD CONSTRAINT "attachment_link_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
