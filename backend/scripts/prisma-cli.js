const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

process.env.DATABASE_URL ??= 'file:../.tmp/dev.db';
process.env.CHECKPOINT_DISABLE ??= '1';
process.env.PRISMA_HIDE_UPDATE_MESSAGE ??= '1';

const localAppData = path.join(process.cwd(), '.tmp', 'localappdata');
fs.mkdirSync(localAppData, { recursive: true });
process.env.LOCALAPPDATA = localAppData;
process.env.APPDATA ??= localAppData;
process.env.XDG_CACHE_HOME ??= path.join(process.cwd(), '.tmp', 'cache');

const prismaCli = require.resolve('prisma/build/index.js');
const result = spawnSync(process.execPath, [prismaCli, ...process.argv.slice(2)], {
  env: process.env,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
