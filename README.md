# IMAGE to JSON Converter

This is a simple web-based tool to generate a JSON structure from a list of uploaded image filenames.

## How to Use

1.  **Upload Images:** Drag and drop image files into the designated area, or use the "Select Files" button to upload them.
2.  **Generate Preview:** Once the files are uploaded, click the "Generate Preview" button.
3.  **Preview and Download:** The generated JSON will appear in the right-hand panel. You can then download the JSON file or copy it to your clipboard.
4.  **Reset:** Click the "Reset" button to clear the uploaded files and the JSON preview.

## JSON Structure

The generated JSON file has a `pages` object, where each key is the filename of an uploaded image. The structure for each page is as follows:

*   **First Image:**
    ```json
    "image_name.jpg": {
        "bbox": "(103, 890, 929, 1001)",
        "lines": {
            "line1": {
                "text": " ",
                "font_name": "/app/websocket/Fonts/MYSTERYQUEST-REGULAR.TTF",
                "font_size": "38",
                "font_colour": "black"
            }
        }
    }
    ```
*   **Subsequent Images:**
    ```json
    "image_name.jpg": {
        "bbox": "(103, 890, 929, 1001)",
        "lines": {
            "line1": " "
        }
    }
    ```

## Limitations

*   **No Image Processing:** This tool does *not* process the images themselves. It only uses the filenames to create the JSON structure.
*   **Hardcoded Values:** The values for `bbox`, `font_name`, etc., are hardcoded in the `script.js` file and are not extracted from the images.

## Potential Improvements

*   Implement Optical Character Recognition (OCR) to extract text from the images.
*   Allow users to customize the JSON structure.
*   Enable users to edit the generated JSON before downloading.
