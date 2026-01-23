🎧 Music & Podcast Streaming Web Application

A full-stack music and podcast streaming platform built using Python (Flask) and React, allowing users to stream audio, manage playlists, resume playback, and consume podcast content through a modern web interface.

This project demonstrates real-world backend development, REST APIs, authentication, cloud storage, audio streaming, and frontend integration.

🚀 Live Demo

Frontend (Vercel):
👉 https://music-podcast-streaming.vercel.app/login

Backend API (Render):
👉 https://music-podcast-streaming.onrender.com

📌 Project Aim

To design and develop a production-ready music and podcast streaming application that allows users to:

Stream audio seamlessly
Resume playback from last position
Search music & podcasts
Create and manage playlists
Upload and manage audio as an admin

🧰 Tech Stack
🔹 Frontend

React.js
Tailwind CSS
HTML5 Audio API
Axios
React Context API (Global Audio Player)

🔹 Backend

Python 3.10+
Flask (REST APIs)
Flask-JWT-Extended
Flask-CORS
SQLAlchemy ORM
Gunicorn

🔹 Database & Storage

Supabase (PostgreSQL)
Supabase Storage (Audio files)

🔹 Deployment

Backend: Render
Frontend: Vercel

🗄 Database Design (High-Level)
Table	          Purpose
users	          Stores user credentials and roles
tracks	          Stores music metadata & audio URLs
podcasts	      Stores podcast information
playlists	      Stores user-created playlists
playlist_tracks	  Maps tracks to playlists
recently_played	  Stores playback position

👥 User Roles & Features
👤 User

Register & login
Browse music & podcasts
Search tracks & episodes
Stream audio
Resume last played audio
Create & manage playlists
View recently played tracks

🛠 Admin

Upload audio files
Add metadata (title, artist, category)
Store audio in Supabase Storage
Manage platform content

🧩 Backend – Function-by-Function Explanation
🔐 Authentication
register_user()

Registers a new user.
What it does:
Accepts username, email, password
Hashes password securely
Stores user in database

login_user()

Authenticates user and issues JWT.

What it does:

Verifies credentials
Generates JWT access token
Returns token to frontend

@jwt_required()

Protects private routes.

Why:
Ensures only authenticated users can access APIs.

🎵 Music APIs
get_all_music() → GET /api/music

Fetches all tracks from database.
Used by: Music page in frontend

search_music() → GET /api/music/search

Searches music using MusicBrainz API.

Why:
Allows discovering new tracks beyond stored content.

📻 Podcast APIs
get_podcasts()

Fetches podcasts from PodcastIndex / ListenNotes.

🎧 Audio Streaming
stream_audio(filename)

Streams audio with HTTP range requests.

Why important:

Enables seek
Prevents full-file loading
Optimized playback

🕒 Recently Played
update_recent()

Stores playback timestamp.

get_recent(track_id)

Fetches last playback position.

Why:
Enables resume-from-last-position feature.

📂 Playlist Management
create_playlist()

Creates user playlist.

add_track_to_playlist()

Adds track to playlist.

remove_track_from_playlist()

Removes track from playlist.

⬆️ Admin Upload
upload_audio() → POST /api/admin/upload

Admin-only endpoint.

What it does:

Uploads audio to Supabase Storage
Generates public URL
Saves metadata in database

🎨 Frontend – Component & Function Explanation
📁 Frontend Structure
frontend/
├── components/
├── context/
├── pages/
├── services/
├── App.js
└── index.js
🌐 Entry Files
index.js

App entry point

Renders <App />
Wraps app in PlayerProvider

App.js

Defines routes
Wraps pages with layout
Ensures global player availability

🔌 API Layer
services/api.js

Centralized Axios instance.

What it does:

Attaches JWT automatically
Handles all API calls

🎧 Global Audio Player (Core Frontend Logic)
context/PlayerContext.jsx
PlayerProvider

Creates a single global Audio instance.

Why needed:

One song at a time
Music continues across page navigation

playTrack(track)

Plays or resumes a track.

What it does:

Sets audio source
Handles play/pause toggle
Fetches last played position
Starts playback
Saves progress periodically

pauseTrack()

Pauses audio and updates UI state.

🧱 UI Components
TrackCard.jsx

Displays track info and triggers playback.

AudioPlayer.jsx

Main player UI (play/pause, current track).

MiniPlayer.jsx

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 183005.png" width="60%" />
</p>

Compact player visible across pages.

Header.jsx

Navigation bar.

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 185331.png" width="60%" />
</p>

Layout.jsx

Wraps pages with consistent UI structure.

📄 Pages
Login.jsx

Handles authentication
Stores JWT token

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 171033.png" width="60%" />
</p>

Music.jsx

Displays music list
Enables playback

Search.jsx

Calls search API
Displays dynamic results

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 182759.png" width="45%" />
  <img src="screenshots\Screenshot 2026-01-23 183005.png" width="45%" />
</p>

Playlists.jsx

Shows user playlists

PlaylistDetail.jsx

Displays playlist tracks
Allows add/remove

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 182759.png" width="45%" />
  <img src="screenshots\Screenshot 2026-01-23 183005.png" width="45%" />
</p>

RecentlyPlayed.jsx

Shows playback history
Enables resume

<p align="center">
  <img src="screenshots\Screenshot 2026-01-23 183005.png" width="60%" />
</p>

🎨 Styling

Tailwind CSS
Utility-first styling
Responsive design
Clean UI without large CSS files

🧠 Architecture Overview
React Frontend (Vercel)
        ↓
Flask REST API (Render)
        ↓
Supabase PostgreSQL
        ↓
Supabase Storage (Audio Streaming)

⚙️ How to Run Locally
Backend
cd backend
pip install -r requirements.txt
python run.py
Frontend
cd frontend
npm install
npm start

📈 What This Project Demonstrates

Secure JWT authentication
Role-based access control
Audio streaming with resume
React Context for global state
Clean REST API design
Cloud storage integration
Production deployment

👩‍💻 Author

Reena Arora
Full-Stack Developer (Python | Flask | React)