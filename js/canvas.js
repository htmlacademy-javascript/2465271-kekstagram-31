import { pictureContainerElement,
  templatePictureFragmentElement
}
  from './source.js';
import { onClickOnPost } from './render-full-size-img.js';

export const insertImageElement = (data, cb, number) => {
  data.slice().sort(cb).slice(number).forEach ((postElement) => {
    const template = templatePictureFragmentElement.cloneNode(true);
    const link = template.querySelector('a');
    const image = template.querySelector('.picture__img');
    const comment = template.querySelector('.picture__comments');
    const like = template.querySelector('.picture__likes');
    image.src = postElement.url;
    image.alt = postElement.description;
    image.id = postElement.id;
    comment.innerText = postElement.comments.length;
    like.innerText = postElement.likes;
    pictureContainerElement.append(template);
    link.addEventListener('click', () => {
      onClickOnPost(postElement.id);
    });
  });
};
