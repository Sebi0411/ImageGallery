const endpoint = 'https://picsum.photos/v2/list';

const gallery = document.getElementById('gallery');
const authorSelect = document.getElementById('author');

let imagesData = [];
let authors = new Set();

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        imagesData = data;
        populateAuthors(data);
        displayImages(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayImages(images) {
    gallery.innerHTML = '';

    images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="image">
                <img src="${image.download_url}" alt="${image.author}" />
            </div>
            <h3>${image.author}</h3>
            <p>Lorem ipsum</p>
        `;

        gallery.appendChild(card);
    });
}

function populateAuthors(images) {
    images.forEach(image => {
        authors.add(image.author);
    });

    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorSelect.appendChild(option);
    });
}

authorSelect.addEventListener('change', (e) => {
    const selectedAuthor = e.target.value;

    if (selectedAuthor === 'all') {
        displayImages(imagesData);  
    } else {
        const filteredImages = imagesData.filter(image => image.author === selectedAuthor);
        displayImages(filteredImages);
    }
});
