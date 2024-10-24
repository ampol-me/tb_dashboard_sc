const { ipcRenderer } = require('electron');

// เมื่อมีการกดปุ่ม CMD + TAB ให้ส่ง event ไปที่ main process
// document.getElementById('cmd-tab').addEventListener('click', () => {
//     ipcRenderer.send('cmd-tab');
// });

// เพิ่ม event listener สำหรับ Ctrl + 1 ถึง Ctrl + 6
document.getElementById('ctrl-1').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 1);
});
document.getElementById('ctrl-2').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 2);
});
document.getElementById('ctrl-3').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 3);
});
document.getElementById('ctrl-4').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 4);
});
document.getElementById('ctrl-5').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 5);
});
document.getElementById('ctrl-6').addEventListener('click', () => {
    ipcRenderer.send('ctrl-shortcut', 6);
});

// ฟังก์ชันสำหรับเพิ่มตัวอักษรใน textarea
// document.addEventListener("DOMContentLoaded", function () {
//     const keys = document.querySelectorAll(".key");
//     const output = document.getElementById("output");

//     keys.forEach((key) => {
//         key.addEventListener("click", () => {
//             const keyValue = key.textContent.trim();

//             if (keyValue !== "CMD + TAB" && !keyValue.startsWith("Ctrl")) {
//                 output.value += keyValue;
//             }

//             // ตั้ง focus กลับไปที่ textarea หลังจากมีการกดปุ่ม
//             output.focus();
//         });
//     });
// });