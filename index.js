// Define global variables for buttons and playlistContainer
let generatePlaylistBtn;
let clearFormBtn;
let playlistContainer; // Declare playlistContainer globally
let playlistId = '5p3WABVlNTOsZOe864I8R4'; // Spotify playlist ID

// Function to initialize the application
function initializeApp() {
    // Get elements from the DOM
    generatePlaylistBtn = document.getElementById('generatePlaylist');
    const playlistForm = document.getElementById('playlistForm');
    clearFormBtn = document.getElementById('clearForm');
    playlistContainer = document.getElementById('playlistContainer'); // Assign value here

    // Check if elements exist before proceeding
    if (!playlistForm || !generatePlaylistBtn || !clearFormBtn || !playlistContainer) {
        console.error('Required elements not found in the DOM.');
        return;
    }

    // Initialize playlist
    const playlist = new Playlist();

    // Event listener for form submission
    playlistForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('songTitle')?.value || '';
        const artist = document.getElementById('artistName')?.value || '';
        const song = new Song(title, artist);
        playlist.addSong(song);
        playlistContainer.innerHTML = ''; // Clear previous playlist
        playlistContainer.appendChild(playlist.render());
        console.log('Song added to playlist');
    });

    // Event listener for clear form button
    clearFormBtn.addEventListener('click', function() {
        console.log('Clear Form button clicked'); // This line is for debugging
        playlistForm.reset(); // This resets the form to its initial state
    });

    // Event listener for generate playlist button
    generatePlaylistBtn.addEventListener('click', async function() {
        playlistContainer.innerHTML = 'Display playlist here'; // Display placeholder
        try {
            await playlist.fetchSpotifyPlaylist(playlistId); // Fetch Spotify playlist
            playlistContainer.innerHTML = ''; // Clear placeholder
            playlistContainer.appendChild(playlist.render()); // Render the playlist
        } catch (error) {
            console.error('Failed to fetch Spotify playlist:', error);
        }
        console.log('Playlist displayed');
    });

    // Add a mouseover event listener to the h1
    const playlistGeneratorH1 = document.getElementById('playlistGenerator');
    if (playlistGeneratorH1) {
        // Original mouseover event listener
        playlistGeneratorH1.addEventListener('mouseover', function() {
            console.log('did you have to let it linger ?');
            playlistGeneratorH1.textContent = 'did you have to let it linger?';
        });
    
        // Add a mouseout event listener
        playlistGeneratorH1.addEventListener('mouseout', function() {
            // Reset the text content to its original state
            playlistGeneratorH1.textContent = 'Playlist Generator';
        });
    }
}    

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
