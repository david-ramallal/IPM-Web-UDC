//javascript version: ECMAScript 2015 (ES6)

const form = document.getElementById("form")
const inputs = document.querySelectorAll('#form input');
const eventList = document.getElementById('list');

// words with spaces & more than 0 char
const event_regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9_]+( [a-zA-ZÀ-ÿ\u00f1\u00d10-9_]+)*$/

const valids = {
    event_valid: false,
    type_valid: false
}

const values = {
    event_value: "",
    type_vale: ""
}

const validate = (evnt) => {
    switch(evnt.target.name){
        case "event":
            if (event_regex.test(evnt.target.value.trim())){
                document.getElementById('event__group').classList.remove('form__incorrect-group');
                document.getElementById('event__group').classList.add('form__correct-group');
                document.querySelector('#event__group i').classList.remove('fa-times-circle');
                document.querySelector('#event__group i').classList.add('fa-check-circle');
                document.querySelector('#event__group .form_input-error').classList.remove('form_input-error-active');
                valids[0] = true;
                values[0] = evnt.target.value.trim();

            }else{
                document.getElementById('event__group').classList.remove('form__correct-group');
                document.getElementById('event__group').classList.add('form__incorrect-group');
                document.querySelector('#event__group i').classList.remove('fa-check-circle');
                document.querySelector('#event__group i').classList.add('fa-times-circle');
                document.querySelector('#event__group .form_input-error').classList.add('form_input-error-active');
                valids[0] = false;
            }
        break;

        case "type":
            if (evnt.target.value > 0){
                document.getElementById('type__group').classList.remove('form__incorrect-group');
                document.getElementById('type__group').classList.add('form__correct-group');
                document.querySelector('#type__group i').classList.remove('fa-times-circle');
                document.querySelector('#type__group i').classList.add('fa-check-circle');
                document.querySelector('#type__group .form_input-error').classList.remove('form_input-error-active');
                valids[1] = true;
                values[1] = evnt.target.value;

             }else{
                document.getElementById('type__group').classList.remove('form__correct-group');
                document.getElementById('type__group').classList.add('form__incorrect-group');
                document.querySelector('#type__group i').classList.remove('fa-check-circle');
                document.querySelector('#type__group i').classList.add('fa-times-circle');
                document.querySelector('#type__group .form_input-error').classList.add('form_input-error-active');
                valids[1] = false;
            }
        break;
    }
}

inputs.forEach((input) => {
    input.addEventListener('blur', validate);
    input.addEventListener('keyup', validate);
    input.addEventListener('input', validate);
});

// submit behaviour
form.addEventListener('submit', (evnt) => {
    
    evnt.preventDefault();    
    
    if (valids[0] && valids[1]){

        var place = document.getElementById('place');
        var fecha = document.getElementById('fecha').value;
        
        if(fecha.length == 0){
            fecha = "Indeterminada";
        }

        var image = "";
        var altImage = "";

        if(place.value == "orzan"){
            image = "img/orzan.jpg";
            altImage = "Imagen de la Playa de Orzán";
        }else if(place.value == "marina"){
            image = "img/marina.jpg";
            altImage = "Imagen de la Marina";
        }else if(place.value == "ppon"){
            image = "img/ppon.jpg";
            altImage = "Imagen de la Plaza de Pontevedra";
        }

        var place_value = place.options[place.selectedIndex].text;

        form.reset();
        valids[0] = false;
        valids[1] = false;
        document.querySelector('#event__group i').classList.remove('fa-check-circle');
        document.querySelector('#type__group i').classList.remove('fa-check-circle');

        eventList.innerHTML += '<li><img src='+ image +' alt='+ altImage +' ><span>' + place_value + '</span><span>Evento: '+  values[0] +'</span><p>Fecha: '+ fecha +'</p><p>Tipo de Evento: '+ values[1] +'</p></li>';
    }
    else{
        if(!(valids[0])){
            document.getElementById('event__group').classList.remove('form__correct-group');
            document.getElementById('event__group').classList.add('form__incorrect-group');
            document.querySelector('#event__group i').classList.remove('fa-check-circle');
            document.querySelector('#event__group i').classList.add('fa-times-circle');
            document.querySelector('#event__group .form_input-error').classList.add('form_input-error-active');

        }
        if(!(valids[1])){
            document.getElementById('type__group').classList.remove('form__correct-group');
            document.getElementById('type__group').classList.add('form__incorrect-group');
            document.querySelector('#type__group i').classList.remove('fa-check-circle');
            document.querySelector('#type__group i').classList.add('fa-times-circle');
            document.querySelector('#type__group .form_input-error').classList.add('form_input-error-active');
        }
    }
})

