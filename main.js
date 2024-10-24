const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const exec = require('child_process').exec;
const robot = require('robotjs');  // สำหรับ Windows

function createWindow() {
    const win = new BrowserWindow({
        width: 700,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// รับ event สำหรับคีย์ลัด Ctrl + 1 ถึง Ctrl + 6
ipcMain.on('ctrl-shortcut', (event, number) => {
    if (number >= 1 && number <= 6) {
        if (process.platform === 'darwin') {
            // สำหรับ macOS ใช้ osascript
            exec(`osascript -e 'tell application "System Events" to key code ${number + 17} using {control down}'`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Ctrl + ${number} on macOS: ${error}`);
                    return;
                }
                console.log(`Ctrl + ${number} command sent on macOS.`);
            });
        } else if (process.platform === 'win32') {
            // สำหรับ Windows ใช้ robotjs
            robot.keyTap(number.toString(), 'control');
            console.log(`Ctrl + ${number} command sent on Windows.`);
        }
    }
});