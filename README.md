# Rooms Availability app
This project is created with `react-native init`.
<p float="left">
<img src="https://user-images.githubusercontent.com/97089422/194278619-0cfba998-5d36-4c8b-8171-6107e984a4f7.png" width=25% height=25%>
<img src="https://user-images.githubusercontent.com/97089422/194278631-51caf6b2-50e3-43c8-bf86-b8efc3c307f7.png" width=25% height=25%>
<img src="https://user-images.githubusercontent.com/97089422/194278626-40be450c-a9bb-4136-b7a5-b523553c38ba.png" width=25% height=25%>
</p>

## Features
- View a rooms list divided by levels, availability, name, and capacity (currently static)
- Sort rooms list by level, availability and capacity, on either ascending or descending order
- Capture QR Code to book your room

## Technical Limitations
- Due to unavailability of MacOS device, development was completely done on Windows OS, thus iOS testing was very limited
- Currently QR camera will only capture any http/https url

## Setup
### Clone repository
Download the project files from Github,

or clone the repository via github Desktop

or via github CLI `gh repo clone anditandev/rooms`

### Install depedencies
Install the depedencies required by the projects by running `npm install` in the root directory of the project.

** For more information, please open [this link](https://reactnative.dev/docs/environment-setup) here.

## Testing
To run the automated unit test, please open a terminal on the root directory and run

`npm run test`


## Installing
### Downloads
You can download from the [release](https://github.com/anditandev/rooms/releases/tag/Pre-release) page

## Android
### Installing to emulator/device
Make sure the emulator/device you are trying to install to is connected and run:

`npm run android`

** For more information, please open [this link](https://reactnative.dev/docs/running-on-device) here.

### Generating debug apk for Android devices
Before we proceed, please make sure the `assets` folder exist in the `mock-notifications/android/app/src/main` directory. 

Otherwise, please create a folder named `assets` in `mock-notifications/android/app/src/main`, like shown below,
![image](https://user-images.githubusercontent.com/97089422/194275501-d2ba51d1-a66b-4e5f-9cd7-91501d2c1c94.png)

#### Generate by script

You can generate the apk by running the script below from the terminal in root directory

`npm run debugBundle`

### Generate manually

Alternatively, you can generate the apk manually by running the script below via terminal,

`
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
`

After the process is done, go to android directory from the terminal with ,

`cd android`

and run

`gradlew assembleDebug`

The debug apks will be generated in `/android/app/build/outputs/apk/debug/` folder splitted into each CPU architecture

## iOS
### Installing to simulator/device

Make sure the simulator/device you are trying to install to is connected and run 
`npm run ios`

Alternatively you can download the iOS build from [this page](https://expo.dev/accounts/anditan/projects/rooms/builds/301c5a18-c100-4243-a6a9-15a7d1b25d54), with its instructions
