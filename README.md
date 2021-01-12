# markdown-it-inline
A [markdown-it](https://github.com/markdown-it/markdown-it) plugin
to write inline tag.

## Syntax
`%tag[inline]` is parsed as `<tag>inline</tag>`,
where `inline` is parsed as markdown text.

## Usage
```js
const md = require('markdown-it')();
const mia = require('@sup39/markdown-it-inline-tag');

console.log(md.use(mia).render(`
1 %div[2 %span[ab] c*d*e 3] 4
`));
```
Expected output:
```html
<p>1 <div>2 <span>ab</span> c<em>d</em>e 3</div> 4</p>
```

### Alias
You can also set alias for `tag`.

For example,
```js
const md = require('markdown-it')();
const mit = require('@sup39/markdown-it-inline-tag');

console.log(md.use(mit, {
  alias: {
    's': 'span',
    '@': 'div',
  },
}).render(`
1 %@[2 %s[ab] c*d*e 3] 4
`));
```
Expected output:
```html
<p>1 <div>2 <span>ab</span> c<em>d</em>e 3</div> 4</p>
```

### Extension: attributes
You can use
[@sup39/markdown-it-attr](https://github.com/sup39/markdown-it-attr)
plugin to add attributes to inline tags.

```js
const md = require('markdown-it')();
const mia = require('@sup39/markdown-it-attr');
const mit = require('@sup39/markdown-it-inline-tag');

console.log(md.use(mia).use(mrt).render(`
1 %div[2 %span[ab]{.a} c*d*{.b}e 3]{.c} 4
`));
```
Expected output:
```html
<p>1 <div class="c">2 <span class="a">ab</span> c<em class="b">d</em>e 3</div> 4</p>
```

Also, you can omit `%tag` if there is `{attrs}` right after `[...]`.
In this case, the tag name will be `alias['']` or `span` if not assigned.

```js
const md = require('markdown-it')();
const mia = require('@sup39/markdown-it-attr');
const mit = require('@sup39/markdown-it-inline-tag');

console.log(md.use(mia).use(mrt, {'': 'summary'}).render(`
1 [2 %span[ab]{.a} c*d*{.b}e 3]{.c} 4
`));
```
Expected output:
```html
<p>1 <summary class="c">2 <span class="a">ab</span> c<em class="b">d</em>e 3</summary> 4</p>
```
