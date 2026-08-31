import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const outputRoot = path.resolve('dist');
const siteBase = '/type-rb-contributor-guide/';
const origin = 'https://guide.invalid';

async function htmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const candidate = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await htmlFiles(candidate));
		if (entry.isFile() && entry.name.endsWith('.html')) files.push(candidate);
	}
	return files;
}

async function exists(filename) {
	try {
		await access(filename);
		return true;
	} catch {
		return false;
	}
}

const failures = [];
const rootHtml = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
const expectedRootRedirect = `${siteBase}en/`;
if (!rootHtml.includes(`content="0;url=${expectedRootRedirect}"`)) {
	failures.push(`/index.html: expected a redirect to ${expectedRootRedirect}`);
}

for (const filename of await htmlFiles(outputRoot)) {
	const pagePath = `/${path.relative(outputRoot, filename).split(path.sep).join('/')}`;
	const pageURL = new URL(pagePath, origin);
	const html = await readFile(filename, 'utf8');
	for (const match of html.matchAll(/href="([^"]+)"/g)) {
		const href = match[1];
		if (href.startsWith('#') || href.startsWith('mailto:')) continue;
		const target = new URL(href, pageURL);
		if (target.origin !== origin || !target.pathname.startsWith(siteBase)) continue;

		let relative = decodeURIComponent(target.pathname.slice(siteBase.length));
		if (relative === '' || relative.endsWith('/')) relative += 'index.html';
		const targetFile = path.join(outputRoot, relative);
		if (!await exists(targetFile)) failures.push(`${pagePath}: ${href}`);
	}
}

if (failures.length > 0) {
	console.error('Broken internal links:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log('Internal links: ok');
