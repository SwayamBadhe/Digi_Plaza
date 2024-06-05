# Project Documentation

## Initial Setup

### Creating the Next.js App

1. **Initialize Next.js App:**

   ```bash
   npx create-next-app@latest

   ```

2. **Initialize ShadCN UI:**

   ```bash
   npx shadcn-ui@latest init

   ```

### Adding Components and Libraries

1. **Adding Lucide React Library:**

   ```bash
   yarn add lucide-react

   ```

2. **Adding Express:**

   ```bash
   yarn add express

   ```

3. **Adding TypeScript Definitions for Express:**

   ```bash
   yarn add -D @types/express

   ```

   TypeScript definitions are necessary for providing type information to TypeScript. This helps with type checking and autocompletion, making the development process smoother and reducing the chances of runtime errors.

4. **Adding Payload CMS:**

   ```bash
   yarn add payload

   ```

5. **Adding Cross-Env:**

   ```bash
   yarn add cross-env

   ```

6. **Adding Payload Rich Text Slate:**

   ```bash
   yarn add @payloadcms/richtext-slate

   ```

7. **Adding Payload Webpack Bundler:**

   ```bash
   yarn add @payloadcms/bundler-webpack

   ```

   Integrates Webpack as the bundler for Payload CMS, allowing for custom build configurations.

8. **Adding Payload MongoDB Adapter:**

   ```bash
   yarn add @payloadcms/db-mongodb

   ```

Enables MongoDB as the database adapter for Payload CMS.

- Importing MongoDB Adapter:

  ```bash
  import { mongooseAdapter } from '@payloadcms/db-mongodb';

  ```

9. **Adding React Hook Form:**

   ```bash
   yarn add react-hook-form

   ```

   Provides a flexible and easy-to-use library for handling forms in React applications.

10. **Adding Hookform Resolvers:**

```bash
yarn add @hookform/resolvers

```

Allows integration of validation libraries with React Hook Form, such as Zod or Yup.

11. **Adding Zod:**

```bash
yarn add zod

```

A TypeScript-first schema declaration and validation library, useful for form validation.

12. **Adding Sonner:**

```bash
yarn add sonner

```

A library for managing notifications and alerts in React applications.

13. **Adding tRPC Server:**

```bash
yarn add @trpc/server

```

Enables the creation of end-to-end type-safe APIs in TypeScript.

14. **Adding tRPC Client::**

```bash
yarn add @trpc/client

```

Provides a client to consume tRPC APIs, ensuring type safety across the client and server.

15. **Adding tRPC Next.js Integration:**

```bash
yarn add @trpc/next

```

Integrates tRPC with Next.js, allowing for type-safe API routes and server-side rendering.

16. **Adding tRPC React Query Integration:**

```bash
yarn add @trpc/react-query

```

Combines tRPC with React Query to manage server state and API requests in a type-safe manner.

17. **Adding React Query:**

```bash
yarn add @tanstack/react-query@4.36.1

```

Provides powerful tools for fetching, caching, and updating asynchronous data in React applications.

## Setting Up Payload CMS

1. **Initialize and Configure Payload CMS:**

`get-payload.ts` sets up environment variables, initializes a global cache for Payload CMS, and defines a function to get the Payload client, ensuring it's only initialized once and reusing the instance for subsequent calls.

2. **Integrating Payload CMS with Express:**
   Used getPayloadClient function to initialize the Payload client with options including Express middleware and an initialization callback to log the admin URL.

3. **Building payload.config.ts:**
   This configuration file defines the settings for Payload CMS, including the server URL, collections, admin panel settings, rate limiting, rich text editor, database adapter, and TypeScript options. It uses the Webpack bundler, MongoDB adapter, and Slate editor.

4. **Creating nodemon.json:**
   This file configures Nodemon to watch specified files and directories for changes, and restart the server automatically when changes are detected.

   ```bash
   {
   "watch": ["server.ts", "src/collections/**/*.ts", "src/trpc/index.ts"],
   "exec": "ts-node --project tsconfig.server.json src/server.ts -- -I",
   "ext": "js ts",
   "stdin": false
   }
   ```

5. **Creating tsconfig.server.json:**
   This TypeScript configuration file extends the main tsconfig.json and sets specific compiler options for the server-side code, ensuring compatibility with CommonJS modules and proper output directory settings.

   - module: "CommonJS" - Specifies the module code generation for Node.js compatibility
   - outDir: "dist" - Defines the output directory for compiled files.

   ```bash
   {
   "extends": "./tsconfig.json",
   "compilerOptions": {
    "module": "CommonJS",
    "outDir": "dist",
    "noEmit": false,
    "jsx": "react"
   },
   "include": ["src/server.ts", "src/payload.config.ts"]
   }
   ```

## Next.js

1. **Setting Up Next.js Server:**

   - Created next-utils.ts to configure Next.js server and request handler.
   - In server.ts, used Express middleware to route HTTP requests through the Next.js request handler

     ```bash
     app.use((req, res) => nextHandler(req, res));

     ```

2. **Creating Project Structure:**

   - Created the following folder and file structure:

     ```
     app/
       auth/
         sign-up/
           page.tsx
     ```

   - **Explanation:**
     - **app/**: The root folder for the Next.js application.
     - **auth/**: A sub-folder for authentication-related pages.
     - **sign-up/**: A nested folder specifically for the sign-up page.
     - **page.tsx**: The actual React component file for the sign-up page.

   This structure follows the recommended convention in Next.js for organizing routes and components. It helps maintain a clean and organized codebase, making it easier to manage different parts of the application and follow the Next.js file-based routing system. By placing the sign-up logic within its dedicated folder, it ensures that all related components, styles, and utilities for the sign-up feature are encapsulated within a single directory, promoting modularity and ease of maintenance.

3. **Creating and Processing Forms with React Hook Form:**

Created src/lib/validator/account-credentials.ts to define and export the validation schema using Zod

     ```bash
     import { z } from 'zod';

      export const AuthCredentialsValidator = z.object({
      email: z.string().email(),
      password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
      }),
      });

      export type TAuthCredentialsValidator = z.infer<
      typeof AuthCredentialsValidator

      > ;

     ```

Explanation:

- The AuthCredentialsValidator schema uses Zod to validate email and password fields.
- The email field must be a string and a valid email address.
- The password field must be a string and at least 8 characters long, with a custom error message if the requirement is not met.
- The TAuthCredentialsValidator type infers the TypeScript type from the validation schema.

## tRPC

tRPC (TypeScript Remote Procedure Call) is a framework designed to simplify the process of building type-safe APIs in TypeScript. It allows developers to define their API endpoints and the types they use on the server, and automatically provides the corresponding types on the client side. This means that the types are shared between the server and client, ensuring consistency and reducing the likelihood of errors.

1. **Creating a Providers Component**
   The Providers component was created to wrap the application with necessary providers, specifically the QueryClientProvider from @tanstack/react-query and the trpc.Provider. This component initializes the TRPC client using httpBatchLink, which enables batching of HTTP requests to optimize network performance. The httpBatchLink is configured with the API URL and includes credentials in each fetch request to handle authentication.

2. **Setting Up the TRPC Client**
   A TRPC client instance was created using createTRPCReact from @trpc/react-query. This client is typed with AppRouter, ensuring type safety across the application. This setup allows the application to use TRPC hooks to interact with the backend procedures.

3. **Defining the TRPC Router and Procedures**
   The TRPC router and procedures were defined in two files. The appRouter in src/trpc/index.ts defines the API routes and procedures available to the frontend. In src/trpc/trpc.ts, the TRPC instance is initialized, and a public procedure is defined. This setup establishes the core API routes and procedures that the frontend can interact with.

4. **Integrating Providers into the Application**
   The Providers component created in Step 1 was integrated into the main layout of the Next.js application. This ensures that the entire application can use the TRPC and React Query clients, enabling type-safe API calls and state management across the application.

5. **Configuring the Express Server with TRPC**
   The Express server was configured to use TRPC middleware. The server initializes the TRPC client and integrates it with the Express app using trpcExpress.createExpressMiddleware. This middleware handles incoming requests to the /api/trpc endpoint, routing them to the appropriate TRPC procedures defined in the appRouter.

6. **Setting Up API Routes in Next.js**
   The API route for TRPC was set up in src/api/trpc/[trpc]/route.ts. This configuration uses the fetchRequestHandler from @trpc/server/adapters/fetch to handle HTTP requests. The handler processes requests to the api/trpc endpoint, delegating them to the TRPC procedures defined in the appRouter. Both GET and POST requests are supported, enabling flexible interaction with the API from the client side.

### Notes

4. **Using React Hook Form in a Component:**

   ```bash
   const {
   register,
   handleSubmit,
   formState: { errors },
   } = useForm<TAuthCredentialsValidator>({
   resolver: zodResolver(AuthCredentialsValidator),
   });


   const onSubmit = (data: TAuthCredentialsValidator) => {
   console.log(data);
   };

   return (

   <form onSubmit={handleSubmit(onSubmit)}>
      <Input
         {...register('email')}
         className={cn({
         'focus-visible: ring-red-500': errors.email,
         })}
         placeholder="you@example.com"
      />
   </form>
   );

   ```

Explanation:

- useForm<TAuthCredentialsValidator> initializes the form with the Zod schema as the resolver.
- register is used to register form fields and apply validation.
- handleSubmit is a handler for form submission that validates the form and calls onSubmit if validation passes.
- formState: { errors } provides access to form validation errors.
- The <form> element uses handleSubmit to process the form on submit.
- The Input component is registered with the email field, and validation errors are displayed conditionally.

**Server and Client Components in Next.js:**

By default, components in Next.js are server components. To handle client-side rendering, add "use client" at the beginning of the file.

```bash
"use client";

```
