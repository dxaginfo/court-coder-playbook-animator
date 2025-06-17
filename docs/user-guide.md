# Court Coder User Guide

Welcome to Court Coder! This guide will help you get started with creating, animating, and sharing basketball plays.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating a Play](#creating-a-play)
3. [Animating Players](#animating-players)
4. [Using AI Enhancement](#using-ai-enhancement)
5. [Saving and Managing Plays](#saving-and-managing-plays)
6. [Exporting and Sharing](#exporting-and-sharing)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### System Requirements

Court Coder is a web-based application that works best with:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Desktop or tablet device (minimum screen size 768px width)
- Internet connection for initial loading (can work offline afterward)

### Accessing Court Coder

1. Visit [https://court-coder-demo.herokuapp.com](https://court-coder-demo.herokuapp.com) in your browser
2. No login required - your plays are saved locally in your browser

### Interface Overview

The Court Coder interface consists of three main panels:

- **Left Panel**: Tools for court setup, player positioning, and drawing
- **Center Panel**: Basketball court canvas where you create and visualize plays
- **Right Panel**: Play details, notes, and saved playbook management

## Creating a Play

### Setting Up the Court

1. Choose **Full Court** or **Half Court** from the left panel
2. Select a court type (NBA, NCAA, FIBA, High School) to match your needs

### Adding Players to the Court

1. Drag player icons from the left panel onto the court
   - Use **PG**, **SG**, **SF**, **PF**, **C** for offensive players
   - Use **D** for defensive players
   - Use the ball icon for the basketball
2. Position them as desired on the court
3. Use the **Move** tool to reposition players after initial placement

### Naming and Categorizing Your Play

1. Enter a name for your play in the right panel
2. Select a category (Offense, Defense, Inbound, etc.)
3. Add coaching notes or execution tips in the notes section

## Animating Players

### Creating Movement Paths

1. Select the **Path** tool from the left panel
2. Click on a player to select them
3. Click on the court to create waypoints for the player's movement
4. The path will appear as a line connecting the waypoints
5. Repeat for each player you want to move

### Animating the Ball

1. Select the **Path** tool
2. Click on the ball to select it
3. Create a path for the ball, including passes between players
4. The ball will follow this path during animation

### Playing the Animation

Use the playback controls below the court:
- **Play** (▶): Start the animation
- **Pause** (⏸): Pause the animation
- **Reset** (⟲): Return to starting positions
- **Speed slider**: Adjust animation speed (0.5x to 2.0x)

## Using AI Enhancement

The AI Enhancement feature can automatically create or improve player movements based on a text description.

### Enhancing an Existing Play

1. Position your players on the court
2. In the "AI Enhancement" section, enter a description of the desired play
   - Example: "Pick and roll with the center, leading to a corner three by the shooting guard"
3. Click the **Enhance Play** button
4. The AI will generate paths for your players based on the description
5. You can manually adjust the paths afterward if needed

### Creating a Play from Scratch with AI

1. Set up your court type and add players to their starting positions
2. Provide a detailed description of the play you want to create
3. Click **Enhance Play**
4. Review and refine the generated animation

### Effective Description Tips

- Mention specific player positions (PG, C, etc.)
- Specify actions (screen, cut, pass, shoot)
- Include locations (corner, wing, post, top of the key)
- Mention timing if relevant (quick, delayed, after the screen)

## Saving and Managing Plays

### Saving a Play

1. Complete your play setup and animation
2. Click the **Save Play** button in the top navigation
3. Your play will be saved to your local playbook

### Loading a Saved Play

1. Click the **Load Play** button in the top navigation
2. Select a play from your saved playbook
3. The play will load into the editor for viewing or editing

### Organizing Your Playbook

The right panel shows your saved plays organized by category. You can:
- Click on a play to view its details
- Use the category dropdown to filter plays
- Edit play details and re-save to update

## Exporting and Sharing

### Export Options

Click the **Export** button to access sharing options:

1. **Video**: Export as an MP4 video file
2. **GIF**: Create an animated GIF
3. **Interactive Link**: Generate a shareable link that others can open in Court Coder

### Sharing with Your Team

- **Email**: Send the exported video/GIF or link directly
- **Messaging Apps**: Share the exports via your team's communication platform
- **Print**: For static plays, use the browser's print function to create printable diagrams

## Keyboard Shortcuts

Speed up your workflow with these keyboard shortcuts:

| Key       | Action                 |
|-----------|------------------------|
| Space     | Play/Pause animation   |
| R         | Reset animation        |
| M         | Select Move tool       |
| P         | Select Path tool       |
| E         | Select Erase tool      |
| Delete    | Delete selected element|
| Ctrl+S    | Save current play      |
| Ctrl+Z    | Undo last action       |
| Ctrl+Y    | Redo last action       |
| Esc       | Close open dialogs     |

## Troubleshooting

### Common Issues

**Play won't save**
- Check that you've given your play a name
- Ensure you have local storage enabled in your browser

**Animation appears jerky**
- Try reducing the number of waypoints in your paths
- Adjust the animation speed to be slower
- Close other browser tabs to free up resources

**Exported video is not working**
- Try exporting as a GIF instead, which has better compatibility
- Make sure your play isn't too long (keep under 30 seconds)

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [FAQ section](https://court-coder-demo.herokuapp.com/faq) on our website
2. Join our [community forum](https://github.com/dxaginfo/court-coder-playbook-animator/discussions) for help from other coaches
3. Contact support at courtcoder.support@example.com

---

Thank you for using Court Coder! We hope it helps you create and communicate your basketball plays more effectively.