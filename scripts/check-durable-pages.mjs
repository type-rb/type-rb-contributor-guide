import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const contentRoot = path.resolve('src/content/docs');
const fullRevision = /\b[0-9a-f]{40}\b/;

async function contentFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const candidate = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await contentFiles(candidate));
		if (entry.isFile() && /\.mdx?$/.test(entry.name)) files.push(candidate);
	}
	return files;
}

function isDurablePage(filename) {
	const relative = path.relative(contentRoot, filename).split(path.sep).join('/');
	return relative.includes('/foundations/') || relative.endsWith('/change-journey.mdx');
}

const failures = [];
for (const filename of await contentFiles(contentRoot)) {
	if (!isDurablePage(filename)) continue;
	const source = await readFile(filename, 'utf8');
	if (fullRevision.test(source)) {
		failures.push(path.relative(process.cwd(), filename));
	}
}

if (failures.length > 0) {
	console.error('Durable pages must not pin full source revisions:');
	for (const failure of failures) console.error(`- ${failure}`);
	console.error('Move version-specific source addresses to the matching big map.');
	process.exit(1);
}

console.log('Durable pages: no pinned source revisions');
