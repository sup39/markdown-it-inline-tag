/**
 * @param {MarkdownIt} md
 * @param {{alias: Object.<string, string>}} opts
 */
function pluginInlineTag(md, opts={}) {
  const alias = opts.alias || {};
  const defaultTag = alias[''] || 'span';
  md.inline.ruler.before('escape', 'inline_tag', (state, a) => {
    const {src, pos, posMax} = state;
    const c0 = src.charCodeAt(pos);
    let posS;
    let tagName;
    if (c0 === 0x25) { // %
      const posC = src.indexOf('[', pos+1);
      if (posC < 0) return false; // [
      tagName = src.substring(pos+1, posC);
      const atag = alias[tagName];
      if (atag != null) tagName = atag;
      if (!tagName.match(/[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9]?/)) return;
      posS = posC+1;
    } else if (c0 === 0x5b) { // [
      posS = pos+1;
      tagName = defaultTag;
    } else return false;
    // get inner text posMax
    let level = 1;
    let i = posS;
    while (i < posMax) {
      const c = src.charCodeAt(i);
      if (c === 0x5c) i += 2; // \
      else {
        if (c === 0x5b) level++; // [
        else if (c === 0x5d) { // ]
          level--;
          if (level === 0) break;
        }
        i++;
      }
    }
    if (level !== 0) return false;
    const posE = i;
    // []{} without ()
    if (c0 === 0x5b && src.charCodeAt(posE+1) !== 0x7b) return false;
    // parse tag content
    state.pos = posS;
    state.posMax = posE;
    state.push('tag_open', tagName, 1);
    state.md.inline.tokenize(state);
    state.push('tag_close', tagName, -1);
    // end
    state.pos = posE+1;
    state.posMax = posMax;
    return true;
  });
};

module.exports = pluginInlineTag;
