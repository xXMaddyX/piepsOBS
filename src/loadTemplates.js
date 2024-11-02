async function loadTemplate(url) {
    const response = await fetch(url);
    const text = await response.text();
    const template = document.createElement("template");
    template.innerHTML = text;
    document.body.appendChild(template.content);
}

await loadTemplate();