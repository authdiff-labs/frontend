import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');

test('is a self-contained workbench document', () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>AuthDiff/);
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  assert.doesNotMatch(html, /<link[^>]+href=["']https?:/i);
});

test('exposes the controls the review flow depends on', () => {
  for (const id of ['baseline', 'candidate', 'format', 'sample', 'testnet', 'swap', 'compare', 'status', 'results']) {
    assert.match(html, new RegExp('id="' + id + '"'), 'missing #' + id);
  }
  assert.match(html, /aria-live="polite"/);
});

test('posts to both comparison endpoints', () => {
  assert.match(html, /'\/compare'/);
  assert.match(html, /'\/compare-xdr'/);
  assert.match(html, /\/example/);
  assert.match(html, /\/testnet-example/);
});
