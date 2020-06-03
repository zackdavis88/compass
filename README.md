# Compass
React UI for agile project backlog management

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
