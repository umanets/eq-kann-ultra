# Custom EQ Presets Project

This repository allows you to create, refine, and share custom Equalizer (EQ) presets for A&K KANN ULTRA. It supports generating `.dat` files from JSON configurations and automates the conversion process.

## 📂 Project Structure

- **`dat/`**: Contains the compiled `.dat` files, ready for use on device.
- **`json/`**: Contains the editable JSON files with EQ configurations. Add new presets here to generate `.dat` files.
- **`src/`**: Scripts for converting between JSON and `.dat` files.

## 🎛️ How to Add New Presets

1. **Create a JSON File**  
   Add a new JSON file in the `json/` folder. The content should include the refined EQ settings, such as:

   ```json
   {
     "GAIN": "89,89,89,80,70,60,50,50,50,60,70,80,89,89,89,89,89,89,89,89",
     "Q": "20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20",
     "EGAIN": "3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3"
   }
    ```
2. **Run the Script**  
Execute the script and select Option 2 to process JSON files into .dat files:

    ```bash
    npm run start
    ```
3. **Find the Generated File**  
    The corresponding .dat file will be saved in the dat/ folder with the same name as the JSON file.

## 🔄 Workflow for Modifying Presets

To modify an existing preset:

1. Locate its JSON file in the `json/` folder.
2. Edit the content to refine the EQ settings.
3. Re-run the script to regenerate the `.dat` file.

## 🔧 Script Options

When you run the script, you will be prompted to choose an action:

- **Option 1**: Convert `.dat` files in the `dat/` folder to JSON format (saved in `json/` folder).
- **Option 2**: Convert JSON files in the `json/` folder to `.dat` format (saved in `dat/` folder).

## 🎵 Audio Preferences

This project prioritizes:

- **Punchy Bass**: Impactful low-end frequencies.
- **Spatial Sound**: Sense of space and depth in audio.
- **Clean Vocals**: Clear and intelligible vocal enhancement.

## ⚙️ EQ Settings Recommendations

To maintain high-quality audio, the following recommended ranges for settings should be observed when creating or modifying presets:

- **GAIN**: 0 to 89
- **Q**: 10 to 29
- **EGAIN**: 0 to 9

These ranges ensure balanced and controlled EQ adjustments while preventing distortion or audio artifacts.


## 📥 Contribute

Feel free to contribute by:

- Adding new presets in JSON format.
- Refining existing presets.
- Suggesting features to enhance the workflow.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

