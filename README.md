# SMM Scanner Videos

## Description

Plays fullscreen videos given input from a barcode scanner.

## Installation

Install project dependencies:

```
npm install
```

### Add video content

1. Place videos that correspond to barcodes in the `public/videos` directory. Videos should be in `.mp4` format.
2. Place the screensaver video in the `public` directory, and name it `_idle.mp4`.
3. Create a listing of the videos in a `videos.json` file. There are two ways to do this:

    * **Option 1**: Run the `video-list.sh` script to generate the JSON file automatically: 

        `./scripts/video-list.sh`

        This will create a file called `videos.json` in the appropriate location, with all video files listed in JSON format.

    * **Option 2**: Make a copy of `videos.example.json` named `videos.json` in the same directory. Add video filenames within the brackets, wrapped in quotes, separated by commas.
        * Do not include the full file path, just use the filename (e.g, `"hotdogs.mp4"`). 
        * Do not include `_idle.mp4`.
        * You may want to [validate the JSON file](https://jsonlint.com/) afterwards to make sure it's formatted correctly.

### Create barcodes

Each video is represented by a barcode, and scanning this barcode will play the video. Here are two options for creating the barcodes:

1. Use an online barcode creator like [BarcodesInc.com](https://www.barcodesinc.com/generator/index.php). Use the filenames of the videos as the barcode text (e.g, "media01.mp4").

Alternatively:

2. After putting video files into the `public/videos` directory, run the `generate-barcodes.js` script. This will create an SVG image with a barcode for each video (requires node.js on your computer).

Run the script from the command line like this: `./scripts/generate-barcodes.js`

After creating the barcodes, you can generate a preview page of all the barcodes by running the preview script, like this: `./scripts/preview-barcodes.js`. This creates a file called `public/barcodes/index.html`, which you can view in your web browser or print for testing.

## Development

Start the development environment:

```
npm run dev
```

Create a production build for a web browser:

```
npm run build
```

Create a production build without any folders for a BrightSign player:

```
npm run bs-build
```

Test a production build:

```
npm run preview
```

## Using a BrightSign

### Add or update content on the BrightSign

1. Connect the BrightSign to your local network with an ethernet cable.
2. On another computer, navigate to BrightSign's IP in your browser.
3. Log into the admin console with `admin` as the user and the BrightSign's serial number as the password. The serial number is shown on-screen with the IP address while the device boots up.
4. Open the `SD` tab and use the Upload tool to add or replace files.
5. Open the `Control` tab and click Reboot.

### BrightSign quirks

- Code for the app needs to be contained entirely in index.html, including CSS/JS. For this project, we've configured Vite to inline these at compile time (see vite.config.js).
- Media assets (e.g, videos) need to be the same directory as index.html; we cannot create folders on the SD card.