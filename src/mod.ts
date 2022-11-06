import metadata from "./metadata.json" assert { type: "json" };

export * as generator from "./service/mod.ts";
export * as service from "./service/mod.ts";
export * as web from "./web/mod.ts";

export { metadata };
