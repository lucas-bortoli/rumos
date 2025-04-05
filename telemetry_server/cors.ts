interface CorsOptions {
  origin?: string | string[];
  methods?: string;
  headers?: string;
  maxAge?: number;
  credentials?: boolean;
  exposeHeaders?: string[];
}

/**
 * Enable CORS headers on a Response object
 * @param response The Response object to modify
 * @param options CORS configuration options
 * @returns The modified Response with CORS headers
 */
export function enableCORS(response: Response, options: CorsOptions = {}): Response {
  const {
    origin = "*",
    methods = "GET, POST, OPTIONS",
    headers = "Content-Type, X-User-Id, Authorization",
    maxAge = 86400,
    credentials = false,
    exposeHeaders = [],
  } = options;

  // Set origin (handle array case)
  if (Array.isArray(origin)) {
    const requestOrigin = response.headers.get("Origin");
    if (requestOrigin && origin.includes(requestOrigin)) {
      response.headers.set("Access-Control-Allow-Origin", requestOrigin);
    }
  } else {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // Set other headers
  response.headers.set("Access-Control-Allow-Methods", methods);
  response.headers.set("Access-Control-Allow-Headers", headers);
  response.headers.set("Access-Control-Max-Age", maxAge.toString());

  if (credentials) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (exposeHeaders.length > 0) {
    response.headers.set("Access-Control-Expose-Headers", exposeHeaders.join(", "));
  }

  return response;
}

/**
 * Handle CORS preflight OPTIONS requests
 * @param options CORS configuration options
 * @returns A Response object for OPTIONS requests
 */
export function handleOptions(options: CorsOptions = {}): Response {
  const response = new Response(null, { status: 204 });
  return enableCORS(response, options);
}
