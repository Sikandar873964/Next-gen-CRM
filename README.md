# Next-Gen-CRM 

Built using Next.js 14 with App Router, the Next Gen CRM is capable of: -

- CRUD Operations on Users, Customers, Products and Enquiries
- Role Based Access Control for Users
- Login and Signup functionality
- Server side code execution with Next.js' server actions

## Prerequisites
The following must be installed on your computer to run this project locally:
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## Running the Project

To run the project locally, follow these steps:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
   This will start the development server on http://localhost:3000.

3. **Build the project for production:**
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `.next` directory
   
4. **Start the production server:**
   ```bash
   npm start
   ```
   This will start the server using the production build.

## Dependencies

- Next.js: The React framework used for building the dashboard.
- Tailwind CSS: For styling the components.
- Shadcn/ui: For reusable radix UI derived components.
- MongoDB: For the database

A full list of dependencies can be viewed in `package.json`

## Environment Variables

The below should be used within the `.env` file in root directory for the project to work locally: -
```
MONGO = MongoDB connection URI
AUTH_SECRET = any_random_secret_key
AUTH_URL = http://localhost:3000/api/auth
```
The `AUTH_URL` will be changed to the deployment/access link in a production environment.

## Deployment
This project is deployed using `Vercel`. It uses automatic deployments with each commit using Git intergration, with deployment status visible right in the repository.

## Reference documentation

Below is the documentation for each of the tools used to build this CRM system: -

- [Next.js](https://nextjs.org/docs)
- [Shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [MongoDB](https://www.mongodb.com/docs/)

<hr>

Made by Sikandar Butt
