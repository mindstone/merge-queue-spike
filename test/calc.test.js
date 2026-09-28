import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { add, mul } from '../src/calc.js';

test('add', () => assert.equal(add(2, 3), 5));
test('mul', () => assert.equal(mul(2, 3), 6));

// Flaky-once: if the repo contains FLAKE_ONCE, the first run in a job fails and a retry passes.
test('flaky once', () => {
  if (!existsSync('FLAKE_ONCE')) return;
  const marker = join(process.env.RUNNER_TEMP ?? '/tmp', 'flake-marker');
  if (!existsSync(marker)) { writeFileSync(marker, 'x'); assert.fail('simulated flake (first attempt)'); }
});
