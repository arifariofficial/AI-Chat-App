const logger = {
  error: (message: string, error: Error) => {
    console.error(`${message}: ${error.message}`, error.stack);
  },
  info: (message: string) => {
    console.info(message);
  },
};

export default logger;
