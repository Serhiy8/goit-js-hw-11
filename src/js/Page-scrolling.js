// скролимо на висоту * 2 першого елемента
export const pageScrolling = galleryRef => {
  const { height: cardHeight } =
    galleryRef.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
