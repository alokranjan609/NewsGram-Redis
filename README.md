# Newsgram

**Newsgram** is a web application that fetches news articles from an API and displays them on a webpage. It includes a server-side component that handles news fetching and integrates caching using Redis to enhance performance.

## Features

- **Server-Side News Fetching:** Handles fetching news from the API.
- **Redis Caching:** Caches news articles in Redis to reduce redundant API calls.
- **Automatic Cache Expiration:** Cached content is automatically expired after a set period (e.g., 60 minutes).
- **Efficient API Usage:** Reduces load on the external news API by using cached results when available.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js/Express
- **Caching:** Redis

## Installation

### Clone the Repository
```bash
  git clone https://github.com/alokranjan609/NewsGram-Redis
  cd newsgram
```
### Install Dependencies
- **Server**
```bash
    cd server
    npm install
```
- **Client**
```bash
  cd ../client
  npm install
```
### Set Up Redis
```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
### Environment Variables
- Create a .env file in the server directory with the following content:
```bash
GNEWS_API_KEY=your_news_api_key
```
### Run the Application
- Start the Backend Server
```bash
cd server
npm start
```
- Start the Frontend Client
```bash
cd ../client
npm start
```
### Access the Application
Open your browser and visit http://localhost:3000 to view the application.

## How It Works
- Query Handling: The server checks if the query result is cached in Redis.
- Cache Hit: Returns cached data if available, improving response time.
- Cache Miss: Fetches data from the API, stores it in Redis, and returns the result.
- Cache Expiration: Cached data expires after a specified period to ensure fresh content.

## Contributions
Contributions are welcome! Please open issues, submit pull requests, or provide suggestions.
