export default function decorate(block) {
  block.firstElementChild.classList.add('toc-title');
  const cols = [...block.lastElementChild.children];
  cols.forEach((col, i) => {
    col.classList.add('toc-item', `toc-${i + 1}`);
  });
  block.classList.add(`toc-${cols.length}-cols`);
}
