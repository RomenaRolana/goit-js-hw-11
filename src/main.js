document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (!query) {
        iziToast.warning({title: 'Warning', message: 'Please enter a search query.'});
        return;
    }
    fetchImagesFromAPI(query);
});

let lightbox; // Глобальна змінна для екземпляра SimpleLightbox

function fetchImagesFromAPI(query) {
    const apiKey = '42183789-4564ae77348bbdba9cab87cc0';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    showLoadingIndicator(true); // Показати індикатор завантаження

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            showLoadingIndicator(false); // Сховати індикатор завантаження
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            iziToast.error({title: 'Error', message: 'Failed to fetch images.'});
            showLoadingIndicator(false); // Сховати індикатор завантаження
        });
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    if (images.length === 0) {
        iziToast.info({title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again!'});
        return;
    }

    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'image-card';
        
        const a = document.createElement('a');
        a.href = image.largeImageURL;
        a.dataset.lightbox = "image-set";
        a.dataset.title = image.tags;

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        a.appendChild(img);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.textContent = `Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}`;
        
        div.appendChild(a);
        div.appendChild(infoDiv);
        
        gallery.appendChild(div);
    });

    if (!lightbox) {
        lightbox = new SimpleLightbox({elements: '#gallery a'});
    } else {
        lightbox.refresh();
    }
}

function showLoadingIndicator(show) {
    if (show) {
        iziToast.info({title: 'Searching', message: 'Fetching images...', timeout: false, overlay: true, id: 'loading'});
    } else {
        iziToast.destroy(document.querySelector('.iziToast-overlay'));
    }
}