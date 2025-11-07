const el = document.querySelector('.typewriting');
const prefix = "Explore ";
const words = ["free speech", "chaos", "truth", "madness", "yapping", "edgy jokes"];
let i = 0;

el.textContent = prefix;

function typeWord(word, callback) {
let j = 0;
function typing() {
    if (j < word.length) {
    el.textContent = prefix + word.substring(0, j + 1);
    j++;
    setTimeout(typing, 80);
    } else {
    setTimeout(() => eraseWord(callback), 1200);
    }
}
typing();
}

function eraseWord(callback) {
let current = el.textContent.slice(prefix.length);
function erasing() {
    if (current.length > 0) {
    current = current.slice(0, -1);
    el.textContent = prefix + current;
    setTimeout(erasing, 40);
    } else {
    callback();
    }
}
erasing();
}

function loop() {
typeWord(words[i], () => {
    i = (i + 1) % words.length;
    loop();
});
}

loop();