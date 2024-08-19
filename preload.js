const { ipcRenderer } = require("electron");

window.selectFile = () => {
  return new Promise((resolve) => {
    ipcRenderer.once("selected-file", (event, filePath) => {
      resolve(filePath);
    });
    ipcRenderer.send("select-file");
  });
};

window.selectSavePath = () => {
  return new Promise((resolve) => {
    ipcRenderer.once("selected-save-path", (event, filePath) => {
      resolve(filePath);
    });
    ipcRenderer.send("select-save-path");
  });
};

window.convertTxtToVcf = (txtPath, vcfPath) => {
  return new Promise((resolve) => {
    ipcRenderer.once("convert-txt-to-vcf-result", (event, result) => {
      resolve(result);
    });
    ipcRenderer.send("convert-txt-to-vcf", { txtPath, vcfPath });
  });
};
window.selectDirectory = () => {
  return new Promise((resolve) => {
    ipcRenderer.once("selected-directory", (event, filePath) => {
      resolve(filePath);
    });
    ipcRenderer.send("select-directory");
  });
};
