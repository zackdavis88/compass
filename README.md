# Compass
React UI for agile project backlog management.

## Required Dependencies

The following dependencies are required:

### 1. [Needle API](https://github.com/zackdavis88/needle)

## Required Configuration

Before running the UI and getting started you must complete the following steps.

**_NOTE:_** *These steps assume you are using a Linux operating system, the 
equivalent Windows commands will have to be researched on your own.*

### 1. Configure HTTPS
This step may be completed by providing a CA signed certificate, assuming 
you have the .pem files, or by generating a self-signed certificate 
as shown below:
```
mkdir -p compass/config/ssl
cd compass/config/ssl
openssl req -x509 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```
*You will be asked questions when generating the self-signed certificate, answer the prompts until the process completes*

### 2. Install Node Modules
Run the following command from the _root of the cloned repository_ to
install node modules required for the UI.
```
npm install
```

## Start Up
**_After all Install Dependencies and Required Configuration steps have been completed, use the following command
to start the API._**
```
npm run start
```

## Test Suite
Compass comes with a suite of component tests that can be ran using the following command:
```
npm run test
```
