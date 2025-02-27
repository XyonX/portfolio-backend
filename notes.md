express-server/
├── config/
│ ├── env.js # Environment configuration
│ └── database.js # Database connection setup
├── prisma/
│ ├── schema.prisma # Your Prisma schema
│ └── migrations/ # Generated migrations
├── src/
│ ├── controllers/
│ │ ├── blog.controller.js
│ │ ├── portfolio.controller.js
│ │ └── admin.controller.js
│ ├── routes/
│ │ ├── blog.routes.js
│ │ ├── portfolio.routes.js
│ │ ├── admin.routes.js
│ │ └── index.js # Combine all routes
│ ├── middleware/
│ │ ├── auth.js # Authentication middleware
│ │ ├── errorHandler.js
│ │ └── upload.js # File upload middleware
│ ├── services/
│ │ ├── blog.service.js
│ │ └── portfolio.service.js
│ ├── utils/
│ │ ├── logger.js
│ │ └── helpers.js
│ └── validators/ # Validation schemas
│ ├── blog.validator.js
│ └── portfolio.validator.js
├── public/ # Static files
│ └── uploads/ # Uploaded images
├── tests/ # API tests
├── .env # Environment variables
├── package.json
├── package-lock.json
├── app.js # Main application entry
└── server.js # Server startup
