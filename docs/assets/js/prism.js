// Minimal Prism.js replacement for C# syntax highlighting
// This provides basic syntax highlighting for C# code without external dependencies

window.Prism = {
    highlightElement: function(element) {
        // Simple syntax highlighting for C# keywords
        if (element && element.textContent) {
            const code = element.textContent;
            const highlighted = code
                // C# keywords
                .replace(/\b(using|namespace|class|interface|struct|enum|public|private|protected|internal|static|readonly|const|virtual|override|abstract|sealed|partial|void|int|string|bool|char|byte|sbyte|short|ushort|long|ulong|float|double|decimal|object|var|dynamic|if|else|switch|case|default|break|continue|for|foreach|while|do|try|catch|finally|throw|return|yield|new|this|base|null|true|false|is|as|typeof|sizeof|stackalloc|unsafe|fixed|lock|async|await|get|set|value|add|remove|where|select|from|join|group|into|orderby|let|on|equals|by|ascending|descending)\b/g, '<span class="token keyword">$1</span>')
                // Comments
                .replace(/\/\/.*$/gm, '<span class="token comment">$&</span>')
                .replace(/\/\*[\s\S]*?\*\//g, '<span class="token comment">$&</span>')
                // Strings
                .replace(/"([^"\\]|\\.)*"/g, '<span class="token string">$&</span>')
                .replace(/'([^'\\]|\\.)*'/g, '<span class="token string">$&</span>')
                .replace(/@"([^"]|"")*"/g, '<span class="token string">$&</span>')
                // Numbers
                .replace(/\b\d+(\.\d+)?[fFdDmM]?\b/g, '<span class="token number">$&</span>')
                // Operators
                .replace(/([+\-*\/=<>!&|^%]|==|!=|<=|>=|&&|\|\||<<|>>|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|<<=|>>=|\+\+|--|\?\?)/g, '<span class="token operator">$1</span>')
                // Punctuation
                .replace(/([{}()\[\];,.])/g, '<span class="token punctuation">$1</span>');
            
            element.innerHTML = highlighted;
        }
    },
    
    highlightAll: function() {
        const codeElements = document.querySelectorAll('code.language-csharp, code[class*="language-"], pre code');
        codeElements.forEach(element => {
            this.highlightElement(element);
        });
    }
};

// Auto-highlight on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    });
}
