const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog,
  contextBridge,
} = require("electron");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const dbPath = path.join(__dirname, "database.sqlite");
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
}

let db = new sqlite3.Database(dbPath);
const scriptsDir = path.join(__dirname, "scripts");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, phone TEXT, callback_url TEXT, status TEXT, verification_code TEXT, send_count INTEGER, description TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY, contactsFilePath TEXT, avatarFilePath TEXT, sessionFilePath TEXT, friendsFilePath TEXT)"
  );
});
const appExpress = express();
appExpress.use(cors());
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({ extended: true }));

appExpress.get("/api/directory", (req, res) => {
  const directoryPath = req.query.path || "/";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(files);
  });
});

appExpress.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

appExpress.post("/contacts", (req, res) => {
  const {
    phone,
    callback_url,
    status,
    verification_code,
    send_count,
    description,
  } = req.body;
  db.run(
    "INSERT INTO contacts (phone, callback_url, status, verification_code, send_count, description) VALUES (?, ?, ?, ?, ?, ?)",
    [phone, callback_url, status, verification_code, send_count, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

appExpress.post("/api/config", (req, res) => {
  const config = req.body;
  db.run(
    "INSERT OR REPLACE INTO config (id, contactsFilePath, avatarFilePath, sessionFilePath, friendsFilePath) VALUES (1, ?, ?, ?, ?)",
    [
      config.contactsFilePath,
      config.avatarFilePath,
      config.sessionFilePath,
      config.friendsFilePath,
    ],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    }
  );
});
//获取配置信息
appExpress.get("/api/config", (req, res) => {
  db.get("SELECT * FROM config WHERE id = 1", [], (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(row);
    }
  });
});

appExpress.put("/contacts/:id", (req, res) => {
  const {
    phone,
    callback_url,
    status,
    verification_code,
    send_count,
    description,
  } = req.body;
  const { id } = req.params;
  db.run(
    "UPDATE contacts SET phone = ?, callback_url = ?, status = ?, verification_code = ?, send_count = ?, description = ? WHERE id = ?",
    [
      phone,
      callback_url,
      status,
      verification_code,
      send_count,
      description,
      id,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

appExpress.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM contacts WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});
appExpress.delete("/contacts", (req, res) => {
  db.run("DELETE FROM contacts", function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "All contacts deleted successfully" });
  });
});

appExpress.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const lines = data.split("\n");
    const stmt = db.prepare(
      "INSERT INTO contacts (phone, callback_url, status, verification_code, send_count, description) VALUES (?, ?, ?, ?, ?, ?)"
    );
    lines.forEach((line) => {
      const [phone, callback_url] = line.split("----");
      stmt.run([phone, callback_url, "pending", "", 0, ""]);
    });
    stmt.finalize();
    res.json({
      message: "File uploaded and data imported successfully",
      code: 200,
    });
  });
  // const filePath = req.file.path;
  // fs.readFile(filePath, 'utf8', (err, data) => {
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //     return;
  //   }
  //   const lines = data.split('\n');
  //   const stmt = db.prepare("INSERT INTO contacts (phone, callback_url, status, verification_code, send_count, description) VALUES (?, ?, ?, ?, ?, ?)");
  //   lines.forEach(line => {
  //     const [phone, callback_url] = line.split('----');
  //     stmt.run([phone, callback_url, 'pending', '', 0, '']);
  //   });
  //   stmt.finalize();

  //   // 删除临时文件
  //   fs.unlink(filePath, err => {
  //     if (err) console.error('Error deleting file:', err);
  //   });

  //   res.json({ message: 'File uploaded and data imported successfully' });
  // });
});
// 获取所有脚本文件
appExpress.get("/scripts", (req, res) => {
  fs.readdir(scriptsDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directories");
    }
    res.json(files);
  });
});

// 获取特定脚本内容
appExpress.get("/scripts/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(scriptsDir, filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

appExpress.listen(3001, () => {
  console.log("API server listening on port 3001");
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 980,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
  // 创建菜单模板
  const template = [
    {
      label: "文件",
      submenu: [
        {
          label: "Open",
          click: () => {
            dialog
              .showOpenDialog(mainWindow, {
                properties: ["openFile"],
                filters: [{ name: "Text Files", extensions: ["txt"] }],
              })
              .then((result) => {
                if (!result.canceled) {
                  mainWindow.webContents.send(
                    "selected-file",
                    result.filePaths[0]
                  );
                }
              });
          },
        },
        {
          label: "保存",
          click: () => {
            dialog
              .showSaveDialog(mainWindow, {
                defaultPath: "contacts.vcf",
                filters: [{ name: "VCF Files", extensions: ["vcf"] }],
              })
              .then((result) => {
                if (!result.canceled) {
                  mainWindow.webContents.send(
                    "selected-save-path",
                    result.filePath
                  );
                }
              });
          },
        },
        { type: "separator" },
        { label: "Exit", click: () => app.quit() },
      ],
    },
    {
      label: "编辑",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
        { role: "selectall" },
      ],
    },
    {
      label: "查看",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "窗口",
      submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "About",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "About",
              message: "Txt to VCF Converter",
              detail: "Version 1.0.0\n\nCreated by Your Name",
            });
          },
        },
      ],
    },
  ];

  // 构建菜单
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("convert-txt-to-vcf", async (event, { txtPath, vcfPath }) => {
  try {
    const txtContent = fs.readFileSync(txtPath, "utf-8");
    const vcfContent = txtContent
      .split("\n")
      .map((line) => `BEGIN:VCARD\nVERSION:3.0\n${line}\nEND:VCARD`)
      .join("\n");
    fs.writeFileSync(vcfPath, vcfContent);
    event.reply("convert-txt-to-vcf-result", { success: true });
  } catch (error) {
    event.reply("convert-txt-to-vcf-result", { success: false });
  }
});

ipcMain.on("select-file", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });
  if (!result.canceled) {
    event.reply("selected-file", result.filePaths[0]);
  }
});

ipcMain.on("select-save-path", async (event) => {
  const result = await dialog.showSaveDialog({
    defaultPath: "contacts.vcf",
    filters: [{ name: "VCF Files", extensions: ["vcf"] }],
  });
  if (!result.canceled) {
    event.reply("selected-save-path", result.filePath);
  }
});
ipcMain.on("select-directory", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (!result.canceled) {
    event.reply("selected-directory", result.filePaths[0]);
  }
});
