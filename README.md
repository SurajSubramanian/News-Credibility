# Twitteristic

## Project page
View it on Devpost : [Twitteristic | Devpost](https://devpost.com/software/twitteristic)

## Description 
Chrome extension to flag fake and toxic content in your twitter feed.

## Features
- converts fake tweets to light blue
- converts toxic tweets to light red
- produces a summary/analytics report (in the form of pie-charts depicting the percentage of fake and toxic tweets)
- options to blur out toxic tweets

## Usage
- Download the Tensorflow model weights for the [Toxicity model](https://drive.google.com/drive/folders/1DuuNaQ7Nve-D9EGcczxheAGKfxkCdt_4?usp=sharing) drop it in the directory : [Backend/Toxic-comments](https://github.com/SurajSubramanian/News-Credibility/tree/main/Backend/toxic_comments) 

- Initiate the backend Flask API : 
```
cd Backend
python -m flask run
```

- Under developer mode in chrome://extensions, use the "Load unpacked" option to load the code. Pin it in your browser and that's it !

Thanks for reading :)
