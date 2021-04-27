/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

const cartesian =
    (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}

// Add/remove classes from objects

function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClassToElemId(id, className){
    addClass(document.getElementById(id), className)
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClassToElemId(id, className){
    removeClass(document.getElementById(id), className)
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

function blink(divId='default_ok_button') {
    var f = document.getElementById(divId);
    setTimeout(function() {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 500);
}

function hide_element_with_id(id){
    document.getElementById(id).style.display = 'none';
}

function unhide_element_with_id(id){
    document.getElementById(id).style.display = 'block';
}


function get_current_time_in_ms(){
    return new Date().getTime();
}

//##################################################################################################################
// Flash the default
//##################################################################################################################
var is_flash_default = false;
function flash_the_default(){
    is_flash_default = true;
    continue_flushing_default(0);
}

function continue_flushing_default(toDark=1){
    if(is_flash_default){
        document.getElementById('default_ok_button').innerText = 'Sure?';
        if (toDark==1){
            removeClassToElemId('default_ok_button', 'animate_to_bright');
            addClassToElemId('default_ok_button','animate_to_dark');
            setTimeout(continue_flushing_default, 400, 0);
        }
        else{
            removeClassToElemId('default_ok_button', 'animate_to_dark');
            addClassToElemId('default_ok_button','animate_to_bright');
            setTimeout(continue_flushing_default, 400, 1);
        }
    }
}

function stop_default_flash(){
    is_flash_default = false;
    document.getElementById('default_ok_button').innerText = 'OK';
    removeClassToElemId('default_ok_button', 'animate_to_dark');
    removeClassToElemId('default_ok_button', 'animate_to_bright');
}

//##################################################################################################################
// Present current choice
//##################################################################################################################
const CHOICE_PRESENTATION_TIME = 1500;
function write_trial_then_implement_choice(choice){
    if(choice==CHOICE_RISKY){
        log_risky_choice(true);
    }
    else{
        log_risky_choice(false);
    }
    display_choice(choice);
    setTimeout(implement_choice, CHOICE_PRESENTATION_TIME);
}

function display_choice(choice){
    let p = DEFAULT_P;
    let r = DEFAULT_R;
    if(choice==CHOICE_RISKY){
        p = TRIAL_LIST[trial_number][0];
        r = TRIAL_LIST[trial_number][1];
    }
    document.getElementById('choice_presentation_amount').innerText = r;
    document.getElementById('choice_presentation_probability').innerText = p;
    hide_trial();
    unhide_element_with_id('choice_presentation');
}
