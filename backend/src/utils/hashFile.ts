import { createHash } from "node:crypto"
import { createReadStream } from "node:fs";

async function hashFile(path: string) : Promise<Uint8Array<ArrayBuffer>> {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = createReadStream(path);

        stream.on("error", reject);

        stream.on('data', chunk => {
            hash.update(chunk);
        })

        stream.on('end', () => {
            resolve(hash.digest())
        })
    })
}

export default hashFile;