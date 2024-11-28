# Food Explorer API
Complete digital menu being developed in React.js with Next.js, and Node.js with Prisma and Nest.js. The system features JWT-based login authentication with Cookie, user registration, and access authorization.

The food explorer will have two personas: the admin and the user;

The admin is the person responsible for the restaurant, therefore, they can create, view, edit, and delete a dish at any time. Each dish must contain an image, a name, a category, a brief description, the ingredients, and its price. When clicking to add a dish, the admin will receive a success message and be redirected to the main page;

The user will view all registered dishes and, when clicking on a dish, will be redirected to a new screen with more detailed information about it.

# Functional Requirements
[✔️] It should be possible to save meals as favorites.

[✔️] It should be possible to create a new meal (admin).

[✔️] It should be possible to create a new regular user account.

[✔️] It should be possible to list the details of a meal.

[✔️] It should be possible to list all available meals.

[] It should be possible to upload an image to AWS.

[✔️] It should be possible to edit a meal (admin).

[✔️] It should be possible to authenticate.

[✔️] It should be possible to retrieve the logged-in user.

# Business Rules
[✔️] A user cannot register with an existing email.

[✔️] The admin cannot register a meal that already exists.

[✔️] Meals can only be registered by an administrator.

[✔️] A user cannot edit a meal.

[✔️] A user can only order up to 20 items of the same meal at a time.

# Non-Functional Requirements
[✔️] Passwords must be encrypted.

[✔️] Application data must be persisted in a PostgreSQL database.

[✔️] All meals must be paginated with 20 items per page.

[✔️] Users must be identified with a JWT token.

[✔️] A refresh token must be used, and a new token must be generated every 20 minutes.
