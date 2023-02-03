export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;
  const url = link.getAttribute('href');
  if (url) {
    link.remove();
    const altText = block.textContent.trim();
    block.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    img.alt = altText;
    block.append(img);
  }
}
