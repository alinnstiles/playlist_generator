// Playlist class definition
class Playlist {
    // Constructor initializes an empty array for songs and sets the nowPlayingIndex to 0
    constructor() {
        this.songs = [];
        this.nowPlayingIndex = 0;
    }

    // Adds a song to the playlist
    addSong(song) {
        this.songs.push(song);
    }

    // Fetches Spotify access token by making a POST request to Spotify's token endpoint
    async getSpotifyAccessToken() {
        // Client ID, client secret, and redirect URI are used for authentication
        const clientId = 'cf051e6dabbe4a288bb966dd9c0566a1';
        const clientSecret = 'c12ada87637a442da6ad23ceb09c41be';
        const redirectUri = 'https://accounts.spotify.com/api/token';
        const authHeader = btoa(`${clientId}:${clientSecret}`);
    
        // Fetch request to Spotify API for access token
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            })
        });
    
        // Error handling for the fetch request
        if (!response.ok) {
            throw new Error(`Spotify API request failed: ${response.statusText}`);
        }
    
        // Parsing the response to JSON and returning the access token
        const data = await response.json();
        return data.access_token;
    }

    // Fetches a Spotify playlist by its ID and adds its tracks to the playlist
    async fetchSpotifyPlaylist(playlistId) {
        const accessToken = await this.getSpotifyAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Spotify API request failed: ${response.statusText}`);
        }
        const data = await response.json();
        // Formatting track titles and adding them to the playlist
        const formattedTracks = data.tracks.items.map(track => {
            const song = new Song(track.track.name, track.track.artists[0].name);
            song.title = `Spotify: ${song.title}`;
            return song;
        });
        formattedTracks.forEach(song => this.addSong(song));
    }

    // Refreshes the Spotify access token using a stored refresh token
    async getRefreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        const clientId = 'cf051e6dabbe4a288bb966dd9c0566a1'; 
        const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            }),
        };

        const response = await fetch(url, payload);
        const data = await response.json();

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
    }

    // Renders the playlist as a DOM element
    render() {
        const playlistElement = document.createElement('div');
        playlistElement.id = '5p3WABVlNTOsZOe864I8R4';
        this.songs.forEach(song => {
            const songElement = document.createElement('p');
            songElement.textContent = `${song.title} by ${song.artist}`;
            playlistElement.appendChild(songElement);
        });
        return playlistElement;
    }
}

// Song class definition
class Song {
    // Constructor initializes a song with a title and artist
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }
}
