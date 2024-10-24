const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

// สร้างหน้าต่างหลักของแอป
function createWindow() {
    const win = new BrowserWindow({
        width: 700,
        height: 100,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true, // เปิดใช้งาน nodeIntegration สำหรับการใช้ Node.js API ใน renderer
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

// เริ่มต้นแอป
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// รับ event จาก renderer สำหรับการกด CMD + TAB
// ipcMain.on('cmd-tab', () => {
//     exec(`osascript -e 'tell application "System Events" to keystroke "a" using {command down}'`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing CMD + A: ${error}`);
//             return;
//         }
//         console.log('CMD + A command sent.');
//     });
// });

// รับ event สำหรับคีย์ลัด Ctrl + 1 ถึง Ctrl + 6
ipcMain.on('ctrl-shortcut', (event, number) => {
    if (number >= 1 && number <= 6) {
        exec(`osascript -e 'tell application "System Events" to key code ${number + 17} using {control down}'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Ctrl + ${number}: ${error}`);
                return;
            }
            console.log(`Ctrl + ${number} command sent.`);
        });
    }
});