# Contributing to Court Coder

Thank you for your interest in contributing to Court Coder! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your forked repository:
   ```
   git clone https://github.com/YOUR-USERNAME/court-coder-playbook-animator.git
   ```
3. Add the original repository as upstream:
   ```
   git remote add upstream https://github.com/dxaginfo/court-coder-playbook-animator.git
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm start
   ```

## Development Guidelines

### Branching Strategy

- `main` - Production-ready code
- `dev` - Development branch
- Feature branches - Create from `dev` with format `feature/your-feature-name`
- Bug fix branches - Create from `dev` with format `fix/issue-description`

### Pull Request Process

1. Create a new branch from `dev` for your feature or fix
2. Make your changes, following our coding standards
3. Test your changes locally
4. Push your branch and create a pull request to the `dev` branch
5. Add appropriate labels and descriptions to your PR
6. Wait for code review and address any feedback
7. Once approved, your PR will be merged

### Coding Standards

- Follow JavaScript Standard Style
- Use meaningful variable and function names
- Include comments for complex logic
- Write unit tests for new features
- Ensure browser compatibility (Chrome, Firefox, Safari, Edge)

## Project Structure

```
├── src/
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable UI components
│   ├── models/          # Data structures and models
│   ├── services/        # Business logic and API calls
│   ├── utils/           # Helper functions
│   ├── views/           # Main application views
│   ├── app.js           # Application entry point
│   └── index.html       # Main HTML file
├── public/              # Static files
├── tests/               # Test files
├── docs/                # Documentation
└── README.md            # Project overview
```

## Feature Requests and Bug Reports

Please use GitHub Issues to report bugs or request features. When reporting a bug, please include:

1. Clear description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser and OS information
6. Screenshots if applicable

## Communication

- GitHub Issues for bug reports and feature requests
- GitHub Discussions for general questions and ideas
- Pull Requests for code contributions

## License

By contributing to Court Coder, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).