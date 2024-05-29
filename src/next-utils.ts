import next from 'next';

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  port: PORT,
});

/**
 * This handler id used to handle HTTP requests, making it easy to integrate the Next.js application with
 * a custom server or other server frameworks (e.g., Express.js).
 */
export const nextHandler = nextApp.getRequestHandler();
