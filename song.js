let term = '';
const updateTerm = () => {
    term = document.getElementById('searchTerm').value;
    // check term exist
    // if (!term || term === '') {
    //     alert('Please enter a search term');
    // } else {
        const url = `https://itunes.apple.com/search?term=${term}`;
        const songContainer = document.getElementById('songs');
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }
        fetch(url)
            .then((Response) => Response.json())
            .then((data) => {
                console.log(data.results);
                const artists = data.results;



                return artists.map(result => {
                    const article = document.createElement('article');
                    const artists = document.createElement('p');
                    const song = document.createElement('h4');
                    const img = document.createElement('img');
                    const audio = document.createElement('audio');
                    const audioSource = document.createElement('source');
                    const viewButton = document.createElement('button');  // Declare viewButton here
                
                    // Now put content
                    artists.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    audio.controls = true;
                    viewButton.textContent = 'Play Full Song';
                    viewButton.addEventListener('click', () => window.open(result.trackViewUrl, '_blank'));
                
                    article.appendChild(img);
                    article.appendChild(artists);
                    article.appendChild(song);
                    article.appendChild(audio);
                    article.appendChild(viewButton);
                    audio.appendChild(audioSource);
                
                    songContainer.appendChild(article);
                });















                // return artists.map(result => {
                //     // Now create Html Element 

                //     const article = document.createElement('article'),
                //         artists = document.createElement('p'),
                //         song = document.createElement('h4'),
                //         img = document.createElement('img'),
                //         audio = document.createElement('audio'),
                //         audioSource = document.createElement('source')

                        
                //     // Now put content 

                //     artists.innerHTML = result.artistName;
                //     song.innerHTML = result.trackName;
                //     img.src = result.artworkUrl100;
                //     audioSource.src = result.previewUrl;
                //     audio.controls = true;

                //     article.appendChild(img);
                //     article.appendChild(artists);
                //     article.appendChild(song);
                //     article.appendChild(audio);
                //     audio.appendChild(audioSource);

                //     songContainer.appendChild(article);
                // })
            })
            .catch(error => console.log('Request failed:', error))
    // }
}

const searchBtn = document.getElementById('searchTermBtn');

search = document.getElementById('searchTerm');

search.addEventListener("keypress", updateTerm);

// searchBtn.addEventListener('click', updateTerm)

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }
  }
},true)