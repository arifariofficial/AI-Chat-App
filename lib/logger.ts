// lib/logger.ts

const logger = {
  error: (message: string, error: any) => {
    console.error(message, error);
  },
  info: (message: string) => {
    console.info(message);
  },
};

export default logger;
