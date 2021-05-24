//######################################################################################################################
// Constants and initialization
//######################################################################################################################
// ########## Constant game definitions
const RISKY_REWARDS = [4, 5, 6, 7, 8, 10, 12, 14, 16, 19, 23, 27, 31, 37, 44, 52, 61, 73, 86, 101, 120];
const RISKY_PROBABILITIES = [25, 50, 75];

// ########## Constant Namings
const DEFAULT_TYPE_RISKY = 'RISKY';
const DEFAULT_TYPE_SAFE = 'SAFE';
const DEFAULT_TYPE_NON = 'NO_DEFAULT';
const CHOICE_RISKY = 'CHOICE_RISKY';
const CHOICE_SAFE = 'CHOICE_SAFE';
DEFAULT_P = 100;
DEFAULT_R = 5;

// ########## Constant timings
const BUTTON_DISABLE_TIME = 2000;

// ########## Constant Paths
const PROBABILITY_IMAGE_PATH = "media/probability_images/";
const REWARD_IMAGE_PATH = "media/reward_images/";

// ########## Define once current game
let TRIAL_TYPE;
if (Math.random()>0.5){
    TRIAL_TYPE = [DEFAULT_TYPE_SAFE, DEFAULT_TYPE_NON];
}
else {
    TRIAL_TYPE = [DEFAULT_TYPE_RISKY, DEFAULT_TYPE_NON];
}

TRIAL_TYPE = [DEFAULT_TYPE_RISKY, DEFAULT_TYPE_SAFE, DEFAULT_TYPE_NON];

const TRIAL_LIST = cartesian(RISKY_PROBABILITIES, RISKY_REWARDS, TRIAL_TYPE);
shuffle(TRIAL_LIST);
let trial_number;
let current_trial_type;
let trial_presentation_time;
const N = TRIAL_LIST.length;
const user_choices = []; // participants choices as (r, p) tuples.



function init(){
    hide_element_with_id('trial_content');
    hide_element_with_id('fixation_holder');
    trial_number = 0;
    set_trial_risky_reward_probability();
    next_trial();

    if (Math.random()>0.5){
        switch_risky_and_safe();
    }
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

function set_header_recommendation(p, r){
    document.getElementById('risky_probability_text_head').textContent = p + '%';
    document.getElementById('risky_probability_reward_head').textContent = '$' + r;
}

function set_trial(p, r){
    /**
     * p - probability of risky reward
     * r - risky reward
     */
    document.getElementById('risky_probability_text_body').textContent = p + '%';
    document.getElementById('risky_probability_reward_body').textContent = '$' + r;

    document.getElementById('risky_probability_image').src = PROBABILITY_IMAGE_PATH + "p_" + p + ".PNG";
    document.getElementById('risky_reward_image').src = REWARD_IMAGE_PATH + "r_" + r + ".PNG";
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
    hide_element_with_id('choice_presentation');
    trial_presentation_time = get_current_time_in_ms();
    default_reset();
    hide_element_with_id('fixation_holder');
    hide_element_with_id('header_between_trials');
    if(current_trial_type==DEFAULT_TYPE_NON){
        unhide_element_with_id("head_free_choice");
        hide_element_with_id("head_default");
        set_free_choice_trial();
    }
    else{
        hide_element_with_id("head_free_choice");
        unhide_element_with_id("head_default");
        if(current_trial_type==DEFAULT_TYPE_SAFE){
            set_header_recommendation(DEFAULT_P, DEFAULT_R);
            set_default_safe();
        }
        else if(current_trial_type==DEFAULT_TYPE_RISKY){
            let p = TRIAL_LIST[trial_number][0];
            let r = TRIAL_LIST[trial_number][1];
            set_header_recommendation(p, r);
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
function log_risky_choice(is_risky_choice){
    let p, r;
    if(is_risky_choice){
        p = TRIAL_LIST[trial_number][0];
        r = TRIAL_LIST[trial_number][1];
    }
    else{
        p = DEFAULT_P;
        r = DEFAULT_R;
    }
    user_choices.push([p, r]);

    let trial_data = {};
    trial_data['trial_number'] = trial_number;
    trial_data['p_risky'] = TRIAL_LIST[trial_number][0];
    trial_data['r_risky'] = TRIAL_LIST[trial_number][1];
    trial_data['default_type'] = TRIAL_LIST[trial_number][2];
    trial_data['is_risky_choice'] = is_risky_choice;
    trial_data['rt'] = get_current_time_in_ms()-trial_presentation_time;
}

function implement_choice(){
    trial_number ++;
    if(trial_number==N-1){
        end_experiment();
    }
    set_trial_risky_reward_probability();
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


function choice_default(){
    if(current_trial_type==DEFAULT_TYPE_SAFE){
        write_trial_then_implement_choice(CHOICE_SAFE);
    }
    else if(current_trial_type==DEFAULT_TYPE_RISKY){
        write_trial_then_implement_choice(CHOICE_RISKY);
    }
}

function choice_switch(){
    if(current_trial_type==DEFAULT_TYPE_SAFE){
        write_trial_then_implement_choice(CHOICE_RISKY);
    }
    else if(current_trial_type==DEFAULT_TYPE_RISKY){
        write_trial_then_implement_choice(CHOICE_SAFE);
    }
}

        //---------------------------------------------------------------------------------
        // End experiment
        //---------------------------------------------------------------------------------
function end_experiment(){
    // let random_trial_params = user_choices[Math.floor(Math.random() * user_choices.length)];
    // window.location.href = "instructions/thank_you.html?q=" + btoa(random_trial_params);
    go_next_page();
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
    removeClass(document.getElementById("risky_text"), "choice");
    removeClass(document.getElementById("safe_text"), "choice");

    addClass(document.getElementById("risky_text"), "blur_text");
    addClass(document.getElementById("safe_text"), "default_text");
    addClass(document.getElementById("risky_reward_image"), "blur_image");
    addClass(document.getElementById("risky_probability_image"), "blur_image");
}

function set_default_risky(){
    removeClass(document.getElementById("risky_text"), "choice");
    removeClass(document.getElementById("safe_text"), "choice");

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

//######################################################################################################################
// Thank you page
//######################################################################################################################
function thank_you_display_chosen_trial(){
    let random_trial_params = user_choices[Math.floor(Math.random() * user_choices.length)];
    let p = random_trial_params[0];
    let r = random_trial_params[1];

    document.getElementById('thank_you_probability').innerText = p;
    document.getElementById('thank_you_reward').innerText = r;
    document.getElementById('thank_you_win_lose').innerText = (Math.random() < p ? 'win' : 'do not with').concat(' a bonus of $', r/10,'.');

}