import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

function binaryToText(binaryString: string): string {
    return binaryString
        .split(' ')
        .map(bit => String.fromCharCode(parseInt(bit, 2)))
        .join('');
}

function textToBinary(text: string): string {
    return Array.from(text)
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}

function parseBinaryToJson(binaryString: string): object {
    try {
        const decodedText = binaryToText(binaryString);
        return JSON.parse(decodedText);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Failed to parse binary string to JSON: ' + error.message);
        } else {
            throw new Error('An unknown error occurred during parse binary string.');
        }
    }
}

function decodeBase64ToJson(base64String: string): object {
    try {
        const jsonBinaryString = Buffer.from(base64String, 'base64').toString('utf-8');
        const jsonString = parseBinaryToJson(jsonBinaryString);
        console.log('Decoded string:', JSON.stringify(jsonString)); // Debugging log
        return jsonString;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error decoding Base64 or parsing JSON. Decoded content:', base64String);
            throw new Error('Failed to decode Base64 or parse JSON: ' + error.message);
        } else {
            throw new Error('An unknown error occurred during decoding.');
        }
    }
}

function encodeJsonToBase64(jsonObject: object): string {
    try {
        const jsonString = JSON.stringify(jsonObject);
        return Buffer.from(jsonString, 'utf-8').toString('base64');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Failed to encode JSON to Base64: ' + error.message);
        } else {
            throw new Error('An unknown error occurred during encoding.');
        }
    }
}

function processDatFiles(datFolder: string, jsonFolder: string): void {
    const files = fs.readdirSync(datFolder);
    files.forEach(file => {
        if (path.extname(file) === '.dat') {
            const filePath = path.join(datFolder, file);
            const base64Content = fs.readFileSync(filePath, 'utf-8');
            try {
                const jsonObject = decodeBase64ToJson(base64Content);
                const jsonFilePath = path.join(jsonFolder, path.basename(file, '.dat') + '.json');
                fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObject, null, 2), 'utf-8');
                console.log(`Converted ${file} to JSON.`);
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
            }
        }
    });
}

function processJsonFiles(jsonFolder: string, datFolder: string): void {
    const files = fs.readdirSync(jsonFolder);
    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(jsonFolder, file);
            const jsonContent = fs.readFileSync(filePath, 'utf-8');
            try {
                const jsonObject = JSON.parse(jsonContent);
                const binaryString = textToBinary(JSON.stringify(jsonObject));
                const base64Content = Buffer.from(binaryString, 'utf-8').toString('base64');
                const datFilePath = path.join(datFolder, path.basename(file, '.json') + '.dat');
                fs.writeFileSync(datFilePath, base64Content, 'utf-8');
                console.log(`Converted ${file} to Base64.`);
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
            }
        }
    });
}

function promptUser(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What would you like to do? (1: processDat, 2: processJson): ', (answer) => {
        const datFolder = './dat';
        const jsonFolder = './json';

        if (answer === '1') {
            console.log('Processing .dat files to .json files...');
            processDatFiles(datFolder, jsonFolder);
        } else if (answer === '2') {
            console.log('Processing .json files to .dat files...');
            processJsonFiles(jsonFolder, datFolder);
        } else {
            console.log('Invalid option. Please choose 1 or 2.');
        }

        rl.close();
    });
}

function main() {
    promptUser();
}

main();

