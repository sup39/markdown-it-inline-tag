const mdi = require('markdown-it');
const mia = require('@sup39/markdown-it-attr');
const mit = require('..');
const test = require('./test.js');

describe('Common', () => {
  const md = mdi().use(mit, {alias: {
    '@': 'summary',
    'd': 'div',
  }});
  test(md, 'common.txt');
});
describe('Attributes (with @sup39/markdown-it-attr)', () => {
  const md = mdi().use(mia).use(mit, {alias: {'@': 'summary'}});
  test(md, 'attrs.txt');
});
describe('Attributes with default tag (with @sup39/markdown-it-attr)', () => {
  const md = mdi().use(mia).use(mit, {alias: {'': 'summary'}});
  test(md, 'default-tag.txt');
});
