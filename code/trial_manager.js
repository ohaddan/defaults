//######################################################################################################################
// Constants and initialization
//######################################################################################################################
const RISKY_REWARDS = [5, 6, 7, 8, 10, 12, 14, 16, 19, 23, 27, 31, 37, 44, 52, 61, 73, 86, 101, 120];
const RISKY_PROBABILITIES = [25, 50, 75];
DEFUALT_TYPE_RISKY = 'RISKY';
DEFUALT_TYPE_SAFE = 'SAFE';
DEFUALT_TYPE_NON = 'NO_DEFAULT';
let TRIAL_TYPE;
if (Math.random()>0.5){
    TRIAL_TYPE = [DEFUALT_TYPE_SAFE, DEFUALT_TYPE_NON];
}
else {
    TRIAL_TYPE = [DEFUALT_TYPE_RISKY, DEFUALT_TYPE_NON];
}

const TRIAL_LIST = cartesian(RISKY_PROBABILITIES, RISKY_REWARDS, TRIAL_TYPE);
shuffle(TRIAL_LIST);
let trial_number;
let current_trial_type;
const N = TRIAL_LIST.length;
const PROBABILITY_IMAGE_PATH = "media/probability_images/";
const REWARD_IMAGE_PATH = "media/reward_images/";
const HEADER_TEXT = 'Choose the alternative you prefer:';
const BUTTON_DISABLE_TIME = 1500;


function init(){
    // document.getElementById('trial_content').style.display = 'none';
    document.getElementById('fixation_holder').style.display = 'none';
    trial_number = 0;
    next_trial();
    set_trial_risky_reward_probability();
    // if (Math.random()>0.5){ FFFFFFFFFFFFIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXXXX!!!!!!!!!!!!!!!!!!!!
    //     switch_risky_and_safe();
    // }
    document.getElementById('trial_content').style.display = 'block';
    blink();
}

//######################################################################################################################
// Manage game
//######################################################################################################################
function switch_risky_and_safe() {
    let text = document.getElementById('safe_text').parentNode;
    reverseChildren(text);
    let images = document.getElementById('safe_image').parentNode;
    reverseChildren(images);
}

function set_trial(p, r){
    /**
     * p - probability of risky reward
     * r - risky reward
     */
    let probability_text_elements = document.getElementsByClassName('risky_probability_text');
    for (let i=0; i<probability_text_elements.length; i++){
        probability_text_elements[i].textContent = p + '%';
    };

    let reward_text = document.getElementsByClassName('risky_probability_reward');
    for (let i=0; i<reward_text.length; i++){
        reward_text[i].textContent = '$' + r;
    };

    document.getElementById('risky_probability_image').src = PROBABILITY_IMAGE_PATH + "p_" + p + ".png";
    document.getElementById('risky_reward_image').src = REWARD_IMAGE_PATH + "r_" + r + ".png";
}

function hide_trial(){
    hide_element_with_id('trial_content');
    unhide_element_with_id('fixation_holder');
    unhide_element_with_id('between_trials');
}

function set_trial_risky_reward_probability(){
    let p = TRIAL_LIST[trial_number][0];
    let r = TRIAL_LIST[trial_number][1];
    current_trial_type = TRIAL_LIST[trial_number][2];
    set_trial(p, r);
}

DEFUALT_TYPE_RISKY = 'RISKY';
DEFUALT_TYPE_SAFE = 'SAFE';
DEFUALT_TYPE_NON = 'NO_DEFAULT';
function next_trial(){
    hide_element_with_id('fixation_holder');
    hide_element_with_id('header_between_trials');
    if(current_trial_type==DEFUALT_TYPE_NON){
        set_choice_trial();
    }
    else{
        default_reset();
        if(current_trial_type==DEFUALT_TYPE_SAFE){
            set_default_safe();
        }
        else if(current_trial_type==DEFUALT_TYPE_RISKY){
            set_default_risky();
        }
    }
    unhide_element_with_id('trial_content');
}

function enable_continue_button(){
    document.getElementById('fixation_text').disabled = false;
    document.getElementById('fixation_text').innerText = 'Continue'
}

function choice(){
    hide_trial();
    trial_number ++;
    set_trial_risky_reward_probability();
    document.getElementById('fixation_text').disabled = true;
    setTimeout(enable_continue_button, BUTTON_DISABLE_TIME);
    document.getElementById('fixation_text').innerText = '+'
}

function alternative_choice(){
    if (current_trial_type==DEFUALT_TYPE_NON){
        choice();
    }
}

function risky_choice(){
    alternative_choice();
}

function safe_choice(){
    alternative_choice();
}

//######################################################################################################################
// Set default
//######################################################################################################################

function set_choice_trial(){
    /**
     * Adjust the css classes to visualize a trial with free choice (mainly hover and click effect)
     */
    addClass(document.getElementById("risky_text"), "choice");
    addClass(document.getElementById("safe_text"), "choice");

}

function set_default_safe(){
    addClass(document.getElementById("risky_text"), "blur_text");
    addClass(document.getElementById("safe_text"), "default_text");
    addClass(document.getElementById("risky_reward_image"), "blur_image");
    addClass(document.getElementById("risky_probability_image"), "blur_image");
}

function set_default_risky(){
    addClass(document.getElementById("safe_text"), "blur_text");
    addClass(document.getElementById("risky_text"), "default_text");
    addClass(document.getElementById("safe_reward_image"), "blur_image");
    addClass(document.getElementById("safe_probability_image"), "blur_image");
}

function default_reset(){
    /**
     * Remove classes that visualize default in specific ways
     */

    // Remove from alternative's text
    removeClass(document.getElementById("safe_text"), "default_text");
    removeClass(document.getElementById("safe_text"), "blur_text");
    removeClass(document.getElementById("risky_text"), "default_text");
    removeClass(document.getElementById("risky_text"), "blur_text");

    // Remove from alternative's images
    let trial_images = document.getElementsByClassName("probability_reward_image");
    for (let i=0; i<trial_images.length; i++){
        removeClass(trial_images[i], "blur_image");
    }
}