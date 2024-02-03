document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (!query) {
        iziToast.warning({title: 'Warning', message: 'Please enter a search query.'});
        return;
    }
    searchImages(query);
});

function searchImages(query) {
    const apiKey = '42183789-4564ae77348bbdba9cab87cc0';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    iziToast.info({title: 'Searching', message: 'Fetching images...', timeout: false, overlay: true, id: 'loading'});

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            iziToast.destroy(document.querySelector('.iziToast-overlay'));
        })
        .catch(error => {
            iziToast.error({title: 'Error', message: 'Failed to fetch images.'});
            console.error('Error fetching images:', error);
        });
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    if (images.length === 0) {
        iziToast.info({title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again!'});
        return;
    }

    const fragment = document.createDocumentFragment();

    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'image-card';
        div.innerHTML = `<a href="${image.largeImageURL}" data-lightbox="image-set" data-title="${image.tags}">
                            <img src="${image.webformatURL}" alt="${image.tags}">
                         </a>
                         <div class="info">Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}</div>`;
        fragment.appendChild(div);
    });

    gallery.appendChild(fragment);

    // Re-initialize SimpleLightbox for the new set of links
    new SimpleLightbox({elements: '#gallery a'}).refresh();
}