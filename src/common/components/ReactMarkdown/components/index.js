import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';

import style from '@/common/components/ReactMarkdown/styles/style';

const components = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter style={style} language={match[1]} PreTag="div" {...props} showLineNumbers={true}>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	}
};

const ReactMarkdownComponent = ({ text }) => {
	return (
		<ReactMarkdown className="markdown-body" remarkPlugins={[gfm]} components={components}>
			{text}
		</ReactMarkdown>
	);
};

export default ReactMarkdownComponent;
