// @ts-check
import { createHighlighter, bundledLanguages } from 'shiki';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile } from 'node:fs/promises';

import { parseDocument } from 'htmlparser2';
import { findAll, textContent, replaceElement } from 'domutils';
import render from 'dom-serializer';

main();

async function main() {
	const LIGHT_THEME = 'github-light-default';
	const DARK_THEME = 'github-dark-default';

	const start = Date.now();

	const files = await listBuiltContentFiles();
	const highlighter = await createHighlighter({
		themes: [LIGHT_THEME, DARK_THEME],
		langs: Object.keys(bundledLanguages),
	});
	await Promise.all(
		files.map((filepath) => highlightFile(highlighter, filepath, { lightTheme: LIGHT_THEME, darkTheme: DARK_THEME })),
	);

	console.log(`Highlighted ${files.length} files in ${Math.round(Date.now() - start)} ms`);
}

// Return the paths of all index.html files under the public/docs and public/learn directories.
async function listBuiltContentFiles() {
	const publicDir = join(dirname(fileURLToPath(import.meta.url)), '../public');

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
