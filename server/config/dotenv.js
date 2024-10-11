// File: /server/config/dotenv.js
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure dotenv with the correct path to the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });
