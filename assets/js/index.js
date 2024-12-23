import {initialize as initializeTranslate, translate} from './module/translate.js';

const skills = [
    {
        name: 'PHP'
    },
    {
        name: 'Laravel'
    },
    {
        name: 'Symfony'
    },
    {
        name: 'Slim Framework'
    },
    {
        name: 'HTML(HTML5)'
    },
    {
        name: 'CSS(CSS3)'
    },
    {
        name: 'JavaScript'
    },
    {
        name: 'Figma'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeTranslate();

    document.title = translate('document_index');

    const textAboutSkill = document.querySelector('p#about-skill');

    if (textAboutSkill && textAboutSkill instanceof HTMLParagraphElement) {
        textAboutSkill.innerHTML = translate(skills[0].name);

        let currentSkillIndex = 0;

        setInterval(() => {
            textAboutSkill.innerHTML = translate(skills[currentSkillIndex].name);

            currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        }, 2000);
    }
});