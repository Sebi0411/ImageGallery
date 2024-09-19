const endpoint = 'https://picsum.photos/v2/list';
const imagesPerPage = 6; // Number of images per page
let currentPage = 1; // Track the current page
let totalPages = 0; // Total number of pages


const gallery = document.getElementById('gallery');
const authorSelect = document.getElementById('author');

let imagesData = [];
let authors = new Set();

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        totalPages = Math.ceil(data.length / imagesPerPage);
        imagesData = data;
        populateAuthors(data);
        displayImages(data, currentPage);
        updatePaginationButtons();
    })
    .catch(error => console.error('Error fetching data:', error));

function displayImages(images, page) {
    const startIndex = (page - 1) * imagesPerPage; 
    const endIndex = startIndex + imagesPerPage; 
    const imagesToShow = images.slice(startIndex, endIndex);

    gallery.innerHTML = '';

    imagesToShow.forEach(image => {
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

function updatePaginationButtons() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    pageInfo.textContent = `Page ${currentPage}`;

    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
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

document.getElementById('prev-page').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        displayImages(imagesData, currentPage);
        updatePaginationButtons();
    }
});

document.getElementById('next-page').addEventListener('click', function () {
    if (currentPage < totalPages) {
        currentPage++;
        displayImages(imagesData, currentPage);
        updatePaginationButtons();
    }
});