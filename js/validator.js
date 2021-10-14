const x = document.forms.coordinates.elements.X_value;
const y = document.getElementById("y");
const r = document.getElementById("r");
let table = document.getElementById("tbody");

function validate_data() {
    if (check_filled()) {
        if (Y_validation(-5, 5)) {
            if (R_validation(1, 4)) {
                return true;
            }
        }
    }
    return false;
}

function check_filled(){
    let isFilled = true;

    if (!x.value) {
        $('#messageX').text("Выбор Х обязателен.");
        isFilled = false;
    }else{
        $('#messageX').text("");
    }

    if (!y.value){
        y.style.border = "1px solid red";
        $('#messageY').text("Ввод Y обязателен.");
        isFilled = false;
    }else{
        $('#messageY').text("");
        y.style.border = "1px solid black";
    }

    if (!r.value){
        r.style.border = "1px solid red";
        $('#messageR').text("Ввод R обязателен.");
        isFilled = false;
    }else{
        $('#messageR').text("");
        r.style.border = "1px solid black";
    }

    return isFilled;
}

function Y_validation(min, max) {
    if (y.value >= min && y.value <= max) {
        $('#messageY').text("");
        y.style.border = "1px solid black";
        return true;
    } else {
        y.style.border = "1px solid red";
        $('#messageR').text("Проверьте ввод значения Y.");
        return false;
    }
}

function R_validation(min, max) {
    if (r.value >= min && r.value <= max) {
        $('#messageR').text("");
        r.style.border = "1px solid black";
        return true;
    } else {
        r.style.border = "1px solid red";
        $('#messageR').text("Проверьте ввод значения R.");
        return false;
    }
}

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        let isOk = validate_data();
        if (isOk) {
            $.ajax({
                url: "script.php",
                async: true,
                type: "GET",
                data: {
                    "x": x.value,
                    "y": y.value,
                    "r": r.value
                },
                cache: false,
                success: function(response) {
                    let table = document.getElementById("tbody");
                    table.insertAdjacentHTML('beforeend', response);
                },
            });
        }
    })
});

$(document).ready(function () {
    $.ajax({
        url: "restore.php",
        async: true,
        type: "GET",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})

$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: "reset.php",
            async: true,
            type: "GET",
            data: {},
            cache: false,
            success: function(response) {
                table.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Выполнение</th>
                    <th>Время</th>
                    <th>Валидность данных</th>
                </tr>
                `
            }
        });
    })
})
