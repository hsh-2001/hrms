import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tableDir = path.join(__dirname, 'table');
const migrationsDir = path.join(__dirname, 'migrations');
const functionsDir = path.join(__dirname, 'functions');
const initDir = path.join(__dirname, 'initData');

// ANSI color codes
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

async function publishTables() {
  const client = await pool.connect();

  try {
    const sqlFiles = fs.readdirSync(tableDir).filter(file => file.endsWith('.sql'));

    if (sqlFiles.length === 0) {
      console.log('No SQL files found in table directory.');
      return;
    }

    console.log(`Found ${sqlFiles.length} SQL file(s) to execute.\n`);

    for (const file of sqlFiles) {
      const filePath = path.join(tableDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`Executing: ${file}`);

      try {
        await client.query(sql);
        console.log(`${colors.green}✓ ${file} executed successfully.${colors.reset}\n`);
      } catch (err) {
        if (err.code === '42P07') {
          console.log(`${colors.yellow}⚠ ${file} - Table already exists, skipping.${colors.reset}\n`);
        } else {
          console.error(`${colors.red}✗ ${file} failed:${colors.reset}`, err.message, '\n');
        }
      }
    }

    console.log(`${colors.green}Table creation completed.${colors.reset}\n`);

    // Run migrations if folder exists
    if (fs.existsSync(migrationsDir)) {
      const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort(); // Execute in alphabetical order

      if (migrationFiles.length > 0) {
        console.log(`Found ${migrationFiles.length} migration file(s) to execute.\n`);

        for (const file of migrationFiles) {
          const filePath = path.join(migrationsDir, file);
          const sql = fs.readFileSync(filePath, 'utf-8');

          console.log(`Executing migration: ${file}`);

          try {
            await client.query(sql);
            console.log(`${colors.green}✓ ${file} executed successfully.${colors.reset}\n`);
          } catch (err) {
            // Common errors to handle gracefully
            if (err.code === '42701') {
              console.log(`${colors.yellow}⚠ ${file} - Column already exists, skipping.${colors.reset}\n`);
            } else if (err.code === '42P07') {
              console.log(`${colors.yellow}⚠ ${file} - Table/constraint already exists, skipping.${colors.reset}\n`);
            } else {
              console.error(`${colors.red}✗ ${file} failed:${colors.reset}`, err.message, '\n');
            }
          }
        }
      }
    }

    if (fs.existsSync(initDir)) {
      const initFiles = fs.readdirSync(initDir).filter(file => file.endsWith('.sql'));

      if (initFiles.length > 0) {
        console.log(`Found ${initFiles.length} init file(s) to execute.\n`);

        for (const file of initFiles) {
          const filePath = path.join(initDir, file);
          const sql = fs.readFileSync(filePath, 'utf-8');

          console.log(`Executing init: ${file}`);

          try {
            await client.query(sql);
            console.log(`${colors.green}✓ ${file} executed successfully.${colors.reset}\n`);
          } catch (err) {
            console.error(`${colors.red}✗ ${file} failed:${colors.reset}`, err.message, '\n');
          }
        }
      }
    }

    if (fs.existsSync(functionsDir)) {
      const functionFiles = fs.readdirSync(functionsDir).filter(file => file.endsWith('.sql'));

      if (functionFiles.length > 0) {
        console.log(`Found ${functionFiles.length} function file(s) to execute.\n`);

        for (const file of functionFiles) {
          const filePath = path.join(functionsDir, file);
          const sql = fs.readFileSync(filePath, 'utf-8');

          console.log(`Executing function: ${file}`);

          try {
            await client.query(sql);
            console.log(`${colors.green}✓ ${file} executed successfully.${colors.reset}\n`);
          } catch (err) {
            if (err.code === '42701') {
              console.log(`${colors.yellow}⚠ ${file} - Function already exists, skipping.${colors.reset}\n`);
            } else {
              console.error(`${colors.red}✗ ${file} failed:${colors.reset}`, err.message, '\n');
            }
          }
        }
      }
    }

    console.log(`${colors.green}Database publish completed.${colors.reset}`);
  } catch (err) {
    console.error(`${colors.red}Error during database publish:${colors.reset}`, err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

publishTables();
