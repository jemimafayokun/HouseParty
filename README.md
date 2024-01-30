# HouseParty Application
HouseParty is a music control application that allows the host of a party to provide permissions to friends who join the room. Users can play, pause, and skip songs based on the number of votes. The host can create a room, set initial permissions, and update play/pause permissions and the number of votes to skip in the room settings.

## Video Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/UvDX3srAN_8?si=M2KPdGbn8K-s6KuT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Getting Started

Follow these steps to run the HouseParty application on your local machine.

## Prerequisites
Make sure you have the following installed on your machine:

Python

Django

Node.js

npm (Node Package Manager)

## Installation

Clone the HouseParty repository to your local machine:

```
git clone https://github.com/jemimafayokun/HouseParty.git
```

Navigate to project directory:

```
cd HouseParty
```

Install backend dependencies:

```
cd music_controller
pip install -r requirements.txt
```

Migrate the Django database:

```
python manage.py migrate
```

Navigate to the frontend directory:

```
cd music-controller
cd frontend
```

Install frontend dependencies:

```
npm install
```

Arart backend server:
```
python manage.py runserver

```
This will start the Django backend server on a specified port

Start the frontend development server:
```
npm run dev
```
## Usage:

## Host A Party
Visit the HouseParty application at http://localhost:3000.
Click on the "Create a Room" button.
Set the initial permissions and the number of votes to skip in the room settings.
Share the unique room code with your friends.

## Join a Room  
Visit the HouseParty application at http://localhost:3000.
Click on the "Join a Room" button.
Enter the unique room code provided by the host.

## Update Room Settings (Host Only)
Click on the "Settings" button in the room.
Update play/pause permissions and the number of votes to skip.
Save the changes.

## Control Music
As a host, you can control music playback and skip songs based on the number of votes.
Guests can play/pause music and vote to skip songs.
