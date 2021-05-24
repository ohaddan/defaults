Survey.StylesManager.applyTheme("modern");

var surveyJSON = {"pages":[{"name":"page1","elements":[{"type":"radiogroup","name":"gender","title":"Are you:","isRequired":true,"choices":[{"value":"male","text":"Male"},{"value":"female","text":"Female"},{"value":"unspecified","text":"Prefer not to say"}],"hasOther":true},{"type":"radiogroup","name":"hispanicorlatino","title":"Are you Hispanic or Latino?","isRequired":true,"choices":[{"value":"yes","text":"Yes"},{"value":"no","text":"No"},{"value":"unspecified","text":"Prefer not to say"}]},{"type":"radiogroup","name":"race","title":"What is your race?","isRequired":true,"choices":[{"value":"white","text":"White"},{"value":"black","text":"Black or African-American"},{"value":"asian","text":"Asian"},{"value":"americanindian","text":"American Indian / Alaskan Native"},{"value":"nativehawaiian","text":"Native Hawaiian / Pacific Islander"},{"value":"unspecified","text":"Prefer not to say"}],"hasOther":true,"otherText":"Other or mixed (please specify)"},{"type":"text","name":"age","title":"How old are you?","isRequired":true,"inputType":"number","min":"18","max":"100","step":1}]}]}


var survey = new Survey.Model(surveyJSON);
$(window).on("load", () => {
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: (survey) => {
            console.log(survey.data);
            go_next_page();
        }
    });
})