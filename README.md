# Translation- App

## General Info
This repository contains project code for a real time text to speech cross- platform mobile app. The goal of this project is to learn about mobile app development in React Native while expanding my knowledge of NLP and LLMs.


You can view our full model pipeline, from collecting and processing our data to the final output of the model. Note that the final output features a selection of the original portaits in addition to our model's segmented versions.

You can also find example code for a full CNN pipeline written to help team mates understand ML fundamentals. This guide was created by me and features 2 models: one that performs poorly due to bad architecture and parameters, and one that performs very well due to better techniques and parameters.

## To Do
This project is a work in progress. I plan to flesh out the app UI and create comprehensive tests for the app, in addition to creating user settings and preferences. Furthermore, I will add real time translation for speech based user input. I also plan to release the app so that I can learn CI/ CD practices for mobile apps. Additionally, I will replace the current translation API with a custom tuned LLM. I am using [LM Studio](https://lmstudio.ai/) to develop and deploy my LLM.

## Results
Currently, the app can accept user input text and translate it to any language the [translate- google API](https://www.npmjs.com/package/translate-google-api) supports. The app also supports text to speech functionality for translated text.

