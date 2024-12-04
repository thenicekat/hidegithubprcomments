turboFrameElements = document.getElementsByTagName('turbo-frame');

for (let i = 0; i < turboFrameElements.length; i++) {
    let element = turboFrameElements[i];
    let id = element.getAttribute('id');

    if (id && id.startsWith('review-thread-or-comment')) {
        getState(id, (hidden) => {
            if (hidden) {
                element.style.display = 'block';
            }
        });
        if (element.lastChild.tagName === 'BUTTON')
            element.removeChild(element.lastChild);
    }
}