const selectTag = document.querySelectorAll('select'),
    btn = document.querySelector('.btn'),
    fromText = document.querySelector('.from-text'),
    toText = document.querySelector('.to-text'),
    exchange = document.querySelector('.exchange'),
    icons = document.querySelectorAll('.row i');

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected = '';
        if (id === 0 && country_code === 'en-GB') {
            selected = 'selected';
        } else if (id === 1 && country_code === 'ru-RU') {
            selected = 'selected';
        }

        let options = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', options);
    }
});

btn.addEventListener('click', async function () {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    toText.setAttribute('placeholder', 'Translating...');
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    if (text !== '') {
        let res = await fetch(apiUrl);
        let resData = await res.json();
        toText.value = resData.responseData.translatedText;
        toText.setAttribute('placeholder', 'Translation');
    }

});

icons.forEach((el) => {
    el.addEventListener('click', function ({target}) {
        if (target.classList.contains('fa-copy')) {
            if (target.id === 'from') {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id === 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})


exchange.addEventListener('click', function () {
    let tempText = fromText.value;

    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;

    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})