document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        {
            name: 'VENOM',
            languages: ['English', 'Hindi'],
            type: 'Action',
            poster: 'spiderman.webp',
            screenshots: ['ss1.png', 'https://picsum.photos/id/1/200/200'],
            downloadLinks: {
                '1080p': 'https://example.com/download1080p',
                '720p': 'https://example.com/download720p',
            },
        },
        {
            name: 'Web Series 1',
            languages: ['Hindi', 'Tamil'],
            type: 'Drama',
            poster: 'https://via.placeholder.com/200x300',
            screenshots: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
            seasons: [
                {
                    season: 'Season 1',
                    episodes: [
                        {
                            episode: 'Episode 1',
                            downloadLinks: {
                                '1080p': 'https://example.com/season1ep1-1080p',
                                '720p': 'https://example.com/season1ep1-720p',
                            }
                        },
                        {
                            episode: 'Episode 2',
                            downloadLinks: {
                                '1080p': 'https://example.com/season1ep2-1080p',
                                '720p': 'https://example.com/season1ep2-720p',
                            }
                        },
                    ]
                },
                {
                    season: 'Season 2',
                    episodes: [
                        {
                            episode: 'Episode 1',
                            downloadLinks: {
                                '1080p': 'https://example.com/season2ep1-1080p',
                                '720p': 'https://example.com/season2ep1-720p',
                            }
                        },
                    ]
                },
            ]
        },
    ];

    const movieContainer = document.getElementById('movieContainer');
    const movieModal = document.getElementById('movieModal');
    const movieDetails = document.getElementById('movie-details');
    const searchInput = document.getElementById('searchInput');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredMovies = movies;

    function displayMovies(page) {
        movieContainer.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

        moviesToDisplay.forEach((movie, index) => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.name}">
                <h2>${movie.name}</h2>
                <p><strong>Type:</strong> ${movie.type}</p>
                <p><strong>Languages:</strong> ${movie.languages.join(', ')}</p>
            `;
            movieCard.addEventListener('click', () => openModal(movie));
            movieContainer.appendChild(movieCard);
        });

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= filteredMovies.length;
    }

    function openModal(movie) {
        movieDetails.innerHTML = `
            <h2>${movie.name}</h2>
            <p><strong>Type:</strong> ${movie.type}</p>
            <p><strong>Languages:</strong> ${movie.languages.join(', ')}</p>
            <div class="screenshots">
                ${movie.screenshots.map(screenshot => `<img src="${screenshot}" alt="Screenshot">`).join('')}
            </div>
        `;

        if (movie.seasons) {
            movie.seasons.forEach(season => {
                const seasonDiv = document.createElement('div');
                seasonDiv.className = 'season';
                seasonDiv.innerHTML = `<h3>${season.season}</h3>`;
                
                const episodeList = document.createElement('div');
                episodeList.className = 'episode-list';

                season.episodes.forEach(episode => {
                    const episodeButton = document.createElement('button');
                    episodeButton.textContent = episode.episode;

                    const qualityButtonsDiv = document.createElement('div');
                    qualityButtonsDiv.className = 'quality-buttons';

                    Object.keys(episode.downloadLinks).forEach(quality => {
                        const qualityButton = document.createElement('button');
                        qualityButton.textContent = `${quality} Download`;
                        qualityButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.open(episode.downloadLinks[quality], '_blank');
                        });
                        qualityButtonsDiv.appendChild(qualityButton);
                    });

                    episodeList.appendChild(episodeButton);
                    episodeList.appendChild(qualityButtonsDiv);
                });

                seasonDiv.appendChild(episodeList);
                movieDetails.appendChild(seasonDiv);
            });
        } else {
            const qualityButtonsDiv = document.createElement('div');
            qualityButtonsDiv.className = 'quality-buttons';

            Object.keys(movie.downloadLinks).forEach(quality => {
                const qualityButton = document.createElement('button');
                qualityButton.textContent = `${quality} Download`;
                qualityButton.addEventListener('click', () => {
                    window.open(movie.downloadLinks[quality], '_blank');
                });
                qualityButtonsDiv.appendChild(qualityButton);
            });

            movieDetails.appendChild(qualityButtonsDiv);
        }

        movieModal.style.display = 'block';
    }

    function closeModal() {
        movieModal.style.display = 'none';
    }

    function filterMovies() {
        const searchText = searchInput.value.toLowerCase();
        filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchText));
        currentPage = 1;
        displayMovies(currentPage);
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMovies(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage * itemsPerPage < filteredMovies.length) {
            currentPage++;
            displayMovies(currentPage);
        }
    });

    document.querySelector('.close').addEventListener('click', closeModal);
    searchInput.addEventListener('input', filterMovies);

    window.addEventListener('click', (event) => {
        if (event.target === movieModal) {
            closeModal();
        }
    });

    displayMovies(currentPage);
});
