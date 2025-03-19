# NOTE: This website is considered as COMPLETE
- Latest NextJS Update: 13.5.6

# OA Robotics Quiz Application

This Next.js application provides an interactive quiz platform designed for OA Robotics team members. It allows users to test their knowledge through a series of questions with multiple answers per question.

## Features

### User Authentication
- User identification via username storage in localStorage
- Admin detection and special privileges for authorized users

### Quiz Selection
- Multiple test types available for different topics
- Team and category selection functionality

### Quiz Interface
- Multi-answer question format where users can select all applicable answers
- Navigation between questions with previous and next buttons
- Progress tracking through the test
- Real-time score display for admin users

### Scoring System
- Automatic scoring for admin users
- Score calculation based on correct answers
- Pass/fail determination
- Results storage and submission

### UI Elements
- Clean, modern interface with custom styling
- Google Fonts integration (Work Sans 300/500)
- Responsive design for various devices

## Technical Implementation

### Frontend
- Built with React and Next.js
- TypeScript for type safety
- SCSS modules for component-specific styling
- Font optimization using `next/font`

### State Management
- React hooks for local state management
- `useState` for handling quiz flow and user selections
- `useEffect` for data fetching and side effects

### API Integration
- RESTful API endpoints for:
    - Fetching quiz settings
    - Submitting answers
    - Retrieving admin information
    - Storing test results

### Data Handling
- JSON data structure for questions and answers
- Local storage for preserving user information across sessions
- Error handling with try/catch blocks

## Project Structure

The application follows Next.js conventions with:
- `/pages`: Route components including the test interface
- `/styles`: SCSS modules for component styling
- API routes for backend functionality

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Access the application at http://localhost:3000

## Usage Flow

1. User enters their name and selects a team/category
2. User selects a test type
3. Questions are presented one by one with multiple-choice answers
4. User navigates through questions and submits answers
5. Upon completion, results are displayed and stored
6. Admin users receive additional features including automatic scoring

## Technologies Used

- Next.js
- React
- TypeScript
- SCSS
- localStorage API
- Fetch API

## Future Enhancements

- User authentication with secure login
- Expanded question bank and test categories
- Detailed analytics for test performance
- Timed quiz options
- Mobile-optimized interface

## Contributing

Contributions to improve the application are welcome. Please follow the standard fork and pull request workflow.