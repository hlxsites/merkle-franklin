export default function decorate(block) {
  const url = block.textContent.trim();
  block.innerHTML = '';
  if (url) {
    const img = document.createElement('img');
    img.src = url;
    block.append(img);
  }
}
