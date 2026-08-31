import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const contentRoot = path.resolve('src/content/docs');
const fullRevision = /\b[0-9a-f]{40}\b/;

async function requireSharedIdentity(label, identity, filenames) {
	for (const filename of filenames) {
		const source = await readFile(filename, 'utf8');
		if (!source.includes(identity)) {
			failures.push(`${path.relative(process.cwd(), filename)}: missing ${label} ${identity}`);
		}
	}
}

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

function allowsPinnedRevision(filename) {
	const relative = path.relative(contentRoot, filename).split(path.sep).join('/');
	return relative.endsWith('/map.mdx') ||
		relative.endsWith('/code-clinic.mdx') ||
		relative.endsWith('/trace.mdx');
}

const failures = [];
for (const filename of await contentFiles(contentRoot)) {
	const source = await readFile(filename, 'utf8');
	if (allowsPinnedRevision(filename)) {
		if (!fullRevision.test(source)) {
			failures.push(`${path.relative(process.cwd(), filename)}: missing exact source revision`);
		}
		continue;
	}
	if (fullRevision.test(source)) {
		failures.push(`${path.relative(process.cwd(), filename)}: exact revision on a durable page`);
	}
}

const traceWorkflow = await readFile('.github/workflows/traces.yml', 'utf8');
const referenceIdentity = traceWorkflow.match(/repository: type-rb\/type-rb\s+ref: ([0-9a-f]{40})/m)?.[1];
if (!referenceIdentity) {
	failures.push('.github/workflows/traces.yml: missing exact reference compiler revision');
} else {
	await requireSharedIdentity('reference trace revision', referenceIdentity, [
		'src/content/docs/en/reference-compiler/map.mdx',
		'src/content/docs/en/reference-compiler/code-clinic.mdx',
		'src/content/docs/en/reference-compiler/trace.mdx',
	]);
}

const nativeTraceScript = await readFile('scripts/trace-native.sh', 'utf8');
const nativeSeedIdentity = nativeTraceScript.match(/^release_source_revision=([0-9a-f]{40})$/m)?.[1];
if (!nativeSeedIdentity) {
	failures.push('scripts/trace-native.sh: missing exact seed source revision');
} else {
	await requireSharedIdentity('Native seed source revision', nativeSeedIdentity, [
		'src/content/docs/en/native-compiler/code-clinic.mdx',
		'src/content/docs/en/native-compiler/trace.mdx',
	]);
}

if (failures.length > 0) {
	console.error('Source revision boundary failures:');
	for (const failure of failures) console.error(`- ${failure}`);
	console.error('Exact revisions belong on versioned maps, code clinics, and executable traces; each such page must name one.');
	process.exit(1);
}

console.log('Content boundaries: reproducible pages pin source revisions; durable pages do not');
