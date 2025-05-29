
## 🛠 Tech Stack

* **Node.js**: Server-side JavaScript execution.
* **Express.js**: Fast, minimal backend framework for building APIs.
* **MongoDB**: NoSQL database to manage videos, users, interactions, and more.
* **Mongoose**: Schema-based ORM for MongoDB, enabling data modeling and validation.
* **Cloudinary**: For storing and delivering media assets like thumbnails, avatars, and video files.
* **Multer**: Middleware to manage file uploads via `multipart/form-data`.
* **JWT (JSON Web Tokens)**: For handling user sessions and protecting private routes.
* **Cookie-Parser**: Reads and parses cookies sent by clients.
* **CORS**: Enables secure cross-origin requests from frontend clients.
* **Dotenv**: Loads environment-specific configs from `.env` files.
* **Bcrypt**: Hashing utility to securely store user passwords.
* **Prettier**: Formatter to maintain clean, standardized code style.

---

## 📦 Core Features & Controllers

| Feature            | Controller               | Description                                                               |
| ------------------ | ------------------------ | ------------------------------------------------------------------------- |
| Authentication     | `UserController`         | Handles login, registration, logout, password updates, and profile edits. |
| Video Management   | `VideoController`        | Upload, fetch, and manage video content.                                  |
| Comment System     | `CommentController`      | Create, view, and delete comments under videos.                           |
| Social Interaction | `LikeController`         | Like/unlike functionality for videos and tweets.                          |
| Tweet Module       | `TweetController`        | Enables tweet-style posts within the app.                                 |
| Playlist System    | `PlaylistController`     | Create, edit, and delete user-defined video playlists.                    |
| Subscriptions      | `SubscriptionController` | Follow/subscribe to other users' content.                                 |


---

## ⚙️ Middlewares Used

Middlewares are used for tasks like request validation, session handling, error management, and more:

* Auth protection
* Error handling
* JSON body parsing
* Token validation
* File upload handling (via Multer)

---

## ☁️ Media Handling (Cloudinary + Multer)

* **Cloudinary** is used for uploading and storing user media (profile pictures, thumbnails, videos).
* **Multer** works alongside Cloudinary to handle incoming files in forms and API calls.

---

## 🔐 Auth with JWT

JWTs are used to create secure access and refresh tokens, allowing users to maintain sessions across devices. Each token carries user information securely and expires after a defined time for added protection.

---

## ✨ Development Tools

* **Prettier** ensures consistent code formatting.
* **Dotenv** simplifies environment management across development and production.
* **Bcrypt** strengthens password storage through secure hashing.

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mayank06711/backend-project
   cd backend-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file and define necessary variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_API_KEY=...
   ```

4. **Run the server**

   ```bash
   npm start
   ```

---

## 📚 API Docs

API reference and route descriptions can be found inside the `/docs` directory. Each endpoint includes details on method, path, payload, and expected responses.

---

## 🧑‍💻 Contributors

* **Mayank Soni** — Project architect and main developer
* **Hitesh Choudhary** — Inspiration & guidance through [this video](https://youtu.be/EH3vGeqeIAo?feature=shared)

---

## 🧩 Frontend Status

The React-based frontend is in progress. Axios will be used to interact with backend APIs, and the interface will mimic YouTube’s core UX flow with added social functionality.

---

Let me know if you want a **markdown file version**, a **GitHub-friendly badge layout**, or if you're integrating Swagger/OpenAPI.
