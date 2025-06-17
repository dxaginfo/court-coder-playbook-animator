# Court Coder - Basketball Playbook Animator

Court Coder is an AI-powered web application that enables basketball coaches at all levels to easily create, animate, and share basketball plays with their teams.

## 🏀 Overview

Creating basketball playbooks has traditionally been a manual and time-consuming process. Court Coder streamlines this workflow by combining an intuitive drag-and-drop interface with generative AI to help coaches:

1. Quickly diagram plays with realistic player and ball movement
2. Generate natural animations from simple diagrams and text descriptions
3. Create shareable playbooks for team distribution
4. Save time and communicate plays more effectively

## ✨ Key Features

### Court Designer
- Full-court and half-court templates
- Customizable court markings (NBA, NCAA, FIBA, High School)
- Ability to add team branding and colors

### Play Creation Tools
- Simple drag-and-drop player positioning
- Intuitive path drawing for player and ball movement
- Player role assignments (PG, SG, SF, PF, C)
- Opponent defensive positioning options

### AI Enhancement
- Natural language play description processing
- Realistic timing and physics for animations
- Automatic player spacing optimization
- Play variation suggestions

### Playbook Management
- Organize plays by categories (offense, defense, inbounds, etc.)
- Add notes and coaching points to each play
- Export plays as videos, GIFs, or interactive web links
- Team sharing and access controls

## 🔧 Technical Architecture

### Frontend
- HTML5 Canvas for drawing and animation
- Vanilla JavaScript with minimal dependencies
- Responsive design for desktop and tablet use
- SVG-based player and court elements

### Backend
- Node.js REST API for play storage and retrieval
- WebSocket connections for real-time collaboration (future)
- Lightweight AI models for play enhancement

### AI Components
- Natural language processing for play descriptions
- Animation physics engine for realistic movement
- Player spacing optimization algorithms

## 🚀 Development Roadmap

### MVP (Current Release)
- Basic court designer with standard templates
- Player and ball positioning with manual path creation
- Simple animation playback
- Local storage for play saving

### Phase 2
- AI-enhanced play animation based on text descriptions
- Expanded playbook organization features
- Basic team sharing functionality
- Video/GIF export options

### Future Enhancements
- Real-time collaborative editing
- Advanced animation physics
- Integration with video analysis tools
- Mobile app for on-court access

## 📝 Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Visit `http://localhost:3000` in your browser

## 🔗 Live Demo

Try the current version at [https://court-coder-demo.herokuapp.com](https://court-coder-demo.herokuapp.com) (Coming soon)

## 🤝 Contributing

We welcome contributions from the basketball and development communities! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the needs of basketball coaches at all levels
- Special thanks to the basketball coaching community for feedback and suggestions