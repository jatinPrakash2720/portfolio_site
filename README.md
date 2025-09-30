Dynamic Portfolio Platform - Next.js & Firebase
Welcome to this dynamic portfolio platform, a modern and performant application designed to showcase projects and profiles. It is built with a server-first architecture using a cutting-edge tech stack, ensuring scalability, excellent SEO, and a professional-grade codebase.

Live Demo: [suspicious link removed] (Replace with your actual URL after deployment)

✨ Features
Dynamic Content: All profile and project data is fetched from a backend, allowing for easy updates without code changes.

Server-Side Rendering (SSR): Pages are rendered on the server for blazing-fast load times and optimal SEO performance.

Scalable Backend: Built on Firebase Firestore, a serverless NoSQL database that is fast, flexible, and has a generous free tier.

Modular & Type-Safe Codebase: Follows a professional structure with a clear separation of concerns (services, validation, types) for maintainability.

🛠️ Tech Stack & Architecture
This project leverages Next.js as a full-stack framework, with its server-side capabilities securely communicating with the Firebase Firestore database.

Technology

Role

Next.js 14

Framework (App Router, Server Components)

React 18

UI Library

TypeScript

Language & Type Safety

Tailwind CSS

Styling

Firebase Firestore

Database (NoSQL)

Zod

Schema & Data Validation

Vercel

Deployment & Hosting

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (v18.17.0 or later)

npm or yarn

Installation & Setup
Clone the repository and install dependencies:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
npm install

Set up your Firebase Project:

Go to the Firebase Console and create a new project.

In the project dashboard, enable Firestore Database (start in production mode).

Go to Project settings -> General -> Your apps.

Create a new Web app (</>) and copy the firebaseConfig object that is provided.

Configure Environment Variables:

In the root of your project, create a new file named .env.local.

Stringify your firebaseConfig object and add it as the value for NEXT_PUBLIC_FIREBASE_CONFIG.

.env.local

# Stringified JSON of your Firebase config object
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'

Run the development server:

npm run dev
