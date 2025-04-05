import chalk, { type ChalkInstance } from "chalk";
import * as path from "node:path";
import { isatty } from "node:tty";
import util from "node:util";

export class Logger {
  tag: string;
  enabled: boolean;
  sink: NodeJS.WriteStream;

  constructor(tag: string, sink: NodeJS.WriteStream = process.stderr) {
    this.tag = tag;
    this.sink = sink;
    this.enabled = true;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    return this;
  }

  #getCallerInfo(): string | null {
    const stack = new Error().stack ?? "";
    const stackLines = stack.split("\n");
    const callerLine = stackLines[4]?.trim();
    const match = callerLine?.match(/at ([#a-zA-Z0-9_\- <>]+) \((.*?):(\d+):\d+\)/);

    if (match) {
      const functionName = match[1];
      const file = match[2];
      const line = parseInt(match[3]!, 10);
      const fileRelative = path.relative(process.cwd(), file!);
      return `${functionName} ${fileRelative}:${line}`;
    }

    // Fallback in case the format doesn't match
    return null;
  }

  #objectInspect(object: unknown): string {
    if (typeof object === "string") return object;

    const hasColor = isatty(process.stderr.fd);
    return util.inspect(object, false, null, hasColor);
  }

  #print(severity: "debug" | "info" | "warn" | "error", ...args: unknown[]) {
    if (!this.enabled) return;

    const colors: Record<typeof severity, ChalkInstance> = {
      debug: chalk.green,
      info: chalk.blue,
      warn: chalk.yellow,
      error: chalk.red,
    };

    const date = new Date().toISOString();
    const origin = this.#getCallerInfo() ?? "unknown";

    this.sink.write(colors[severity](`${date} ${severity} [${origin}] ${this.tag} `));
    this.sink.write(args.map(this.#objectInspect.bind(this)).join(" ") + "\n");
  }

  debug(...args: unknown[]) {
    this.#print("debug", ...args);
  }

  info(...args: unknown[]) {
    this.#print("info", ...args);
  }

  warn(...args: unknown[]) {
    this.#print("warn", ...args);
  }

  error(...args: unknown[]) {
    this.#print("error", ...args);
  }

  local(childName: string) {
    return new Logger(`${this.tag}/${childName}`).setEnabled(this.enabled);
  }
}

export default Logger;
