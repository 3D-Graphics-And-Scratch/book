//this is temporary, for now it only works with one word
//I exclude the headers from the search
//TODO : add a JSON file with all vocabulary words and definitions
document.addEventListener('DOMContentLoaded', (event) => {
    const originalWord = 'mesh';
    const placeholder = 'TEMP_PLACEHOLDER_12345';
    const replacementHTML = '<a href="../glossary.html#mesh-"><span class="tooltip">mesh<span class="tooltiptext">A collection of faces, edges and vertices that define the object\'s shape.</span></span></a>'; // Your HTML replacement

    function replaceTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(new RegExp(originalWord, 'gi'), placeholder);
        } else if (node.nodeType === Node.ELEMENT_NODE && !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) {
            node.childNodes.forEach(replaceTextNodes);
        }
    }
    replaceTextNodes(document.getElementById("content"));

    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(placeholder, 'gi'), replacementHTML);
});