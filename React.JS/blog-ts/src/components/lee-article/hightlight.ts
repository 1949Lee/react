import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import shell from 'react-syntax-highlighter/dist/esm/languages/hljs/shell';
import go from 'react-syntax-highlighter/dist/esm/languages/hljs/go';
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss';
import less from 'react-syntax-highlighter/dist/esm/languages/hljs/less';
import dart from 'react-syntax-highlighter/dist/esm/languages/hljs/dart';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('javascript', go);
SyntaxHighlighter.registerLanguage('javascript', scss);
SyntaxHighlighter.registerLanguage('javascript', less);
SyntaxHighlighter.registerLanguage('javascript', shell);
SyntaxHighlighter.registerLanguage('javascript', dart);

export default SyntaxHighlighter