import { decorateIcons } from '../../scripts/lib-franklin.js';

function getCurrentSlideIndex($block) {
  return [...$block.querySelectorAll('ul > li')].findIndex(($child) => $child.getAttribute('active') === 'true');
}

function updateSlide(nextIndex, $block) {
  const $slidesContainer = $block.querySelector('ul');
  const $secondSlide = $slidesContainer.querySelector('li:nth-child(2)');
  const offset = $secondSlide ? $secondSlide.offsetLeft : 345;
  const currentIndex = getCurrentSlideIndex($slidesContainer);
  const prevButton = $block.querySelector('.controls-container button[name="prev"]');
  if (currentIndex === 0) {
    // enable previous button
    prevButton.removeAttribute('disabled');
  } else if (nextIndex === 0) {
    // disable previous button
    prevButton.setAttribute('disabled', true);
  }

  $slidesContainer.children[currentIndex].removeAttribute('active');
  $slidesContainer.children[nextIndex].setAttribute('active', true);
  $slidesContainer.style.transform = `translateX(-${nextIndex * offset}px)`;
}

function decorateCaseStudy($slidesContainer) {
  [...$slidesContainer.children].forEach(($child) => {
    const aTag = $child.querySelector('a');
    if (aTag) {
      const category = 'Case Study'; // todo: add to placeholders for i18n
      const title = aTag.textContent.trim();
      const newATag = aTag.cloneNode();
      newATag.innerHTML = '';
      aTag.remove();
      const wrapperDiv = document.createElement('div');
      wrapperDiv.className = 'teaser-content';
      wrapperDiv.innerHTML = `
      <span>${category}</span>
      <h3>${title}</h3>
      <p>${$child.innerHTML}</p>
      `;
      newATag.append(wrapperDiv);
      newATag.prepend(wrapperDiv.querySelector('picture'));
      $child.innerHTML = '';
      $child.append(newATag);
      // remove soft breaks
      $child.querySelectorAll('br').forEach((br) => br.remove());
    }
  });
}

export default function decorate($block) {
  const $slidesContainer = $block.querySelector('ul');
  $slidesContainer.children[0].setAttribute('active', true);

  const numChildren = $slidesContainer.children.length;

  decorateCaseStudy($slidesContainer);

  const $controlsContainer = document.createElement('div');
  $controlsContainer.classList.add('controls-container');
  $controlsContainer.innerHTML = `
    <button name="prev" aria-label="Previous" class="control-button" disabled><span class="icon icon-arrow" /></button>
    <button name="next" aria-label="Next" class="control-button"><span class="icon icon-arrow" /></button>
  `;
  $block.append($controlsContainer);
  decorateIcons($controlsContainer);

  const nextButton = $controlsContainer.querySelector('button[name="next"]');
  const prevButton = $controlsContainer.querySelector('button[name="prev"]');

  nextButton.addEventListener('click', () => {
    const currentIndex = getCurrentSlideIndex($slidesContainer);
    updateSlide((currentIndex + 1) % numChildren, $block);
  });

  prevButton.addEventListener('click', () => {
    const currentIndex = getCurrentSlideIndex($slidesContainer);
    updateSlide((((currentIndex - 1) % numChildren) + numChildren) % numChildren, $block);
  });
}
