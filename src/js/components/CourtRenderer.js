/**
 * Court Renderer
 * Responsible for drawing the basketball court, players, and paths
 */

export class CourtRenderer {
    /**
     * Create a new CourtRenderer
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context
     */
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Court dimensions in feet (NBA standard)
        this.courtDimensions = {
            nba: {
                width: 50,
                length: 94,
                keyWidth: 16,
                keyLength: 19,
                threePointRadius: 23.75,
                threePointStraightLength: 14,
                circleRadius: 6,
                rimRadius: 0.75,
                backboardWidth: 6,
                backboardOffset: 4
            },
            ncaa: {
                width: 50,
                length: 94,
                keyWidth: 12,
                keyLength: 19,
                threePointRadius: 20.75,
                threePointStraightLength: 0, // College three-point line is a complete arc
                circleRadius: 6,
                rimRadius: 0.75,
                backboardWidth: 6,
                backboardOffset: 4
            },
            fiba: {
                width: 15, // in meters
                length: 28, // in meters
                keyWidth: 4.9, // in meters
                keyLength: 5.8, // in meters
                threePointRadius: 6.75, // in meters
                threePointStraightLength: 3, // in meters
                circleRadius: 1.8, // in meters
                rimRadius: 0.225, // in meters
                backboardWidth: 1.8, // in meters
                backboardOffset: 1.2 // in meters
            },
            highSchool: {
                width: 50,
                length: 84,
                keyWidth: 12,
                keyLength: 19,
                threePointRadius: 19.75,
                threePointStraightLength: 0,
                circleRadius: 6,
                rimRadius: 0.75,
                backboardWidth: 6,
                backboardOffset: 4
            }
        };
        
        // Player and ball rendering properties
        this.playerRadius = 15;
        this.ballRadius = 10;
        
        // Colors (could be customized in the future)
        this.colors = {
            court: '#e9b25d',
            lines: '#303030',
            playerOffense: '#3182ce',
            playerDefense: '#e53e3e',
            ball: '#d97706',
            paths: '#4a5568',
            selectedElement: '#38b2ac',
            text: '#ffffff'
        };
    }
    
    /**
     * Render the court, players, and paths
     * @param {Object} appState - The current application state
     */
    render(appState) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw the court
        this.drawCourt(appState.currentPlay.courtType, appState.currentPlay.isFullCourt);
        
        // Draw player paths
        appState.currentPlay.paths.forEach(path => {
            this.drawPath(path, appState.currentTime);
        });
        
        // Draw ball path if exists
        if (appState.currentPlay.ballPath) {
            this.drawBallPath(appState.currentPlay.ballPath, appState.currentTime);
        }
        
        // Draw players at their current positions
        appState.currentPlay.players.forEach(player => {
            this.drawPlayer(player, appState.currentTime, player === appState.selectedElement);
        });
        
        // Draw ball if exists
        if (appState.currentPlay.ball) {
            this.drawBall(appState.currentPlay.ball, appState.currentTime, 
                appState.currentPlay.ball === appState.selectedElement);
        }
    }
    
    /**
     * Draw the basketball court
     * @param {string} courtType - The type of court (nba, ncaa, fiba, highSchool)
     * @param {boolean} isFullCourt - Whether to draw a full court or half court
     */
    drawCourt(courtType, isFullCourt) {
        const dimensions = this.courtDimensions[courtType];
        const courtWidth = dimensions.width;
        const courtLength = isFullCourt ? dimensions.length : dimensions.length / 2;
        
        // Calculate scale to fit the court on canvas
        const scaleX = (this.canvas.width - 20) / courtWidth;
        const scaleY = (this.canvas.height - 20) / courtLength;
        this.scale = Math.min(scaleX, scaleY);
        
        // Center the court on canvas
        this.offsetX = (this.canvas.width - courtWidth * this.scale) / 2;
        this.offsetY = (this.canvas.height - courtLength * this.scale) / 2;
        
        // Draw court background
        this.ctx.fillStyle = this.colors.court;
        this.ctx.fillRect(this.offsetX, this.offsetY, courtWidth * this.scale, courtLength * this.scale);
        
        // Draw court outline
        this.ctx.strokeStyle = this.colors.lines;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.offsetX, this.offsetY, courtWidth * this.scale, courtLength * this.scale);
        
        // Draw center line if full court
        if (isFullCourt) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.offsetX, this.offsetY + courtLength * this.scale / 2);
            this.ctx.lineTo(this.offsetX + courtWidth * this.scale, this.offsetY + courtLength * this.scale / 2);
            this.ctx.stroke();
            
            // Draw center circle
            this.ctx.beginPath();
            this.ctx.arc(
                this.offsetX + courtWidth * this.scale / 2,
                this.offsetY + courtLength * this.scale / 2,
                dimensions.circleRadius * this.scale,
                0, Math.PI * 2
            );
            this.ctx.stroke();
        }
        
        // Draw baseline features (at the bottom for half court, both ends for full court)
        this.drawBaselineFeatures(dimensions, this.offsetX, this.offsetY + courtLength * this.scale, 1);
        
        if (isFullCourt) {
            this.drawBaselineFeatures(dimensions, this.offsetX, this.offsetY, -1);
        }
    }
    
    /**
     * Draw baseline features (key, backboard, rim, etc.)
     * @param {Object} dimensions - Court dimensions
     * @param {number} baseX - Starting X coordinate
     * @param {number} baselineY - Baseline Y coordinate
     * @param {number} direction - Direction (-1 for top, 1 for bottom)
     */
    drawBaselineFeatures(dimensions, baseX, baselineY, direction) {
        const { keyWidth, keyLength, threePointRadius, threePointStraightLength, 
                circleRadius, rimRadius, backboardWidth, backboardOffset } = dimensions;
        
        // Draw the key (free throw lane)
        this.ctx.strokeRect(
            baseX + (dimensions.width * this.scale - keyWidth * this.scale) / 2,
            baselineY - direction * keyLength * this.scale,
            keyWidth * this.scale,
            direction * keyLength * this.scale
        );
        
        // Draw free throw circle
        this.ctx.beginPath();
        this.ctx.arc(
            baseX + dimensions.width * this.scale / 2,
            baselineY - direction * keyLength * this.scale,
            circleRadius * this.scale,
            0, Math.PI * 2
        );
        this.ctx.stroke();
        
        // Draw backboard
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(
            baseX + (dimensions.width * this.scale - backboardWidth * this.scale) / 2,
            baselineY - direction * backboardOffset * this.scale
        );
        this.ctx.lineTo(
            baseX + (dimensions.width * this.scale + backboardWidth * this.scale) / 2,
            baselineY - direction * backboardOffset * this.scale
        );
        this.ctx.stroke();
        
        // Draw rim
        this.ctx.beginPath();
        this.ctx.arc(
            baseX + dimensions.width * this.scale / 2,
            baselineY - direction * (backboardOffset + 1.5) * this.scale,
            rimRadius * this.scale,
            0, Math.PI * 2
        );
        this.ctx.stroke();
        
        // Draw three-point line
        this.ctx.beginPath();
        
        // Draw the straight portions of the three-point line
        if (threePointStraightLength > 0) {
            this.ctx.moveTo(baseX, baselineY - direction * threePointStraightLength * this.scale);
            this.ctx.lineTo(baseX, baselineY);
            
            this.ctx.moveTo(baseX + dimensions.width * this.scale, baselineY - direction * threePointStraightLength * this.scale);
            this.ctx.lineTo(baseX + dimensions.width * this.scale, baselineY);
        }
        
        // Draw the arc of the three-point line
        const centerX = baseX + dimensions.width * this.scale / 2;
        const centerY = baselineY - direction * (backboardOffset + 1.5) * this.scale;
        
        let startAngle, endAngle;
        if (threePointStraightLength > 0) {
            // For NBA-style three-point line with straight portions
            const threePointWidth = dimensions.width;
            const angle = Math.acos((threePointWidth / 2) / threePointRadius);
            
            startAngle = Math.PI - angle;
            endAngle = angle;
            
            if (direction === -1) {
                startAngle = Math.PI * 2 - angle;
                endAngle = Math.PI + angle;
            }
        } else {
            // For college-style three-point line (full semicircle)
            startAngle = direction === 1 ? Math.PI : 0;
            endAngle = direction === 1 ? 0 : Math.PI;
        }
        
        this.ctx.arc(
            centerX,
            centerY,
            threePointRadius * this.scale,
            startAngle,
            endAngle,
            direction === 1
        );
        
        this.ctx.stroke();
        this.ctx.lineWidth = 2;
    }
    
    /**
     * Draw a player at the specified position
     * @param {Object} player - The player object
     * @param {number} currentTime - Current animation time
     * @param {boolean} isSelected - Whether the player is selected
     */
    drawPlayer(player, currentTime, isSelected) {
        const position = this.getPositionAtTime(player, currentTime);
        
        // Draw circle for player
        this.ctx.beginPath();
        this.ctx.arc(
            position.x,
            position.y,
            this.playerRadius,
            0, Math.PI * 2
        );
        
        // Fill with player color
        this.ctx.fillStyle = player.isDefender ? this.colors.playerDefense : this.colors.playerOffense;
        this.ctx.fill();
        
        // Draw selection indicator if selected
        if (isSelected) {
            this.ctx.strokeStyle = this.colors.selectedElement;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        
        // Draw player role text
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(player.role.toUpperCase(), position.x, position.y);
    }
    
    /**
     * Draw the ball
     * @param {Object} ball - The ball object
     * @param {number} currentTime - Current animation time
     * @param {boolean} isSelected - Whether the ball is selected
     */
    drawBall(ball, currentTime, isSelected) {
        const position = this.getPositionAtTime(ball, currentTime);
        
        // Draw circle for ball
        this.ctx.beginPath();
        this.ctx.arc(
            position.x,
            position.y,
            this.ballRadius,
            0, Math.PI * 2
        );
        
        // Create radial gradient for ball
        const gradient = this.ctx.createRadialGradient(
            position.x - 3, position.y - 3, 1,
            position.x, position.y, this.ballRadius
        );
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(1, this.colors.ball);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Draw selection indicator if selected
        if (isSelected) {
            this.ctx.strokeStyle = this.colors.selectedElement;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        
        // Draw ball seams
        this.ctx.beginPath();
        this.ctx.arc(
            position.x,
            position.y,
            this.ballRadius * 0.8,
            0, Math.PI * 2
        );
        this.ctx.strokeStyle = '#7c2d12';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(
            position.x,
            position.y,
            this.ballRadius * 0.4,
            0, Math.PI * 2
        );
        this.ctx.stroke();
    }
    
    /**
     * Draw a player's movement path
     * @param {Object} path - The path object
     * @param {number} currentTime - Current animation time
     */
    drawPath(path, currentTime) {
        if (!path || !path.points || path.points.length < 2) return;
        
        // Draw the complete path with lower opacity
        this.ctx.beginPath();
        this.ctx.moveTo(path.points[0].x, path.points[0].y);
        
        for (let i = 1; i < path.points.length; i++) {
            this.ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        
        this.ctx.strokeStyle = this.colors.paths;
        this.ctx.globalAlpha = 0.4;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
        
        // Draw the portion of the path that has been "traveled"
        if (currentTime > 0 && path.duration > 0) {
            const progress = Math.min(currentTime / path.duration, 1);
            const targetIndex = Math.floor(progress * (path.points.length - 1));
            
            if (targetIndex > 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(path.points[0].x, path.points[0].y);
                
                for (let i = 1; i <= targetIndex; i++) {
                    this.ctx.lineTo(path.points[i].x, path.points[i].y);
                }
                
                // If we're in between points, draw to the intermediate position
                if (targetIndex < path.points.length - 1 && progress > 0) {
                    const segmentProgress = (progress * (path.points.length - 1)) % 1;
                    const nextPoint = path.points[targetIndex + 1];
                    const currentPoint = path.points[targetIndex];
                    
                    const intermediateX = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
                    const intermediateY = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;
                    
                    this.ctx.lineTo(intermediateX, intermediateY);
                }
                
                this.ctx.strokeStyle = this.colors.paths;
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }
        }
    }
    
    /**
     * Draw the ball's movement path
     * @param {Object} path - The ball path object
     * @param {number} currentTime - Current animation time
     */
    drawBallPath(path, currentTime) {
        // Use the same path drawing logic but with a different style
        this.colors.paths = '#d97706'; // Ball color
        this.drawPath(path, currentTime);
        this.colors.paths = '#4a5568'; // Reset path color
    }
    
    /**
     * Get the position of an element at the specified time
     * @param {Object} element - The element (player or ball)
     * @param {number} currentTime - Current animation time
     * @returns {Object} - The position {x, y}
     */
    getPositionAtTime(element, currentTime) {
        // If the element has no path or animation isn't playing, return its static position
        if (!element.path || !element.path.points || element.path.points.length === 0) {
            return { x: element.x, y: element.y };
        }
        
        const path = element.path;
        const points = path.points;
        
        // If we're at the beginning of the animation, return the first point
        if (currentTime <= 0) {
            return { x: points[0].x, y: points[0].y };
        }
        
        // If we're at or past the end of the animation, return the last point
        if (currentTime >= path.duration) {
            return { x: points[points.length - 1].x, y: points[points.length - 1].y };
        }
        
        // Calculate progress along the path
        const progress = currentTime / path.duration;
        const targetIndex = Math.floor(progress * (points.length - 1));
        
        // If we're exactly at a point, return that point
        if (progress * (points.length - 1) === targetIndex) {
            return { x: points[targetIndex].x, y: points[targetIndex].y };
        }
        
        // Otherwise, interpolate between the nearest points
        const segmentProgress = (progress * (points.length - 1)) % 1;
        const currentPoint = points[targetIndex];
        const nextPoint = points[targetIndex + 1];
        
        return {
            x: currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress,
            y: currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress
        };
    }
    
    /**
     * Convert court coordinates to canvas coordinates
     * @param {number} x - X coordinate in court units
     * @param {number} y - Y coordinate in court units
     * @returns {Object} - The converted coordinates {x, y}
     */
    courtToCanvasCoordinates(x, y) {
        return {
            x: this.offsetX + x * this.scale,
            y: this.offsetY + y * this.scale
        };
    }
    
    /**
     * Convert canvas coordinates to court coordinates
     * @param {number} x - X coordinate on canvas
     * @param {number} y - Y coordinate on canvas
     * @returns {Object} - The converted coordinates {x, y}
     */
    canvasToCourtCoordinates(x, y) {
        return {
            x: (x - this.offsetX) / this.scale,
            y: (y - this.offsetY) / this.scale
        };
    }
}