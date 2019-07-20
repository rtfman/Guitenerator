




const colorKeyChanger = () => {
    const color0 = 'rgb(156, 156, 156)'
    const color1 = '#fc5549'
    const color2 = '#9bd5fc'
    const color3 = '#6497f7'
    const color4 = '#54a3e5'
    const color5 = '#4cc6d3'
    const color6 = '#90f1fc'
    const color7 = 'rgb(248, 138, 34)'
    const colorArr = [color0, color1, color2, color3, color4, color5, color6, color7]
    let drop = document.getElementsByTagName("a");
    
    for (let i = 0; i < drop.length; i++) {
        drop[i].addEventListener('click', function() {
            if (drop[i].id === "drop0") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[0];
            }
            if (drop[i].id === "drop1") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[1];
            }
            if (drop[i].id === "drop2") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[2];
            }
            if (drop[i].id === "drop3") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[3];
            }
            if (drop[i].id === "drop4") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[4];
            }
            if (drop[i].id === "drop5") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[5];
            }
            if (drop[i].id === "drop6") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[6];
            }
            if (drop[i].id === "drop7") {
                drop[i].parentNode.parentNode.style.backgroundColor = colorArr[7];
            }
        });
    }
}

let william = 'will'

const toString = (name) => {
    console.log(name, `${name}`)
} 

//toString(will);


const colorKeyDisp = (node) => {
    this.node = node;
    let tx;
    convertToText = (el) => {
        tx = Object.keys({el})[0]
        console.log(tx);
    }
    convertToText(node);
    console.log();
    //document.getElementById(node).textContent = tx;
}

colorKeyDisp(william);



let M2 = {
    node: '.node-test', //document.querySelectorAll(`${DOMNotes[2]}`),
    name: 'M2'
};

let m2 = {
    node: '.node-test2',
    name: 'm2'
}

let M3 = {
    node: '.node-test3',
    name: 'M3a'
}

let noteArr = [M2, m2, M3]

console.log(noteArr[0].node);





