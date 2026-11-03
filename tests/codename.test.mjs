import assert from 'node:assert/strict';
import test from 'node:test';

import { getCodename } from '../js/codename.mjs';

test('maps the checked cycle boundaries to their approved codenames', () => {
  assert.deepEqual(getCodename(1), {
    position: 1,
    adjective: 'Brave',
    noun: 'Arc',
    codename: 'BraveArc',
  });
  assert.equal(getCodename(10).codename, 'VividArc');
  assert.equal(getCodename(11).codename, 'BraveBay');
  assert.equal(getCodename(120).codename, 'VividWind');
});

test('clamps out-of-range positions to the first or final codename', () => {
  assert.equal(getCodename(0).codename, 'BraveArc');
  assert.equal(getCodename(121).codename, 'VividWind');
});
