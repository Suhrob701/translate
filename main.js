const apiUrl = "https://api.mymemory.translated.net/get";

const languages = {
    "af": "Afrikaans", "sq": "Albanian", "am": "Amharic", "ar": "Arabic", "hy": "Armenian",
    "az": "Azerbaijani", "eu": "Basque", "bn": "Bengali", "bs": "Bosnian", "bg": "Bulgarian",
    "zh": "Chinese", "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English",
    "et": "Estonian", "tl": "Filipino", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek",
    "hi": "Hindi", "hu": "Hungarian", "is": "Icelandic", "id": "Indonesian", "it": "Italian",
    "ja": "Japanese", "ko": "Korean", "lv": "Latvian", "lt": "Lithuanian", "ms": "Malay",
    "no": "Norwegian", "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian",
    "ru": "Russian", "sr": "Serbian", "sk": "Slovak", "sl": "Slovenian", "es": "Spanish",
    "sv": "Swedish", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "uz": "Uzbek",
    "vi": "Vietnamese"
};

document.addEventListener("DOMContentLoaded", () => {
    const inputLang = document.getElementById("inputLang");
    const outputLang = document.getElementById("outputLang");

    Object.entries(languages).forEach(([code, name]) => {
        inputLang.innerHTML += `<option value="${code}">${name}</option>`;
        outputLang.innerHTML += `<option value="${code}">${name}</option>`;
    });
});

document.getElementById("translateBtn").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const fromLang = document.getElementById("inputLang").value;
    const toLang = document.getElementById("outputLang").value;

    if (!text) return;

    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
    const data = await response.json();

    document.getElementById("outputText").value = data.responseData.translatedText;
});

function speakText(targetId, langSelectId) {
    let text = document.getElementById(targetId).value;
    let lang = document.getElementById(langSelectId).value;

    if (!text) return;

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

document.getElementById("speakInput").addEventListener("click", () => {
    speakText("inputText", "inputLang");
});

document.getElementById("speakOutput").addEventListener("click", () => {
    speakText("outputText", "outputLang");
});




