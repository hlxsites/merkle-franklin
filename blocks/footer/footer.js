import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { decorateLangSwitcher } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;

  // language switcher
  decorateLangSwitcher(footer.querySelector('ul'));

  await decorateIcons(footer);
  block.append(footer);

  // tag line
  block.querySelector('.footer > div > div')
    .classList.add('footer-tag-line');
  // social icons
  block.querySelector('.footer > div > div:last-of-type')
    .classList.add('footer-social');
}
