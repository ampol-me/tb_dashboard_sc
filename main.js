const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { keyboard, Key, Modifier } = require('@nut-tree-fork/nut-js/nut-js');  // ใช้ nut.js แทน robotjs
const exec = require('child_process').exec;

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
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
ipcMain.on('ctrl-shortcut', async (event, number) => {
    if (number >= 1 && number <= 6) {
        if (process.platform === 'darwin') {
            // สำหรับ macOS ใช้ osascript
            const keyCode = number + 17;  // key code 18 สำหรับ 1, key code 19 สำหรับ 2, และอื่น ๆ
            exec(`osascript -e 'tell application "System Events" to key down control' -e 'delay 0.1' -e 'tell application "System Events" to key code ${keyCode}' -e 'delay 0.1' -e 'tell application "System Events" to key up control'`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Ctrl + ${number} on macOS: ${error}`);
                    return;
                }
                console.log(`Ctrl + ${number} command sent on macOS.`);
            });
        } else if (process.platform === 'win32') {
            // สำหรับ Windows ใช้ nut.js แทน robotjs
            try {
                // กดปุ่ม Ctrl ค้างไว้
                await keyboard.pressKey(Modifier.CTRL);

                // กดปุ่มหมายเลขตามมา
                await keyboard.pressKey(Key[number.toString()]);
                await keyboard.releaseKey(Key[number.toString()]);

                // ปล่อยปุ่ม Ctrl
                await keyboard.releaseKey(Modifier.CTRL);

                console.log(`Ctrl + ${number} command sent on Windows.`);
            } catch (error) {
                console.error(`Error executing Ctrl + ${number} on Windows: ${error}`);
            }
        }
    }
});