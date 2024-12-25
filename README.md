Here is the full `README.md` file you can directly copy and use:

---

# Woodstore

Woodstore is an e-commerce platform for managing and selling wood products. The repository contains the `client` (frontend) and `server` (backend) applications.

## Project Structure

```
woodstore/
├── client/          # React frontend
├── server/          # Node.js backend
├── docker-compose.yml # Orchestrates client, server, and MongoDB
└── README.md        # Project documentation
```

## Prerequisites

Ensure the following tools are installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for local development without Docker, if required)

---

## Getting Started

### Using Docker for Development

This project is fully configured for development with Docker. Both the `client` and `server` are containerized and can be started with a single command.

### Steps to Start:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/woodstore.git
   cd woodstore
   ```

2. **Start Services with Docker**:
   Run the following command to build and start all services (frontend, backend, and MongoDB):
   ```bash
   docker-compose up --build
   ```

3. **Access Services**:
   - **Frontend (React)**: [http://localhost:3000](http://localhost:3000)
   - **Backend (Node.js)**: [http://localhost:3001](http://localhost:3001)
   - **MongoDB**: Accessible at `localhost:27017` (use MongoDB Compass or CLI)

4. **Live Reload**:
   - Changes to `client` or `server` code will automatically reflect in the running containers.

5. **Stop Services**:
   To stop all running containers:
   ```bash
   docker-compose down
   ```

---

## Client (React)

### Development Details

The client application is built using React and is containerized with Docker.

### Local Development without Docker

If you prefer running the React client outside Docker:

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the client at [http://localhost:3000](http://localhost:3000).

### Docker Configuration

- **Dockerfile**:
  Located in `client/Dockerfile`.
- **Port**:
  Exposed on `3000`.

---

## Server (Node.js)

### Development Details

The backend application is built using Node.js with Express and MongoDB as the database. It uses Mongoose for database interaction.

### Local Development without Docker

If you prefer running the Node.js backend outside Docker:

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the backend at [http://localhost:3001](http://localhost:3001).

### Docker Configuration

- **Dockerfile**:
  Located in `server/Dockerfile`.
- **Environment Variables**:
  Add a `.env` file in the `server` folder with the following:
  ```env
  PORT=3001
  MONGO_URI=mongodb://mongo:27017/woodstore
  JWT_SECRET=your-secret-key
  ```

---

## MongoDB

### Docker Configuration

- MongoDB is configured as a service in the `docker-compose.yml`.
- Data is persisted using a Docker volume named `mongo-data`.

### Accessing MongoDB Locally

You can use tools like [MongoDB Compass](https://www.mongodb.com/products/compass) or the CLI to connect to the MongoDB instance running on `localhost:27017`.

---

## Environment Variables

The project uses environment variables to configure the backend and client. These should be stored in `.env` files as follows:

### Server `.env`

Place this in `server/.env`:

```env
PORT=3001
MONGO_URI=mongodb://mongo:27017/woodstore
JWT_SECRET=your-secret-key
```

### Client `.env`

Place this in `client/.env` (if needed for APIs or configurations):

```env
REACT_APP_API_URL=http://localhost:3001
```

---

## Live Reload in Docker

To enable live reload during development, Docker volumes are used to mount local code changes into the containers. This ensures that changes in the `client` or `server` folder are reflected immediately.

---

## Useful Commands

### Build and Start Services
```bash
docker-compose up --build
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Rebuild Containers
```bash
docker-compose up --build
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```

---

You can now copy this file as your `README.md`. Let me know if you need additional adjustments! 🚀