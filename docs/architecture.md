# Court Coder Architecture

This document outlines the architectural design and component structure of the Court Coder basketball playbook animator application.

## System Overview

Court Coder is a web-based application that enables basketball coaches to create, visualize, animate, and share basketball plays. The application is built with a modular architecture to facilitate future extensions and maintenance.

```
┌─────────────────────────────────────────────┐
│                                             │
│                 User Interface              │
│                                             │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│                                             │
│               UI Controller                 │
│                                             │
└───┬───────┬───────┬───────┬───────┬─────────┘
    │       │       │       │       │
    ▼       ▼       ▼       ▼       ▼
┌─────────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  Court  │ │Tools│ │Play-│ │Anim-│ │  AI  │
│Renderer │ │Mgr  │ │book │ │ation│ │Enhan-│
└─────────┘ └─────┘ └─────┘ └─────┘ └─────┘
```

## Component Structure

The application follows a modular component-based architecture where each component is responsible for a specific aspect of the application.

### Core Components

1. **UI Controller**: Coordinates all other components and manages user interactions
2. **Court Renderer**: Handles drawing the basketball court, players, and animations
3. **Tools Manager**: Manages the drawing tools and user interactions with the court
4. **Playbook Manager**: Handles saving, loading, and organizing plays
5. **Animation Controller**: Controls the animation playback and timing
6. **AI Enhancer**: Provides AI-powered enhancements to plays based on descriptions

### Data Flow

```
┌─────────────┐    ┌────────────┐    ┌────────────────┐
│ User Input  │───▶│ UI Events  │───▶│ State Updates  │
└─────────────┘    └────────────┘    └────────────────┘
                                            │
                                            ▼
┌─────────────┐    ┌────────────┐    ┌────────────────┐
│   Render    │◀───│ Components │◀───│ State Changes  │
└─────────────┘    └────────────┘    └────────────────┘
```

## State Management

The application uses a centralized state object (`appState`) that contains:

- Current play information
- Player positions and paths
- Court configuration
- Animation state
- UI state (selected tools, elements)

This state is passed to the relevant components and updated through the UI Controller.

## Technical Implementation

### Front-End Technologies

- **HTML5 Canvas**: For drawing and animating the court, players, and paths
- **JavaScript (ES6+)**: For application logic
- **CSS3**: For styling the user interface
- **Web Storage API**: For local storage of playbooks

### Component Details

#### Court Renderer

Responsible for:
- Drawing the basketball court with correct dimensions
- Rendering players, ball, and paths
- Managing visual updates during animation
- Coordinate transformations between court and screen space

#### Tools Manager

Responsible for:
- Managing the active drawing tool
- Handling mouse interactions on the canvas
- Creating and editing player paths
- Positioning and moving elements

#### Playbook Manager

Responsible for:
- Saving plays to local storage
- Loading plays from storage
- Organizing plays into categories
- Importing/exporting plays for sharing

#### Animation Controller

Responsible for:
- Controlling animation playback (play, pause, reset)
- Managing animation timing and speed
- Calculating intermediate positions along paths
- Synchronizing player and ball movements

#### AI Enhancer

Responsible for:
- Parsing natural language play descriptions
- Identifying play patterns (pick and roll, isolation, etc.)
- Generating realistic player and ball paths
- Optimizing timing and spacing

#### UI Controller

Responsible for:
- Handling all user interface interactions
- Coordinating between components
- Managing modals and dialogs
- Responding to keyboard shortcuts

## File Structure

```
/src
  /assets
    /images
      logo.svg
      favicon.png
      ...
  /styles
    main.css
  /js
    app.js
    /components
      CourtRenderer.js
      ToolsManager.js
      PlaybookManager.js
      AnimationController.js
      AIEnhancer.js
      UIController.js
      ExportManager.js
    /models
      Play.js
      Player.js
    /utils
      GeometryUtils.js
      StorageUtils.js
  index.html
```

## Future Extensions

The modular architecture allows for easy extension in several areas:

1. **Team Collaboration**: Adding real-time collaboration features
2. **API Integration**: Connecting to external basketball data sources
3. **Mobile Support**: Developing a companion mobile application
4. **Advanced AI**: Implementing more sophisticated AI analysis
5. **3D Visualization**: Upgrading to 3D rendering for more realistic visualization

## Development Workflow

1. **Local Development**: Run with `npm start` for a local development server
2. **Testing**: Run `npm test` to execute unit tests
3. **Production**: Build with `npm run build` for production assets