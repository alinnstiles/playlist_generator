Playlist Generator Project
As a music lover, I want to generate playlists based on my mood, genre preference, or a specific song so that I can discover new music that matches my current mood or taste. 

Features:
Input for mood, time period and genre preference
Display generated playlist with song details
Grading : 
Requirements: 
My code accesses data from an external API (Spotify API) and manipulates it 
5+ objects + 3+ attributes
Fetches a Spotify playlist containing more than 5 tracks (objects) with attributes like song title and artist 
3+ event listeners 
Code includes event listeners for form submission, button clicks, and mouseover events. 
Submit - When Generate Playlist button is pressed
Click - When Clear Form button is pressed EventListener “click” is called and clears the form 
Mouseover: When you mouseover <h1> Playlist Generator, the text changes to a lyric by The Cranberries 
Iteration 
The concept of iterating over a collection of items is implicitly used in the fetchSpotifyPlaylist method. This method fetches a Spotify playlist by its ID and adds its tracks to the playlist. The iteration over the tracks is done using the map function to format each track into a Song object and then adding each song to the playlist using the addSong method.


Why index.js AND playlist.js ? 
The purpose of having both an index.js and playlist.js file in a project, as demonstrated by the provided code snippets, is to separate concerns and organize the codebase effectively. This separation allows for a cleaner, more maintainable code structure.
index.js: This file typically serves as the entry point of a JavaScript application. It is responsible for initializing the application, setting up event listeners, and managing the application's lifecycle. In the provided code, index.js is responsible for:
Initializing global variables and DOM elements.
Setting up event listeners for user interactions such as form submission, clearing the form, and generating a playlist.
Initializing the application when the DOM is fully loaded.
Handling the display and interaction logic of the application, such as adding songs to a playlist and fetching a Spotify playlist.
playlist.js: This file encapsulates the logic related to the playlist functionality. It defines classes and methods for managing a playlist, such as adding songs, fetching a Spotify playlist, and rendering the playlist. In the provided code, playlist.js includes:
The Playlist class, which manages the playlist's state and operations like adding songs, fetching a Spotify playlist, and rendering the playlist.
The Song class, which represents individual songs in the playlist.
This separation of concerns allows developers to easily locate and modify specific functionalities without affecting the rest of the application. For example, if you need to change how songs are added to the playlist, you can do so in playlist.js without touching the initialization and event handling logic in index.js. This modular approach enhances code readability, maintainability, and scalability.
In summary, having both index.js and playlist.js files in a project allows for a clear separation of concerns, where index.js handles the application's entry point and user interactions, and playlist.js focuses on the playlist's functionality. This structure makes the codebase easier to navigate, understand, and maintain.
