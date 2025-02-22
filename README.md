# ESSTIC

A Vue.js application with blue and white theming.

## Project Setup


# Install dependencies
npm install

# Serve for development
npm run serve

# Build for production
npm run build


## Theme Colors

The application uses two main colors:
- Primary Color (Blue): #0066cc
- Background Color (White): #ffffff

Theme variables can be found and modified in `src/assets/styles/variables.scss`.

## Registration Features

The application includes a multi-step candidate registration process with the following steps:
- Civil Status
- Education
- Professional Experience
- Extra Activities
- Divers Information
- Review

Each step is managed through a progress stepper that visually indicates the current position in the registration flow.

## Routes

The application includes the following main routes:
- `/`: Home page
- `/all-routes`: All routes page
- `/about`: About page
- `/entrance-exam`: Entrance examination page
- `/candidate-registration`: Multi-step candidate registration form
