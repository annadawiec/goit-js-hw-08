import 'simplelightbox/dist/simple-lightbox.min.css';

import simpleLightbox from 'simplelightbox';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryList = document.querySelector('.gallery');

function createGallery(images) {
  return images
    .map(
      image =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${image.original}">
        <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
         />
         </a>
    </div>`
    )
    .join('');
}

const addGallery = createGallery(galleryItems);
galleryList.innerHTML = addGallery;

console.log(galleryList);

galleryList.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = new simpleLightbox('.gallery a');

  instance.on('show.simplelightbox');

  galleryList.addEventListener('keydown', offEscapeClose);

  function offEscapeClose(event) {
    if (event.code === 'Escape') {
      instance.close();
      galleryList.removeEventListener('keydown', offEscapeClose);
    }
  }
}
