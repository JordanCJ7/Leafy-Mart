# VS Code Development Setup 🚀

This project is configured for optimal VS Code development experience with automated terminal management and debugging support.

## Quick Start

### Option 1: Open Workspace File
1. Open `plant-store.code-workspace` in VS Code
2. Both frontend and backend terminals will start automatically
3. Ready to develop! 🎉

### Option 2: Open Folder
1. Open the project folder in VS Code
2. The development environment will auto-start
3. Frontend runs on `http://localhost:3000`
4. Backend runs on `http://localhost:5000`

## Available Commands

### Keyboard Shortcuts
- **Ctrl+Shift+F5**: Start full application (both servers)
- **Ctrl+Shift+B**: Start backend server only
- **Ctrl+Shift+R**: Start frontend client only

### Command Palette Tasks
Press `Ctrl+Shift+P` and type "Tasks: Run Task", then select:
- `Start Full Application` - Starts both frontend and backend
- `Start Backend Server` - Starts only the Node.js server
- `Start Frontend Client` - Starts only the React development server

## Terminal Management

### Automatic Setup
- **Backend Terminal**: Runs `cd server && npx nodemon server.js`
- **Frontend Terminal**: Runs `cd client && npm start`
- Both terminals open in separate, dedicated panels
- Background process monitoring for automatic restart

### Manual Control
If you need to restart servers manually:
```bash
# Backend (in server folder)
npx nodemon server.js

# Frontend (in client folder)  
npm start
```

## Debugging Support

### Debug Configurations
- **Launch React App**: Debug React frontend
- **Launch Backend Server**: Debug Node.js backend  
- **Launch Full Application**: Debug both simultaneously

### How to Debug
1. Set breakpoints in your code
2. Press `F5` or go to Run and Debug panel
3. Select the appropriate launch configuration
4. Debug with full VS Code integration!

## Configuration Files

| File | Purpose |
|------|---------|
| `.vscode/tasks.json` | Terminal automation and build tasks |
| `.vscode/launch.json` | Debug configurations |
| `.vscode/settings.json` | Workspace-specific settings |
| `.vscode/keybindings.json` | Custom keyboard shortcuts |
| `plant-store.code-workspace` | Workspace definition file |

## Recommended Extensions

The workspace suggests these helpful extensions:
- **Node.js Extension Pack**: Backend development tools
- **Prettier**: Code formatting
- **Path Intellisense**: Autocomplete for file paths
- **Auto Rename Tag**: HTML/JSX tag synchronization

## Troubleshooting

### Terminals Don't Start Automatically
1. Close all terminals (`Ctrl+Shift+`` ` then close each)
2. Reload VS Code window (`Ctrl+Shift+P` → "Reload Window")
3. Tasks should restart automatically

### Port Already in Use
```bash
# Kill processes using ports 3000 or 5000
npx kill-port 3000 5000
```

### Dependencies Missing
```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies  
cd client && npm install
```

## Features

✅ **Automatic terminal setup** - No manual terminal management  
✅ **Hot reload** - Changes reflect immediately  
✅ **Parallel execution** - Frontend and backend run simultaneously  
✅ **Error monitoring** - Problems panel shows compilation errors  
✅ **Debug support** - Full debugging for both React and Node.js  
✅ **Keyboard shortcuts** - Quick access to common tasks  

Happy coding! 🌿💚
