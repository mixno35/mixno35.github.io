export function initialize() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                setTranslate(node);
            });

            if (mutation.type === 'attributes' && mutation.attributeName === 'data-tr') {
                setTranslate(mutation.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-tr'],
    });

    setTranslate(document.body);

    function setTranslate(element) {
        document.querySelector('html').setAttribute('lang', clientLanguage);

        if (element && element instanceof Element) {
            element.querySelectorAll('[data-tr]').forEach(e => {
                if (e.hasAttribute('data-tr')) {
                    e.innerHTML = translate(e.getAttribute('data-tr'), e.innerHTML);
                    e.removeAttribute('data-tr');
                }
            });
        }
    }
}

export function translate(key, fallback = null, ...values) {
    let translate;
    const translateFallback = (fallback !== null && fallback.length > 0) ? fallback : key;

    if (translateStrings[clientLanguage] && translateStrings[clientLanguage][key]) {
        translate = translateStrings[clientLanguage][key];
    } else if (translateStrings[defaultLanguage] && translateStrings[defaultLanguage][key]) {
        translate = translateStrings[defaultLanguage][key];
    } else {
        translate = translateFallback;
    }

    const result = String(translate).trim();

    return (typeof sprintf === 'function') ? sprintf(result, ...values) : result;
}