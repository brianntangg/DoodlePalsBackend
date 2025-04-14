# DoodlePals Backend

## Overview
The server-side component of DoodlePals that handles data persistence, authentication, and API services for the drawing application. This backend uses Firebase services and custom API endpoints to support the interactive features of the DoodlePals platform.

## Architecture
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Firebase Admin SDK**: Server-side Firebase integration
- **Cloud Firestore**: NoSQL database for user and doodle storage
- **Firebase Authentication**: User management and security

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "doodles": []
}
```

### Doodle
```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "imageData": "string",
  "likes": ["userId"],
  "comments": {"username": "string"},
  "createdAt": "timestamp"
}
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase project with Firestore and Authentication enabled

### Environment Setup
1. Clone the repository
   ```bash
   git clone https://github.com/username/doodlepal-backend.git
   cd doodlepal-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory with the following variables:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   JWT_SECRET=your-jwt-secret
   PORT=8080
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Database Setup
- Create Firestore database with appropriate security rules
- Initialize required collections:
  - users
  - doodles
  - comments
  - friend_requests

## Performance Considerations
- Doodle data is stored as optimized SVG or compressed bitmap
- Image processing is performed client-side before upload
- Pagination implemented for feed and gallery endpoints
- Caching strategy implemented for frequent requests

## Security
- JWT authentication for all protected routes
- Firebase security rules for direct Firestore access
- Rate limiting on public endpoints
- Input validation for all API requests
