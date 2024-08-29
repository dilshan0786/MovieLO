document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        {
            name: 'Kalki 2898-AD (2024)',
            languages: ['Hindi-Multi Audio'],
            type: 'Action',
            poster: 'Kalki2898AD.jpg',
            screenshots: ['Kalki2898AD_SS1.png', 'Kalki2898AD_SS2.png', 'Kalki2898AD_SS3.png', 'Kalki2898AD_SS4.png', 'Kalki2898AD_SS5.png', 'Kalki2898AD_SS6.png'],
            downloadLinks: {
                '480p [600 MB]': 'http://tnlinks.in/AYN8u',
                '720p [1.7 GB]': 'http://tnlinks.in/1VJil',
                '1080p [2.2 GB]': 'http://tnlinks.in/AHi5tlJ',
                'HQ 1080p [5.5 GB]': 'http://tnlinks.in/7iFGy',
                '4K 2160p [15.4 GB]': 'http://tnlinks.in/EghqNmt',
                
            },
        },

        {
            name: 'Munjya (2024)',
            languages: ['Hindi'],
            type: 'Comedy', 'Horror',
            poster: 'Munjya(2024).jpg',
            screenshots: ['Munjya(2024)_SS1.png', 'Munjya(2024)_SS2.png', 'Munjya(2024)_SS3.png', 'Munjya(2024)_SS4.png', 'Munjya(2024)_SS5.png', 'Munjya(2024)_SS6.png'],
            downloadLinks: {
                '480p [400 MB]': 'http://tnlinks.in/8wRsPSeO',
                '720p [1.1 GB]': 'http://tnlinks.in/PkFw',
                '1080p [2.5 GB]': 'http://tnlinks.in/roctYh',
                'HQ 1080p [3.4 GB]': 'http://tnlinks.in/EO5uQd',
                '4K 2160p [11 GB]': 'http://tnlinks.in/z1vRezVH',
                
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
