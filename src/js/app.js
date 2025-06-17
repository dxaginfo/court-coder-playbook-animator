/**
 * Court Coder - Basketball Playbook Animator
 * Main Application JavaScript
 */

// Import modules
import { CourtRenderer } from './components/CourtRenderer.js';
import { PlaybookManager } from './components/PlaybookManager.js';
import { AnimationController } from './components/AnimationController.js';
import { ToolsManager } from './components/ToolsManager.js';
import { AIEnhancer } from './components/AIEnhancer.js';
import { ExportManager } from './components/ExportManager.js';
import { UIController } from './components/UIController.js';

// Global state
const appState = {
    currentPlay: {
        name: '',
        category: 'offense',
        notes: '',
        courtType: 'nba',
        isFullCourt: false,
        players: [],
        paths: [],
        ball: null,
        ballPath: null,
        duration: 8 // Animation duration in seconds
    },
    currentTool: 'move',
    isPlaying: false,
    playbackSpeed: 1,
    currentTime: 0,
    selectedElement: null,
    savedPlays: []
};

// Main app initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const canvas = document.getElementById('courtCanvas');
    const ctx = canvas.getContext('2d');
    
    const courtRenderer = new CourtRenderer(canvas, ctx);
    const playbookManager = new PlaybookManager(appState);
    const animationController = new AnimationController(appState, courtRenderer);
    const toolsManager = new ToolsManager(canvas, appState);
    const aiEnhancer = new AIEnhancer();
    const exportManager = new ExportManager(canvas, appState);
    const uiController = new UIController(
        appState, 
        courtRenderer,
        playbookManager,
        animationController,
        toolsManager,
        aiEnhancer,
        exportManager
    );
    
    // Load any saved plays from localStorage
    playbookManager.loadSavedPlays();
    
    // Initialize UI event listeners
    initEventListeners(uiController);
    
    // Initial render
    courtRenderer.render(appState);
});

/**
 * Initialize all event listeners for the application
 * @param {UIController} uiController - The UI controller instance
 */
function initEventListeners(uiController) {
    // Court type selectors
    document.getElementById('fullCourt').addEventListener('click', () => uiController.setCourtType(true));
    document.getElementById('halfCourt').addEventListener('click', () => uiController.setCourtType(false));
    document.getElementById('courtType').addEventListener('change', (e) => uiController.changeCourtStyle(e.target.value));
    
    // Tool selection
    document.getElementById('moveTool').addEventListener('click', () => uiController.selectTool('move'));
    document.getElementById('pathTool').addEventListener('click', () => uiController.selectTool('path'));
    document.getElementById('eraseTool').addEventListener('click', () => uiController.selectTool('erase'));
    document.getElementById('clearAll').addEventListener('click', () => uiController.clearCanvas());
    
    // Player dragging
    const playerTools = document.querySelectorAll('.player-tool');
    playerTools.forEach(tool => {
        tool.addEventListener('dragstart', (e) => uiController.handlePlayerDragStart(e, tool.dataset.role));
    });
    
    const canvas = document.getElementById('courtCanvas');
    canvas.addEventListener('dragover', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => uiController.handlePlayerDrop(e));
    
    // Canvas interaction
    canvas.addEventListener('mousedown', (e) => uiController.handleCanvasMouseDown(e));
    canvas.addEventListener('mousemove', (e) => uiController.handleCanvasMouseMove(e));
    canvas.addEventListener('mouseup', () => uiController.handleCanvasMouseUp());
    
    // Animation controls
    document.getElementById('playAnimation').addEventListener('click', () => uiController.playAnimation());
    document.getElementById('pauseAnimation').addEventListener('click', () => uiController.pauseAnimation());
    document.getElementById('resetAnimation').addEventListener('click', () => uiController.resetAnimation());
    document.getElementById('speedControl').addEventListener('input', (e) => uiController.setPlaybackSpeed(parseFloat(e.target.value)));
    
    // Timeline scrubbing
    const scrubber = document.querySelector('.timeline-scrubber');
    scrubber.addEventListener('mousedown', (e) => uiController.handleScrubberMouseDown(e));
    document.addEventListener('mousemove', (e) => uiController.handleScrubberMouseMove(e));
    document.addEventListener('mouseup', () => uiController.handleScrubberMouseUp());
    
    // AI Enhancement
    document.getElementById('enhancePlay').addEventListener('click', () => {
        const description = document.getElementById('playDescription').value;
        uiController.enhancePlayWithAI(description);
    });
    
    // Play details
    document.getElementById('playName').addEventListener('input', (e) => uiController.updatePlayDetails('name', e.target.value));
    document.getElementById('playCategory').addEventListener('change', (e) => uiController.updatePlayDetails('category', e.target.value));
    document.getElementById('playNotes').addEventListener('input', (e) => uiController.updatePlayDetails('notes', e.target.value));
    
    // Save and load actions
    document.getElementById('savePlay').addEventListener('click', () => uiController.saveCurrentPlay());
    document.getElementById('loadPlay').addEventListener('click', () => uiController.showLoadPlayDialog());
    
    // Export options
    document.getElementById('exportPlay').addEventListener('click', () => uiController.showExportModal());
    document.getElementById('exportVideo').addEventListener('click', () => uiController.exportAsVideo());
    document.getElementById('exportGif').addEventListener('click', () => uiController.exportAsGif());
    document.getElementById('exportLink').addEventListener('click', () => uiController.generateSharableLink());
    document.querySelector('.copy-link').addEventListener('click', () => uiController.copyShareableLink());
    
    // Modal handling
    document.getElementById('helpButton').addEventListener('click', () => uiController.showHelpModal());
    
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => uiController.closeAllModals());
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => uiController.handleKeyDown(e));
    
    // Window resize handling
    window.addEventListener('resize', () => uiController.handleWindowResize());
}

// Mock export to prevent errors until component files are created
export default appState;