const HOST = process.env.HOST;

if (!HOST) throw new Error("HOST not defined in env.");

export { HOST };
