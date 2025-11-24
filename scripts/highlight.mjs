// @ts-check
import { createHighlighter, bundledLanguages } from 'shiki';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';

import { glob } from 'glob';

import { parseDocument } from 'htmlparser2';
import { findAll, findOne, textContent, replaceElement } from 'domutils';
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

	const files = await glob(join(__dirname, '../public/{docs,learn,selfhosting}/**/index.html'));
	await Promise.all(
		files.map((filepath) => highlightFile(highlighter, filepath, { lightTheme: LIGHT_THEME, darkTheme: DARK_THEME })),
	);

	console.log(`Highlighted ${files.length} files in ${Math.round(Date.now() - start)} ms`);
}

async function readJsonFile(filepath) {
	return JSON.parse(await readFile(filepath, { encoding: 'utf-8' }));
}

async function highlightFile(highlighter, filepath, { lightTheme, darkTheme }) {
	const contents = await readFile(filepath, { encoding: 'utf-8' });
	await writeFile(filepath, highlightHtmlContent(highlighter, contents, { lightTheme, darkTheme }));
}

function highlightHtmlContent(highlighter, htmlContent, { lightTheme, darkTheme }) {
	const doc = parseDocument(htmlContent);
	for (const preNode of findAll((e) => e.name === 'pre', doc.children)) {
		const codeNode = findOne((e) => e.name === 'code', preNode.children);
		if (!codeNode) continue;

		const lang = codeNode.attribs['class']?.replace(/^language-/, '') ?? 'text';
		const code = textContent(codeNode);
		const highlighted = highlighter.codeToHtml(code, {
			lang,
			themes: { light: lightTheme, dark: darkTheme },
		});

		const highlightedPreNode = parseDocument(highlighted).children[0];
		replaceElement(preNode, highlightedPreNode);
	}

	return render(doc);
}
