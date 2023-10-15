## Requirements

### Backend
- Node.js
- Express
- Typescript
- AJV for validation

### Frontend
- React.js
- Sass
- Typescript
- Axios
- ESLint

## Running 

### Easiest way, Docker-Compose

**Workdir:** `.`

The easiest way to run the application would be docker-compose as it just needs the following command to run. The `-d` flag will detach the containers from shell window. 

```bash
docker-compose up -d
```

This will run the backend at http://localhost:1955 and frontend at http://localhost:3000 addresses.

---

### Docker

#### Backend

**Workdir:** `./backend`

- To run the backend, first an image need to be built:

    ```bash
    docker build -t <backend_image_name> . 
    ```

- After image is built succesfully the following command will expose the application at http://localhost:1955.

    ```bash
    docker run -p 1955:1955 -t <backend_image_name>
    ```

#### Frontend

**Workdir:** `./frontend`

- To run the frontend, we again build the image
    ```bash
    docker build -t <frontend_image_name> .
    ```

- Then we run the application mapping any port you like to port 3000. The following command will run the application on http://localhost:3000.
    ```bash
    docker run -p 3000:3000 -t <frontend_image_name>
    ```

##### Note: If you change the port for backend or backend container is not running the frontend application wont work. 

---

### Without Docker

#### Backend

**Workdir:** `./backend`

- Firstly, install the needed packages

    ```bash
    npm install
    ```

- After installation completes run the following commands to run production build of the application

    ```bash
    npm run build
    npm run serve
    ```

#### Frontend
**Workdir:** `./frontend`

- Install node packages with the following commands
    ```bash
    npm install
    ```

- After installation is completed run the dev version of the application with the following. It will expose the server on https://localhost:3000.

    ```bash
    npm run dev
    ```

---


### Used Images

- Earth.mp4: https://file-examples.com/wp-content/storage/2017/04/file_example_MP4_1920_18MG.mp4
- yoga.jpg: https://fastly.picsum.photos/id/773/1920/1080.jpg?hmac=xHjIy64fLO6YUzH_xUPZRBOIOt-B-sbjPALFK_kWgis
- bench.jpg: https://fastly.picsum.photos/id/87/1920/1080.jpg?hmac=5hCHyva1-DTTvjRUH6GPv_iItloGvI3THfEap0wRKLs
