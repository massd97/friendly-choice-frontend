# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c8619341-0b9a-4dd6-9578-61d31961e19b

## Frontend Architecture Documentation

### Overview
This application is a soil management system built with React, TypeScript, and modern web technologies. It helps users track and manage soil resources across different locations.

### Key Components

1. **Main Layout (Index.tsx)**
   - Serves as the main container for the application
   - Implements a tab-based navigation system
   - Manages global state for sites and transactions

2. **Core Features**
   - **Live Feed**: Real-time activity tracking of soil transactions and new site registrations
   - **Available Sites**: List of locations with available soil
   - **Transaction History**: Record of all soil transfers
   - **Soil Map**: Interactive Google Maps integration showing site locations

3. **Component Structure**
   - `LiveFeed.tsx`: Displays real-time updates in a scrollable feed
   - `AvailableSites.tsx`: Shows searchable list of sites with soil
   - `TransactionHistory.tsx`: Lists all transactions with filtering
   - `SoilMap.tsx`: Interactive map showing site locations
   - `SiteDetails.tsx`: Displays detailed information about each site

### State Management
- Uses React's built-in state management with useState
- Implements @tanstack/react-query for data fetching
- Maintains separate states for sites, transactions, and UI elements

### UI/UX Features
- Fully responsive design using Tailwind CSS
- Shadcn UI components for consistent styling
- Interactive elements with proper loading states
- Search and filter capabilities
- Toast notifications for user feedback

### Technologies Used
- React + TypeScript
- Tailwind CSS for styling
- Shadcn UI for components
- Google Maps API for mapping
- React Query for data management

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c8619341-0b9a-4dd6-9578-61d31961e19b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c8619341-0b9a-4dd6-9578-61d31961e19b) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
