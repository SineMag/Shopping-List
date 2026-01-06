import { IncomingMessage, ServerResponse } from "http";

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export const json = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

export const success = (res: ServerResponse, status: number, data: unknown) => {
  json(res, status, { success: true, data });
};

export const created = (res: ServerResponse, data: unknown) => {
  success(res, 201, data);
};

export const error = (
  res: ServerResponse,
  status: number,
  code: string,
  message: string,
  details?: unknown
) => {
  const body = {
    success: false as const,
    error: { code, message, ...(details !== undefined ? { details } : {}) },
  };
  json(res, status, body);
};

export const noContent = (res: ServerResponse) => {
  res.statusCode = 204;
  res.end();
};

export async function readJson<T = any>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {} as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error("INVALID_JSON");
  }
}
