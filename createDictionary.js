if (!localStorage.getItem("dictionary")) {
    localStorage.setItem("dictionary", '["word", "word1", "word2"]');
}

if (!localStorage.getItem("dictionary","learningWords","difficultWords")) {
    localStorage.setItem("dictionary", '["word", "word1", "word2"]');
}

const containers = Array.from(document.querySelectorAll(".container"))
    .reduce((prev, el) => {
        prev[el.dataset.name] = el;
        return prev;
    }, {});

const renderHtml = {

    dictionary: function (name) {
        return "<div class='word' data-name='" + name + "'><span>" + name + "</span><button class='remove'>Удалить</button><button class='difficult'>Сложные</button></div>";
    },
    restore: function (name) {
        return "<div class='word' data-name='" + name + "'><span>" + name + "</span><button class='restore'>Восстановить</button></div>";
    },
    deleted: function (name) {
        return this.restore(name);
    },
    difficult: function (name) {
        return this.restore(name);
    }

};

const words = {
    dictionary: JSON.parse(localStorage.getItem("dictionary") || "[]"),
    deleted: JSON.parse(localStorage.getItem("deleted") || "[]"),
    difficult: JSON.parse(localStorage.getItem("difficult") || "[]")
}

function save(name) {
    localStorage.setItem(name, JSON.stringify(words[name]));
}

function fill(name) {
    let html = "";
    words[name].forEach(el => html += renderHtml[name](el));

    containers[name].insertAdjacentHTML("afterbegin", html);
}

fill("dictionary");
fill("deleted");
fill("difficult");


const navs = document.querySelectorAll(".nav");
navs.forEach((el, i) => {
    let target = el.dataset.target;

    el.addEventListener("click", function () {
        if (el.classList.contains("selected")) return;

        navs.forEach(el => el.classList.remove("selected"));
        el.classList.add("selected");

        Object.values(containers).forEach(el => el.classList.add("closed"));
        containers[target].classList.remove("closed");
    });
});


document.addEventListener("click", function (event) {

    if (event.target.closest(".remove") || event.target.closest(".difficult")) {
        let name;
        if (event.target.closest(".remove")) name = "deleted";
        else if (event.target.closest(".difficult")) name = "difficult";

        let dom = event.target.closest(".word");
        let index = words.dictionary.indexOf(dom.dataset.name);

        dom.remove();
        containers[name].insertAdjacentHTML("beforeend", renderHtml[name](words.dictionary[index]));

        words[name].push(words.dictionary[index]);
        words.dictionary.splice(index, 1);
        save(name);
        save("dictionary");
        return;
    }

    if (event.target.closest(".restore")) {

        let dom = event.target.closest(".word");
        let name = event.target.closest(".container").dataset.name;
        let index = words[name].indexOf(dom.dataset.name);

        dom.remove();
        containers.dictionary.insertAdjacentHTML("beforeend", renderHtml.dictionary(words[name][index]));

        words.dictionary.push(words[name][index]);
        words[name].splice(index, 1);
        save("dictionary");
        save(name);


    }

});


