const https = require('https');
const querystring = require('querystring');
const fs = require("fs");
const { randomUUID } = require("crypto");
require('dotenv').config();

const API_KEY_ID = process.env.SPEECHFLOW_API_KEY_ID;
const API_KEY_SECRET = process.env.SPEECHFLOW_API_KEY_SECRET;
const LANG = "en";  // Language for transcription

// Main function to detect audio content (SpeechFlow)
async function mediaTranscribe(filePath) {
    try {
        const resultType = 4;
        const transcriptionResult = await transcribeAudio(filePath, resultType);
        let compressedResult = transcriptionResult.result.replace(/\s*\n\s*/g, ' ');
        compressedResult = compressedResult.trimEnd();
        const response = {
            text: compressedResult
        };
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * Transcribes an audio file (local or remote) using the SpeechFlow API.
 * @param {string} filePath - The path of the audio file (local or remote URL).
 * @param {number} resultType - The result format type (1: JSON with timings, 4: Plain text).
 * @returns {Promise<string>} - Returns a promise that resolves with the transcription result.
 */
async function transcribeAudio(filePath, resultType = 4) {
    return new Promise((resolve, reject) => {
        // Prepare request data based on file type
        let createRequest;
        const createData = querystring.stringify({
            lang: LANG,
            remotePath: filePath
        });

        if (filePath.startsWith('http')) {
            console.log('Submitting a remote file');
            createRequest = https.request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': createData.length,
                    'keyId': API_KEY_ID,
                    'keySecret': API_KEY_SECRET
                },
                body: createData,
                hostname: 'api.speechflow.io',
                path: '/asr/file/v1/create'
            });
        } else {
            console.log('Submitting a local file');
            let formData = '';
            const boundary = randomUUID().replace(/-/g, "");
            formData += "--" + boundary + "\r\n";
            formData += 'Content-Disposition: form-data; name="file"; filename="' + getFileNameByPath(filePath) + '"\r\n';
            formData += "Content-Type: application/octet-stream\r\n\r\n";
            let formDataBuffer = Buffer.concat([
                Buffer.from(formData, "utf8"),
                fs.readFileSync(filePath),
                Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
            ]);

            createRequest = https.request({
                method: 'POST',
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${boundary}`,
                    "Content-Length": formDataBuffer.length,
                    'keyId': API_KEY_ID,
                    'keySecret': API_KEY_SECRET,
                },
                hostname: 'api.speechflow.io',
                path: '/asr/file/v1/create?lang=' + LANG
            });
            createRequest.write(formDataBuffer);
        }

        createRequest.on('response', (createResponse) => {
            let responseData = '';

            createResponse.on('data', (chunk) => {
                responseData += chunk;
            });

            createResponse.on('end', () => {
                const responseJSON = JSON.parse(responseData);
                if (responseJSON.code == 10000) {
                    let taskId = responseJSON.taskId;
                    pollTranscriptionStatus(taskId, resultType)
                        .then(result => resolve(result))
                        .catch(error => reject(error));
                } else {
                    reject("Error creating transcription task: " + responseJSON.msg);
                }
            });
        });

        createRequest.on('error', (error) => {
            reject(error);
        });

        createRequest.write(createData);
        createRequest.end();
    });
}

/**
 * Polls the transcription status periodically until it's complete.
 * @param {string} taskId - The task ID of the transcription.
 * @param {number} resultType - The result format type.
 * @returns {Promise<string>} - Returns a promise that resolves with the transcription result.
 */
function pollTranscriptionStatus(taskId, resultType) {
    return new Promise((resolve, reject) => {
        const intervalID = setInterval(() => {
            const queryRequest = https.request({
                method: 'GET',
                headers: {
                    'keyId': API_KEY_ID,
                    'keySecret': API_KEY_SECRET
                },
                hostname: 'api.speechflow.io',
                path: `/asr/file/v1/query?taskId=${taskId}&resultType=${resultType}`
            }, (queryResponse) => {
                let responseData = '';

                queryResponse.on('data', (chunk) => {
                    responseData += chunk;
                });

                queryResponse.on('end', () => {
                    const responseJSON = JSON.parse(responseData);

                    if (responseJSON.code === 11000) {
                        console.log('Transcription completed');
                        clearInterval(intervalID);
                        resolve(responseJSON);  // Return transcription result
                    } else if (responseJSON.code === 11001) {
                        console.log('Waiting for transcription...');
                    } else {
                        clearInterval(intervalID);
                        reject("Error in transcription process: " + responseJSON.msg);
                    }
                });
            });

            queryRequest.on('error', (error) => {
                clearInterval(intervalID);
                reject(error);
            });

            queryRequest.end();
        }, 3000);  // Poll every 3 seconds
    });
}

/**
 * Helper function to extract the file name from a file path.
 * @param {string} path - The file path.
 * @returns {string} - The file name extracted from the path.
 */
function getFileNameByPath(path) {
    let index = path.lastIndexOf("/");
    return path.substring(index + 1);
}


// Call the audioDetection function
mediaTranscribe('./test.mp4');