document.addEventListener('DOMContentLoaded', () => {
    // Left Panel Elements
    const dropArea = document.getElementById('drop-area');
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const fileListContainer = document.getElementById('file-list');
    const generatePreviewBtn = document.getElementById('generate-preview-button');
    const resetBtn = document.getElementById('reset-button');

    // Right Panel Elements
    const jsonPreviewPanel = document.getElementById('json-preview-panel');
    const jsonPreviewArea = document.getElementById('json-preview-area');
    const downloadJsonBtn = document.getElementById('download-json-button');
    const copyJsonBtn = document.getElementById('copy-json-button');

    let uploadedFiles = [];

    // --- File Handling ---
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#e9e9e9';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = 'transparent';
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = 'transparent';
        handleFiles(event.dataTransfer.files);
    });

    uploadButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
        let filesAdded = false;
        for (const file of files) {
            if (file.type.startsWith('image/') && !uploadedFiles.some(f => f.name === file.name)) {
                uploadedFiles.push(file);
                filesAdded = true;
            }
        }

        if (filesAdded) {
            // Sort the array using a natural sort for numbers in filenames
            uploadedFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

            // Clear and re-render the file list to show the sorted order
            fileListContainer.innerHTML = '';
            uploadedFiles.forEach(file => {
                const fileNameDiv = document.createElement('div');
                fileNameDiv.className = 'file-name';
                fileNameDiv.textContent = file.name;
                fileListContainer.appendChild(fileNameDiv);
            });
        }
    }

    // --- JSON Generation ---
    function generateJsonData() {
        if (uploadedFiles.length === 0) {
            alert('Please upload some images first.');
            return null;
        }
        const jsonData = { pages: {} };
        uploadedFiles.forEach((file, index) => {
            let pageData;
            if (index === 0) {
                // First page (title)
                pageData = {
                    bbox: "(103, 890, 929, 1001)",
                    lines: {
                        line1: {
                            text: " ",
                            font_name: "/app/websocket/Fonts/MYSTERYQUEST-REGULAR.TTF",
                            font_size: "38",
                            font_colour: "black"
                        }
                    }
                };
            } else {
                // Subsequent pages
                pageData = {
                    bbox: "(103, 890, 929, 1001)",
                    lines: {
                        line1: " "
                    }
                };
            }
            jsonData.pages[file.name] = pageData;
        });
        return JSON.stringify(jsonData, null, 2);
    }

    // --- Button Actions ---
    generatePreviewBtn.addEventListener('click', () => {
        const jsonString = generateJsonData();
        if (jsonString) {
            jsonPreviewArea.value = jsonString;
            jsonPreviewPanel.style.display = 'block';
        }
    });

    resetBtn.addEventListener('click', () => {
        uploadedFiles = [];
        fileListContainer.innerHTML = '';
        fileInput.value = '';
        jsonPreviewPanel.style.display = 'none';
        jsonPreviewArea.value = '';
    });

    downloadJsonBtn.addEventListener('click', () => {
        const jsonString = jsonPreviewArea.value;
        if (!jsonString) {
            alert('No JSON to download.');
            return;
        }
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'TMT-B-0000-QA1.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    copyJsonBtn.addEventListener('click', () => {
        const jsonString = jsonPreviewArea.value;
        if (!jsonString) {
            alert('No JSON to copy.');
            return;
        }
        navigator.clipboard.writeText(jsonString).then(() => {
            alert('JSON copied to clipboard!');
        }, (err) => {
            alert('Failed to copy JSON.');
            console.error('Could not copy text: ', err);
        });
    });
});