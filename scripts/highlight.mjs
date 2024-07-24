// @ts-check
import { createHighlighter, bundledLanguages } from 'shiki';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile } from 'node:fs/promises';

import { parseDocument } from 'htmlparser2';
import { findAll, textContent, replaceElement } from 'domutils';
import render from 'dom-serializer';

const __dirname = dirname(fileURLToPath(import.meta.url));

main();

async function main() {
	const LIGHT_THEME = 'github-light-modified';
	const DARK_THEME = 'nord-darker';

	const start = Date.now();

	const highlighter = await createHighlighter({
		themes: [], // both themes are custom and are loaded below
		langs: Object.keys(bundledLanguages),
	});
	const yagTemplateLang = await readJsonFile(join(__dirname, 'yag.tmLanguage.json'));
	await highlighter.loadLanguage(yagTemplateLang);

	const gitHubLightModifiedTheme = await readJsonFile(join(__dirname, 'github-light-modified.json'));
	await highlighter.loadTheme(gitHubLightModifiedTheme);

	const nordDarkerTheme = await readJsonFile(join(__dirname, 'nord-darker.json'));
	await highlighter.loadTheme(nordDarkerTheme);

	const files = await listBuiltIndexHtmlFiles();
	await Promise.all(
		files.map((filepath) => highlightFile(highlighter, filepath, { lightTheme: LIGHT_THEME, darkTheme: DARK_THEME })),
	);

	console.log(`Highlighted ${files.length} files in ${Math.round(Date.now() - start)} ms`);
}

async function readJsonFile(filepath) {
	return JSON.parse(await readFile(filepath, { encoding: 'utf-8' }));
}

// Return the paths of all index.html files under the public/docs and public/learn directories.
async function listBuiltIndexHtmlFiles() {
	const publicDir = join(__dirname, '../public');

	const docsDir = join(publicDir, 'docs');
	const docsIndexFiles = (await readdir(docsDir, { recursive: true, encoding: 'utf-8' }))
		.filter((filename) => filename.endsWith('index.html'))
		.map((filename) => join(docsDir, filename));

	const learnDir = join(publicDir, 'learn');
	const learnIndexFiles = (await readdir(learnDir, { recursive: true, encoding: 'utf-8' }))
		.filter((filename) => filename.endsWith('index.html'))
		.map((filename) => join(learnDir, filename));

	return [...docsIndexFiles, ...learnIndexFiles];
}

async function highlightFile(highlighter, filepath, { lightTheme, darkTheme }) {
	const contents = await readFile(filepath, { encoding: 'utf-8' });
	await writeFile(filepath, highlightHtml(highlighter, contents, { lightTheme, darkTheme }));
}

const codeLanguageRe = /<code class="language-(\w+)">/;

function highlightHtml(highlighter, htmlContent, { lightTheme, darkTheme }) {
	const doc = parseDocument(htmlContent);
	for (const preNode of findAll((e) => e.name === 'pre', doc.children)) {
		const codeNode = preNode.childNodes[0];
		if (!codeNode) continue;

		const lang = codeLanguageRe.exec(render(codeNode))?.[1] ?? 'text';

		const code = textContent(codeNode);
		const highlighted = highlighter.codeToHtml(code, {
			lang,
			themes: { light: lightTheme, dark: darkTheme },
		});

		const highlightedPreNode = parseDocument(highlighted).childNodes[0];
		replaceElement(preNode, highlightedPreNode);
	}

	return render(doc);
}
