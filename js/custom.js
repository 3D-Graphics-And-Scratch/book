//this is temporary, for now it only works with one word
//I exclude the headers from the search
//TODO : add a JSON file with all vocabulary words and definitions
document.addEventListener('DOMContentLoaded', (event) => {
    const originalWord = 'mesh';
    const placeholder = 'TEMP_PLACEHOLDER_12345';
    const replacementHTML = '<a href="../glossary.html#mesh-"><span class="tooltip">mesh<span class="tooltiptext">A collection of faces, edges and vertices that define the object\'s shape.</span></span></a>';
    let glossary;
    const regExpOptions = "";
    let replacedWords = [];

    function replaceTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            Object.keys(glossary).forEach(word => {
                if(replacedWords.includes(word)) return;
                let previousText = node.textContent;
                //lowercase replacement
                node.textContent = node.textContent.replace(new RegExp(word.toLowerCase() + ' ', regExpOptions), word.toLowerCase() + placeholder);
                //uppercase replacement
                node.textContent = node.textContent.replace(new RegExp(word + ' ', regExpOptions), word + placeholder);

                if(previousText !== node.textContent) {
                    replacedWords.push(word);
                }
            })
            
        } else if (node.nodeType === Node.ELEMENT_NODE && !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) {
            node.childNodes.forEach(replaceTextNodes);
        }
    }

    loadScratchblocks();

    fetch('../glossary.json')
        .then(response => response.json())
        .then(data => {
            glossary = data.Glossary;
            let content = document.getElementById('content');
            replaceTextNodes(content, glossary);

            Object.keys(glossary).forEach(word => {
                console.log(glossary[word]);
                //lowercase replacement
                content.innerHTML = content.innerHTML.replace(new RegExp(word.toLowerCase() + placeholder, 'g'), 
                '<a href="../glossary.html#' + word.toLowerCase() + '-"><span class="tooltip">' + word.toLowerCase() + '&nbsp;<span class="tooltiptext">' + escapeString(glossary[word].definition) +'</span></span></a>'
                );
                //uppercase replacement
                content.innerHTML = content.innerHTML.replace(new RegExp(word + placeholder, 'g'), 
                '<a href="../glossary.html#' + word.toLowerCase() + '-"><span class="tooltip">' + word + '&nbsp;<span class="tooltiptext">' + escapeString(glossary[word].definition) +'</span></span></a>'
                );
            })
            
        })
        .catch(error => console.error('Error loading glossary:', error));
    
});

function escapeString(str) {
    return JSON.stringify(str).slice(1, -1);
}

function loadScratchblocks() {
    scratchblocks.renderMatching("code.language-blocks", {
        style: "scratch3",
        scale: 0.75,
    })
}
