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

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
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