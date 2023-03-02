function setProp(ele) {
  const position = ele.getBoundingClientRect();
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    ele.style.setProperty('--num', 100);
  }
  if (position.top < window.innerHeight && position.bottom >= 0) {
    ele.style.setProperty('--num', 100);
  }
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  window.addEventListener('scroll', () => {
    const element = document.querySelectorAll('div.facts > div > div > p ');
    element.forEach((ele) => {
      setProp(ele);
    });
  });
}
