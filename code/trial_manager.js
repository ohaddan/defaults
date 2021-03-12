//######################################################################################################################
// Constants and initialization
//######################################################################################################################
const RISKY_REWARDS = [5, 6, 7, 8, 10, 12, 14, 16, 19, 23, 27, 31, 37, 44, 52, 61, 73, 86, 101, 120];
const RISKY_PROBABILITIES = [25, 50, 75];
const DEFAULT_TYPE_RISKY = 'RISKY';
const DEFAULT_TYPE_SAFE = 'SAFE';
const DEFAULT_TYPE_NON = 'NO_DEFAULT';
const CHOICE_RISKY = 'CHOICE_RISKY';
const CHOICE_SAFE = 'CHOICE_SAFE';
DEFAULT_P = 100;
DEFAULT_R = 5;


let TRIAL_TYPE;
if (Math.random()>0.5){
    TRIAL_TYPE = [DEFAULT_TYPE_SAFE, DEFAULT_TYPE_NON];
}
else {
    TRIAL_TYPE = [DEFAULT_TYPE_RISKY, DEFAULT_TYPE_NON];
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
    hide_element_with_id('trial_content');
    hide_element_with_id('fixation_holder');
    trial_number = 0;
    next_trial();
    set_trial_risky_reward_probability();
    // if (Math.random()>0.5){ FFFFFFFFFFFFIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXXXX!!!!!!!!!!!!!!!!!!!!
    //     switch_risky_and_safe();
    // }
    document.getElementById('trial_content').style.display = 'block';
    // blink();
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
    hide_element_with_id('head_free_choice');
    hide_element_with_id('head_default');
}

function set_trial_risky_reward_probability(){
    let p = TRIAL_LIST[trial_number][0];
    let r = TRIAL_LIST[trial_number][1];
    current_trial_type = TRIAL_LIST[trial_number][2];
    set_trial(p, r);
}

function next_trial(){
    default_reset();
    hide_element_with_id('fixation_holder');
    hide_element_with_id('header_between_trials');
    current_trial_type=TESTING_DEFAULT;
    if(current_trial_type==DEFAULT_TYPE_NON){
        unhide_element_with_id("head_free_choice");
        hide_element_with_id("head_default");
        set_free_choice_trial();
    }
    else{
        hide_element_with_id("head_free_choice");
        unhide_element_with_id("head_default");
        if(current_trial_type==DEFAULT_TYPE_SAFE){
            set_default_safe();
        }
        else if(current_trial_type==DEFAULT_TYPE_RISKY){
            set_default_risky();
        }
    }
    unhide_element_with_id('trial_content');
}

function enable_continue_button(){
    hide_element_with_id('header_wait');
    unhide_element_with_id('header_between_trials');
    document.getElementById('fixation_text').disabled = false;
    document.getElementById('fixation_text').innerText = 'Continue';
}

    //---------------------------------------------------------------------------------
    // Manage choices
    //---------------------------------------------------------------------------------
function implement_choice(){
    hide_element_with_id('choice_presentation');
    trial_number ++;
    set_trial_risky_reward_probability();

    //// Present fixation + (currently disabled)
    //unhide_element_with_id('header_wait');
    // document.getElementById('fixation_text').disabled = true;
    // setTimeout(enable_continue_button, BUTTON_DISABLE_TIME);
    // document.getElementById('fixation_text').innerText = '+'

    // Set fixation screen

    unhide_element_with_id('fixation_holder');
    document.getElementById('fixation_text').disabled = false;
    document.getElementById('fixation_text').innerText = 'Continue';

}
        //---------------------------------------------------------------------------------
        // Manage choice in a FREE CHOICE trial
        //---------------------------------------------------------------------------------
function risky_choice(){
    if(current_trial_type==DEFAULT_TYPE_NON) { // Otherwise, we don't get actual choices just "continue, switch"
        write_trial_then_implement_choice(CHOICE_RISKY);
    }
}

function safe_choice(){
    if(current_trial_type==DEFAULT_TYPE_NON) { // Otherwise, we don't get actual choices just "continue, switch"
        write_trial_then_implement_choice(CHOICE_SAFE);
    }
}

        //---------------------------------------------------------------------------------
        // Manage choice in a DEFAULTS trials
        //---------------------------------------------------------------------------------
let TESTING_DEFAULT = DEFAULT_TYPE_SAFE;
function choice_default(){
    current_trial_type=TESTING_DEFAULT;
    if(current_trial_type==DEFAULT_TYPE_SAFE){
        write_trial_then_implement_choice(CHOICE_SAFE);
    }
    else if(current_trial_type==DEFAULT_TYPE_RISKY){
        write_trial_then_implement_choice(CHOICE_RISKY);
    }
}

function choice_switch(){
    current_trial_type=TESTING_DEFAULT;
    if(current_trial_type==DEFAULT_TYPE_SAFE){
        write_trial_then_implement_choice(CHOICE_RISKY);
    }
    else if(current_trial_type==DEFAULT_TYPE_RISKY){
        write_trial_then_implement_choice(CHOICE_SAFE);
    }
}
//######################################################################################################################
// Set default
//######################################################################################################################

function set_free_choice_trial(){
    /**
     * Adjust the css classes to visualize a trial with free choice (mainly hover and click effect)
     */
    addClass(document.getElementById("risky_text"), "choice");
    addClass(document.getElementById("safe_text"), "choice");
    unhide_element_with_id("head_free_choice");
    hide_element_with_id("head_default");

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