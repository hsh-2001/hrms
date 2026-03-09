import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const createLogStream = () => {
  const date = new Date().toISOString().split("T")[0];
  const logPath = path.join(process.cwd(), "logs");

  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  return fs.createWriteStream(
    path.join(logPath, `access-${date}.log`),
    { flags: "a" }
  );
};

const captureResponseBody = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    res.responseBody = body;
    return originalSend.call(this, body);
  };
  next();
};

const registerCustomTokens = () => {
  morgan.token('req-body', (req) => {
    if (req.body && Object.keys(req.body).length > 0) {
      const sanitized = { ...req.body };
      if (sanitized.password) sanitized.password = '[REDACTED]';
      return JSON.stringify(sanitized);
    }
    return '-';
  });

  morgan.token('res-body', (req, res) => {
    if (res.responseBody) {
      try {
        const body = typeof res.responseBody === 'string' 
          ? res.responseBody 
          : JSON.stringify(res.responseBody);
        return body;
      } catch {
        return '-';
      }
    }
    return '-';
  });
};

const morganFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    '| Payload:', tokens['req-body'](req, res),
    '| Response:', tokens['res-body'](req, res)
  ].join(' ');
};

export const setupLogger = (app) => {
  const logStream = createLogStream();
  
  app.use(captureResponseBody);
  
  registerCustomTokens();
  
  app.use(morgan(morganFormat, { stream: logStream }));
};

export default { setupLogger };
