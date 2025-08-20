### Portfolio/Blog Backend (Express + MongoDB)

Robust Express.js backend for a personal portfolio and blog. Supports admin auth, CRUD for blogs and portfolios, file uploads for featured images and Markdown content, and static serving of uploaded assets.

---

## Features

- **API**: REST endpoints for `blogs` and `portfolios` with slug-based retrieval
- **Uploads**: Image and Markdown file upload via `multer`, with local disk storage in `uploads/`
- **Content handling**: Reads Markdown file into `content` and computes `readTime`
- **Admin auth**: Register/login with JWT; intended to use an HTTP-only cookie
- **CORS**: Configured for local dev and production domains
- **MongoDB/Mongoose**: Data persistence with schemas for `Blog`, `Portfolio`, and `Admin`

---

## Tech Stack

- Node.js, Express.js
- MongoDB with Mongoose
- Multer for file uploads
- JSON Web Tokens (JWT)
- dotenv, cors, helmet (available), bcrypt/argon2 (bcrypt currently used)

Note: `@prisma/client` and `prisma` are listed but not used.

---

## Project Structure

```text
server/
├── app.js
├── server.js
├── package.json
├── .gitignore
├── vercel.json
├── config/
│   ├── database.js
│   └── env.js
├── content/
│   └── blogs/
│       ├── markdown-full-example.md
│       └── nft-marketplace-in-react-js-next-typescript-full-guide.md
├── src/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── blog.contoller.js
│   │   └── portfolio.controller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── model/
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   └── Portfolio.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── blog.routes.js
│   │   ├── portfolio.routes.js
│   │   └── index.js
│   ├── services/
│   │   ├── blog.service.js
│   │   └── portfolio.service.js
│   ├── utils/
│   │   ├── helper.js
│   │   ├── logger.js
│   │   └── mdProcessor.js
│   └── validators/
│       ├── blog.validator.js
│       └── portfolio.validator.js
└── uploads/
    └── ... (runtime uploaded files)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or cloud)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=replace-with-a-strong-secret
NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001
```

### Run the server

```bash
npm start
```

Server listens on `http://localhost:${PORT}` (defaults to `3001`).

---

## CORS

Configured in `app.js` to allow:

- `http://localhost:3000`
- `https://joycodes.tech`
- `https://www.joycodes.tech`

Adjust `origin` as needed for your frontend domains.

---

## Data Models (Mongoose)

- **Blog**: `title`, `description`, `content`, `publicationDate`, `categories[]`, `tags[]`, `featuredImage`, `mdFile`, `status` (draft|published|archived), `slug` (unique), `readTime`, `isFeatured`, timestamps
- **Portfolio**: mirrors `Blog` shape with `isFeatured`, timestamps
- **Admin**: `username` (unique), `password` (bcrypt-hashed), `role` (default `admin`)

Note: `mdFile` and `content` are required in both `Blog` and `Portfolio`.

---

## Uploads

- Storage: Local filesystem `uploads/`
- Fields accepted per request: `featuredImage` (1) and `mdFile` (1)
- Limits: 2 files total, max 5MB each
- Validation:
  - `featuredImage`: MIME must start with `image/`
  - `mdFile`: one of `text/markdown`, `text/plain`, or `application/octet-stream`
- Static access: files are served at `/uploads/<filename>`

---

## Authentication

Login issues a JWT and sets an HTTP-only cookie named `token`:

- `POST /api/auth/login` -> sets `Set-Cookie: token=...`

Protected routes expect the cookie to be present and valid.

Important: To read cookies in requests, you must install and mount `cookie-parser` middleware. This repository references `req.cookies` in `src/middleware/auth.js` but does not currently mount the parser. Add the following to `app.js`:

```js
import cookieParser from "cookie-parser";
app.use(cookieParser());
```

Alternatively, switch to the commented Bearer token approach in `auth.js` and send `Authorization: Bearer <token>` headers.

---

## API Reference

Base URL: `http://localhost:3001`

### Health

- `GET /` → "server running on vercel"

### Admin Auth

- `POST /api/auth/register`
  - body: `{ "username": string, "password": string }`
  - response: `201` on success

- `POST /api/auth/login`
  - body: `{ "username": string, "password": string }`
  - response: `200` with `Set-Cookie: token=<jwt>`; body `{ message: "Login successful" }`

### Blogs

- `GET /api/blogs`
  - query: none
  - response: `{ data: Blog[] }`

- `GET /api/blogs/:slug`
  - response: `{ data: Blog }` or `404`

- `POST /api/blogs`
  - content-type: `multipart/form-data`
  - fields:
    - text: `title`, `description`, `slug`, `publicationDate?`, `categories?` (comma-separated), `tags?` (comma-separated), `status?` (draft|published|archived)
    - files: `featuredImage` (image), `mdFile` (markdown/text)
  - response: `201 { message, data }`

- `PUT /api/blogs/:id` (protected)
  - body: JSON with updatable fields
  - response: `200 { message, data }` or `404`

- `DELETE /api/blogs/:id` (protected)
  - response: `200 { message }` or `404`

### Portfolios

- `GET /api/portfolios`
- `GET /api/portfolios/:slug`
- `POST /api/portfolios` (same multipart fields as blogs)
- `PUT /api/portfolios/:id` (protected)
- `DELETE /api/portfolios/:id` (protected)

---

## Example Requests

### Register admin

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"StrongPass123!"}'
```

### Login admin (stores cookie)

```bash
curl -i -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"StrongPass123!"}'
```

### Create blog with files

```bash
curl -X POST http://localhost:3001/api/blogs \
  -H "Accept: application/json" \
  -F "title=My First Post" \
  -F "description=Short intro" \
  -F "slug=my-first-post" \
  -F "categories=tech,personal" \
  -F "tags=javascript,node" \
  -F "status=published" \
  -F "featuredImage=@/absolute/path/to/image.png" \
  -F "mdFile=@/absolute/path/to/content.md"
```

### Update blog (requires auth cookie)

```bash
curl -X PUT http://localhost:3001/api/blogs/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: token=<jwt>" \
  -d '{"title":"Updated Title"}'
```

### Delete blog (requires auth cookie)

```bash
curl -X DELETE http://localhost:3001/api/blogs/<id> \
  -H "Cookie: token=<jwt>"
```

---

## Implementation Notes

- `content` is read from the uploaded Markdown file and persisted; `readTime` is computed using a 200 wpm heuristic
- Uploaded file paths are stored in `featuredImage` and `mdFile` fields (e.g., `/uploads/<filename>`)
- Static serving of uploads is configured in `app.js`: `app.use("/uploads", express.static(...))`

---

## Known Gaps / TODOs

- Mount `cookie-parser` to enable cookie-based auth, or switch to Bearer header auth in `auth.js`
- Apply `authenticate` middleware to `POST` routes if you want only admins to create entries
- Implement centralized error handling in `src/middleware/errorHandler.js` and mount it in `app.js`
- Add request body validation in `src/validators/*`
- Remove Prisma deps or integrate Prisma if desired
- Add production storage (e.g., S3) for uploads if deploying to stateless environments
- Add tests and a dev script with `nodemon`

---

## Deployment

- Ensure `MONGODB_URI`, `JWT_SECRET`, and CORS origins are configured for your environment
- For platforms without persistent storage, replace local `uploads/` with cloud storage
- `vercel.json` is present, but a monolithic Express server may need a custom setup or serverless adaptation to run on Vercel

---

## License

ISC (see `package.json`)
