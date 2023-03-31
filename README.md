# Node.js REST API with Encryption

This is a simple project for a REST API application that stores user personal data in a MySQL database. The server is made using Express.js, and the ORM Prisma is used to communicate with the database. All user data is encrypted using AES encryption with a secret key stored in an environment variable.

The personal data to be saved is Indonesia citizenship data including:

-   Nama
-   NIK
-   Jenis Kelamin
-   Telefon
-   Email
-   Alamat
-   Pekerjaan
-   Golongan Darah

For Primary Key, UUID is used instead of incremental integer.

## Setup

1. Clone the repository: `git clone https://github.com/hdytrfli/DataEncryption.git`
2. Install dependencies
3. Set up your environment variables by creating a `.env` file in the root directory and assigning your environment variables to it.
4. Set up the MySQL database with the specified name in the `.env` file.
5. Run the database migration: `npx prisma migrate dev`
6. Start the server: `npm start`

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

You also need to create a .env file in the root directory of the project with the following contents:

## env

```bash
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
SECRET_KEY="your_secret_key_here"
NODE_ENV="development"
PORT="port_number"
```

## Database

The user data is stored in a MySQL database using the Prisma ORM. The schema is defined in the prisma/schema.prisma file. You can create the database tables by running the following command:

```bash
npx prisma migrate dev
```

## Encryption

The user data is encrypted before it is stored in the database using the crypto-js library. The encryption is performed on each attribute of the user data separately. When the data is retrieved from the database, the server performs decryption on each attribute. The encryption key is stored in the SECRET_KEY environment variable.

## Endpoints

The following endpoints are available:

-   `POST /api/v1/users`: Create a new user with the given data.
-   `GET /api/v1/users`: Get all users.
-   `GET /api/v1/users/generate?number=<number>`: Generate <number> new users.
-   `DELETE /api/v1/users/all`: Delete all users.

## Pros and Cons

### Pros:

-   User data is securely encrypted, protecting it from unauthorized access.
-   Using an ORM makes it easy to work with the database and ensures that the data is stored in a consistent format.
-   The project is modular and well-organized, making it easy to understand and maintain.
-   The project includes automated tests to ensure that everything is working as expected.

### Cons:

-   The encryption and decryption process can add additional overhead to the server, potentially affecting performance.
-   The use of an ORM can add some complexity to the project and may not be necessary for smaller projects.
