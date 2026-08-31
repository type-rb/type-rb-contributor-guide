// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://type-rb.github.io',
	base: '/type-rb-contributor-guide',
	integrations: [
		starlight({
			title: 'TypeRB Contributor Guide',
			description: 'A gentle guide to understanding and contributing to the TypeRB compilers.',
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://type-rb.github.io/type-rb-contributor-guide/og.png',
					},
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://type-rb.github.io/type-rb-contributor-guide/og.png',
					},
				},
			],
			defaultLocale: 'en',
			locales: {
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			customCss: ['./src/styles/custom.css'],
			favicon: '/favicon.svg',
			social: [
				{
					icon: 'github',
					label: 'Contributor guide on GitHub',
					href: 'https://github.com/type-rb/type-rb-contributor-guide',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Welcome', link: '/' },
						{ label: 'Choose a path', link: '/paths/' },
					],
				},
				{
					label: 'Foundations',
					items: [
						{ label: 'How a compiler works', link: '/foundations/how-a-compiler-works/' },
						{ label: 'Read changing code', link: '/foundations/reading-a-changing-codebase/' },
					],
				},
				{
					label: 'Reference compiler',
					items: [
						{ label: 'Big map', link: '/reference-compiler/map/' },
						{ label: 'Change journey', link: '/reference-compiler/change-journey/' },
						{ label: 'Executable trace', link: '/reference-compiler/trace/' },
					],
				},
				{
					label: 'Native compiler',
					items: [
						{ label: 'Big map', link: '/native-compiler/map/' },
						{ label: 'Change journey', link: '/native-compiler/change-journey/' },
						{ label: 'Executable trace', link: '/native-compiler/trace/' },
					],
				},
			],
		}),
	],
});
