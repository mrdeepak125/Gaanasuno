let term = '';

const updateTerm = () => {
    term = document.getElementById('searchTerm').value;
    const url = `https://shazam.p.rapidapi.com/search?term=${term}`;
    const songContainer = document.getElementById('songs');
    while (songContainer.firstChild) {
        songContainer.removeChild(songContainer.firstChild);
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '43db6998cdmsh2ebabcbb7bfe84ep1865b9jsn0406325a9b5c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    fetch(url, options)
    .then((data) => data.json())
    .then((response) => {
        const artists = response.tracks.hits || [];

        artists.forEach(result => {
            const article = document.createElement('article');
            const artistParagraph = document.createElement('p');
            const songHeader = document.createElement('h4');
            const img = document.createElement('img');
            const audio = document.createElement('audio');
            const audioSource = document.createElement('source');
            const viewButton = document.createElement('button');

            artistParagraph.textContent = result.track.artist ? result.track.artist.name : 'Unknown Artist';
            songHeader.textContent = result.track.title;
            img.src = result.track.share.image;

            audioSource.src = result.track.hub.actions[1].uri;

            // audio.controls = true;
            viewButton.textContent = 'Play Full Song';
            viewButton.addEventListener('click', () => {
            document.getElementById('title').textContent = result.track.title;
            document.querySelector('.subtitle').textContent = result.track.artist ? result.track.artist.name : 'Unknown Artist';
            document.getElementById('poster_master_play').src = result.track.share.image;
            music.src = result.track.hub.actions[1].uri;
            music.play();
            if (music.paused || music.currentTime <= 0) {
                music.play();
                wave.classList.add('active1');
                masterPlay.classList.remove('bi-play-fill');
                masterPlay.classList.add('bi-pause-fill');
            } else {
                music.pause();
                wave.classList.remove('active1');
                masterPlay.classList.add('bi-play-fill');
                masterPlay.classList.remove('bi-pause-fill');
            }
        
            });
            
            article.appendChild(img);
            article.appendChild(artistParagraph);
            article.appendChild(songHeader);
            article.appendChild(audio);
            article.appendChild(viewButton);
            audio.appendChild(audioSource);
            songContainer.appendChild(article);
        });
    })
    .catch(error => console.error('Request failed:', error));
}

const search = document.getElementById('searchTerm');
search.addEventListener("keypress", updateTerm);

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] !== event.target) {
            audio[i].pause();
        }
    }
}, true);

