/**
 * @title Examen 2EV
 * @author dawcas
 * IDC what to write
 */

/**
 * class for the image objects
 * */
class Image {
    constructor(srcNum, tit) {
        this.src = Image.sources[srcNum]; //this.src stores the source for the Image
        this.tit = tit; // the title/alt text for the img object
        this.q = 0; // quantity of same images to control no more than two are used at a time
    }
    
    // this static property stores the path to every image we use
    static sources = ['img/bones.png', 'img/eye.png', 'img/tomb.png'];
    
    // getter for the generated img object
    get imgObj() {
        let im = document.createElement('img');
        
        im.src = this.src;
        im.title = this.tit;
        im.alt = this.tit;
        
        return im;
    }
}

// array to store all the Image instances required
const imgArr = [new Image(0, 'huesitos'), new Image(1, 'ojo'), new Image(2, 'lápida')];

/**
 * alias for document.querySelector()
 * @returns DOM object
 * */
function $(str) {
    return document.querySelector(str);
}

/**
 * alias for document.querySelectorAll()
 * @returns DOM objects array
 * */
function $$(str) {
    return document.querySelectorAll(str);
}

/**
 * @returns a random int between 0 and max-1
 * */
 function randInt(max) {
     return Math.floor(Math.random() * max);
 }

/**
 * function that starts the game
 * */
function play() {
    const divs = $$('div.card'); // array of div that will contain images
    const buttReset = $('#reset'); // reset button
    const buttResult = $('#result'); // result button
    
    let timer; // stores setTimeout()
    let preCard; // stores last selected card
    let i = 0; // counter
    
    // function reveals the card img
    function reveal() {
        this.firstElementChild.style.visibility = 'visible'; // shows img
        
        // checks if there are a previous card (preCard), if the same was clicked twice and
        // if they contain the same img to set the timer
        if (!preCard || this === preCard || this.firstElementChild.alt !== preCard.firstElementChild.alt) {
            timer = setTimeout(() => {
                this.firstElementChild.style.visibility = 'hidden'; // hids image
                preCard = null; // empties previous card
            }, 1000);
            
            preCard = this;
        } else { // if two imgs match 
            clearTimeout(timer); // destroys timer
            preCard.removeEventListener('click', reveal); // removes event listener from previous card
            this.removeEventListener('click', reveal); // removes even listener from current card
            preCard = null; // empties previous card
        }
    }
    
    // loop to add images and event listener to every div.card
    while (i < divs.length) {
        let r = randInt(3); // stores random number between 0 and 2
        
        // checks if there are already two images of the same kind
        if (imgArr[r].q < 2) {
            divs[i].appendChild(imgArr[r].imgObj); // appends the img to the div.card
            
            // add click listener to the div
            divs[i].addEventListener('click', reveal);
            
            imgArr[r].q++; // adds up to the image quantity counter
            i++; // adds to the counter
        }
    }
    
    // on click reset button will reload the page to restart the game from scratch
    buttReset.addEventListener('click', () => {
        window.location.reload();
    });
    
    // on click result button will show all the hidden images in every div.card 
    // and then removes event listener on each one
    buttResult.addEventListener('click', () => {
        for (i = 0; i < divs.length; i++) {
            divs[i].firstElementChild.style.visibility = 'visible';
            divs[i].removeEventListener('click', reveal);
        }
    });
}

// when the window is loaded fun begins
window.addEventListener('load', play);
