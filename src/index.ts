import fs from 'fs/promises';
import { Chunk, WPlace } from './lib/WPlace';
import Logger from './lib/logger';
import './lib/pollyfil';

const wPlace = new WPlace(true);

//https://backend.wplace.live/files/s0/tiles/338/1874.png
const start = {
    col: 338,
    row: 1874
} satisfies Chunk;

const end = {
    col: 339,
    row: 1874
} satisfies Chunk;

(async () => {
    const FILE_NAME = 'output.png';

    const cwd = process.cwd();

    const l = new Logger('Main', 'cyan');
    l.start('Starting download...');
    const chunks = await wPlace.fetchChunksInRange(start, end);
    const image = await wPlace.constructImage(chunks);
    await fs.writeFile(FILE_NAME, await image.toBuffer());
    l.stop(`Download complete! ${cwd}/${FILE_NAME}`);
})();
