import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); // Додав селектор для завантажувача

loader.style.display = 'none'; // Переконайтеся, що завантажувач спочатку прихований

const searchParams = {
    key: '42183789-4564ae77348bbdba9cab87cc0',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: '',
};

// Створюємо екземпляр SimpleLightbox один раз
let lightBox = new SimpleLightbox('.gallery-link');

form.addEventListener('submit', e => {
    e.preventDefault();
    gallery.innerHTML = ''; // Очищення галереї перед новим запитом
    loader.style.display = 'block'; 
    const inputValue = document.querySelector('#query').value;
    searchParams.q = inputValue;
    getPhotoByName()
        .then(images => {
            createGallery(images);
            lightBox.refresh(); // Оновлюємо lightBox з новими зображеннями
        })
        .catch(error => {
            iziToast.error({ // Використання iziToast для повідомлень про помилки
                title: 'Error',
                message: `An error occurred: ${error.message}`,
            });
        })
        .finally(() => {
            loader.style.display = 'none'; // Приховуємо завантажувач після завершення запиту
        });
    e.target.reset();
});

function getPhotoByName() {
    const urlParams = new URLSearchParams(searchParams);
    return fetch(`https://pixabay.com/api/?${urlParams}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }
        });
}

function createGallery(images) {
    if (images.hits.length === 0) {
        iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
        });
    } else {
        const links = images.hits.map(image => `
            <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
            </a>
            <div class="img-content">
                <div><h3>Likes</h3><p>${image.likes}</p></div>
                <div><h3>Views</h3><p>${image.views}</p></div>
                <div><h3>Comments</h3><p>${image.comments}</p></div>
                <div><h3>Downloads</h3><p>${image.downloads}</p></div>
            </div>
        `).join('');
        gallery.innerHTML = links;
    }
}