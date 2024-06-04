import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '.';

/**
 * The createTRPCReact function is used to create a tRPC client tailored for use in React components.
 * The AppRouter type is passed as a generic type parameter to createTRPCReact.
 * This ensures that the client knows the shape and types of our API, enabling type-safe API calls.
 */
export const trpc = createTRPCReact<AppRouter>({});
