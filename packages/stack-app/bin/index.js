#!/usr/bin/env node
import "../dist/server.js";

// Terminate process on `SIGINT` and `SIGTERM` signal.
const handleSigTerm = () => process.exit(0);
process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);
