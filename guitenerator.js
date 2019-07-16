////////// MODEL ///////////
const model = (() => {
    //Arrays for Key, Quality and Extension
    const key = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G','G#/Ab']
    const quality = ['M', 'M6', 'M7', 'm', 'm6', 'm7', 'min/M7', 'm7b5', 'dim', 'dim7', 'aug', 'aug7', 'sus2', 'sus4', '7', '7']
    let extension = ['9', 'b9', '#9', '11', '#11', '#5', '13', 'b13'];
    let randKey, randQual, randEx1, randEx2;

    const rand = (el) => {
        let num = Math.floor(Math.random() * el.length)
        return el[num];
    }

    //Defines Extension so no Repeats/Wierd Chords (e.g. Sus4/11)
    function extensionDefine(qual) {
        if (qual === 'M') {
            return extension = ['9', 'b9', '#9', '11', '#11', '']
        } else if (qual === 'M7') {
            return extension = ['9', 'b9', '#9', '11', '#11','#5', '']
        }else if (qual === 'M6') {
            return extension = ['9', 'b9', '#9', '11', '#11', 'b13', ''] 
        } else if (qual === 'm' || qual === 'm7' || qual === 'min/M7') {
            return extension = ['9', 'b9', '11', '#5', 'b13', '13', '']
        } else if (qual === 'm6') {
            return extension = ['9', 'b9', '11','b13','']
        }else if (qual === 'm7b5') {
            return extension = ['9', 'b9','11', '13', 'b13', ''];
        } else if (qual === 'dim' || qual === 'dim7') {
            return extension = ['9', 'b9', '11', 'b13', '']
        } else if (qual === 'aug' || qual === 'aug7') {
            return extension = ['9', 'b9', '#9', '11', '13', '']
        } else if (qual === 'sus2') {
            return extension = ['b9', '#9', '11', '#11', '13', 'b13','' ]
        } else if (qual === 'sus4') {
            return extension = ['9', 'b9', '#9','#11', '13', 'b13', '']
        } else {
            extension = ['9', 'b9', '#9', '11', '#11', '#5', '13', 'b13', ''];
        }
    }

    return {
        //Random Root and Quality Generator
        genChord: () => {
            randKey = rand(key);
            randQual = rand(quality);
            return {
                key: randKey,
                qual: randQual, 
            }
            
        }, 

        //Random Extension generator
        genEx: () => {
            extensionDefine(randQual)
            randEx1 = rand(extension);
            //console.log(extension);
            return {
                ex1: randEx1,
            };
        },

        getArr: () => {
            return {
                keyArr: key,
                qualArr: quality,
                exArr: extension
            }
        },
    }

})();

                      /////////// SCALE CONTROLLER      ///////////

const scaleController = (() => {
    let displayRoot, displayQual, displayEx1, displayEx2;
    let rootArrAfter, rootArrBefore, fullRootArr, rootIndex;
    let DOMNotes = [];
    let  selectRt, selectQ, selectEx1, selectEx2;
    
    const DOM = {
        rootDisp: "root-disp",
        qualDisp: "qual-disp",
        ex1Disp: "ex1-disp",
        rtSel: '.select-style.rt',
        qSel: '.select-style.q',
        ex1Sel: '.select-style.ex1',
        ex2Sel: '.select-style.ex2',
        btnRand: "btn-rand-gen",
        btnMenu: "btn-menu-gen",
        btnColorDrop: '.btn-color-drop',
        keyR: "key-r",
        key3: "key-3",
        key5: "key-5",
        key7: "key-7",
        keyEx1: "key-ex1",
        keyEx2: "key-ex2",
        c: '.sc-note-c',
        cSh: '.sc-note-c-sh',
        d: '.sc-note-d',
        dSh: '.sc-note-d-sh',
        e: '.sc-note-e',
        f: '.sc-note-f',
        fSh: '.sc-note-f-sh',
        g: '.sc-note-g',
        gSh: '.sc-note-g-sh',
        a: '.sc-note-a',
        aSh: '.sc-note-a-sh',
        b: '.sc-note-b',
    }

    

    //Sets DOM Nodes to display Chord Element
    const display = (el, disp) => {
        return disp.textContent = el}

    //Clears Chord text display
    const textDispClear = (rt, q, ex1, ex2) => {
        rt.textContent = '';
        q.textContent = '';
        ex1.textContent = '';
    }



    //Returns Marker display, html, color to default each click
    const markerReset = () => {
        const mrk = document.querySelectorAll('.mrk');
        for (let i = 0; i < 78; i++) {
            mrk[i].style.display = "none";
            mrk[i].innerHTML = "";
            colorRoot(mrk[i]);
            //mrk[i].style.backgroundColor = "#e01854";
        }
    } 

    //Defines New Root Array starting from curently displayed Root Note 
    const rootArr = (rt) => {
        rootIndex = model.getArr().keyArr.indexOf(rt);
        rootArrAfter = model.getArr().keyArr.slice(rootIndex)
        rootArrBefore = model.getArr().keyArr.slice(0, rootIndex)
        fullRootArr = rootArrAfter.concat(rootArrBefore)
    }

    //Sets colors for note markers
    const colorRoot = (note) => {
        note.style.backgroundColor = "#fc5549"//red
    }

    const color3rd = (note) => {
        note.style.backgroundColor = "#9bd5fc"//blue
    }

    const color5th = (note) => {
        note.style.backgroundColor = "#6497f7"//blue
    }

    const color7th = (note) => {
        note.style.backgroundColor = "#54a3e5"//blue
    }

    const colorEx1 = (note) => {
        note.style.backgroundColor = "#4cc6d3"//teal
    }

    const colorEx2 = (note) => {
        note.style.backgroundColor = "#90f1fc"//teal
    }

    
    //Reorders array of DOM Nodes starting with displayed Root Note
    const DOMNoteArr = () => {

        const noteArr = [DOM.a, DOM.aSh, DOM.b, DOM.c, DOM.cSh, DOM.d, DOM.dSh, DOM.e, DOM.f, DOM.fSh, DOM.g, DOM.gSh]

        if (fullRootArr[0] === 'A') {
            DOMNotes = noteArr
        } else if (fullRootArr[0] === 'A#/Bb') {
            before = noteArr.slice(1)
            after = noteArr.slice(0, 1)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'B') {
            before = noteArr.slice(2)
            after = noteArr.slice(0, 2)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'C') {
            before = noteArr.slice(3)
            after = noteArr.slice(0, 3)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'C#/Db') {
            before = noteArr.slice(4)
            after = noteArr.slice(0, 4)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'D') {
            before = noteArr.slice(5)
            after = noteArr.slice(0, 5)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'D#/Eb') {
            before = noteArr.slice(6)
            after = noteArr.slice(0, 6)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'E') {
            before = noteArr.slice(7)
            after = noteArr.slice(0, 7)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'F') {
            before = noteArr.slice(8)
            after = noteArr.slice(0, 8)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'F#/Gb') {
            before = noteArr.slice(9)
            after = noteArr.slice(0, 9)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'G') {
            before = noteArr.slice(10)
            after = noteArr.slice(0, 10)
            DOMNotes = before.concat(after)
        } else if (fullRootArr[0] === 'G#/Ab') {
            before = noteArr.slice(11)
            after = noteArr.slice(0, 11)
            DOMNotes = before.concat(after)
        }
    }

    //Displays Root Markers
    const rootMrkDisplay = () => {
        markerReset();
        
        let noteC = document.querySelectorAll(DOM.c);
        let noteCSh = document.querySelectorAll(DOM.cSh);
        let noteD = document.querySelectorAll(DOM.d);
        let noteDSh = document.querySelectorAll(DOM.dSh);
        let noteE = document.querySelectorAll(DOM.e);
        let noteF = document.querySelectorAll(DOM.f);
        let noteFSh = document.querySelectorAll(DOM.fSh);
        let noteG = document.querySelectorAll(DOM.g);
        let noteGSh = document.querySelectorAll(DOM.gSh);
        let noteA = document.querySelectorAll(DOM.a);
        let noteASh = document.querySelectorAll(DOM.aSh);
        let noteB = document.querySelectorAll(DOM.b);
        
        const mrkDisp = (nt) => {
            
            nt.style.display = "block"
            //nt.innerHTML = "R"
        }

        if (displayRoot === 'C') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteC[i])
                // noteC[i].style.display = "block";
                // noteC[i].innerHTML = "R";
            }               
        } else if (displayRoot === 'C#/Db') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteCSh[i])
            }
        } else if (displayRoot === 'D') {
            for (let i = 0; i < 7; i++) {
                mrkDisp(noteD[i])
            }                
        } else if (displayRoot === 'D#/Eb') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteDSh[i])
            }
        } else if (displayRoot === 'E') {
            for (let i = 0; i < 8; i++) {
                mrkDisp(noteE[i])
            }
        } else if (displayRoot === 'F') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteF[i])
            }
        } else if (displayRoot === 'F#/Gb') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteFSh[i])
            }
        } else if (displayRoot === 'G') {
            for (let i = 0; i < 7; i++) {
                mrkDisp(noteG[i])
            }
        } else if (displayRoot === 'G#/Ab') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteGSh[i])
            }
        } else if (displayRoot === 'A') {
            for (let i = 0; i < 7; i++) {
                mrkDisp(noteA[i])
            }
        } else if (displayRoot === 'A#/Bb') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteASh[i])
            }
        } else if (displayRoot === 'B') {
            for (let i = 0; i < 7; i++) {
                mrkDisp(noteB[i])
            }
        }
    }
    
    //Displays Quality Markers
    const noteMrkQualStyle = () => {
        let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
        let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
        let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
        let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
        let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
        let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
        let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
        let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
        let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
        let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
        let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

        const qualStyler3rd = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color3rd(el[i]);
                //el[i].innerHTML = tx;
            }
            colorKeyDisp(DOM.key3, tx);
        }

        const qualStyler5th = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color5th(el[i]);
                //el[i].innerHTML = tx;
            }
            colorKeyDisp(DOM.key5, tx);
        }

        const qualStyler7th = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                color7th(el[i]);
                //el[i].innerHTML = tx;
            }
            colorKeyDisp(DOM.key7, tx);
        }

        colorClear();
        
        if (displayQual === 'M') {
           qualStyler3rd(M3, 'M3');
           qualStyler5th(P5, 'P5');
        } else if (displayQual === 'M6') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(M6, 'M6');
        } else if (displayQual === 'M7') {
            if(displayEx1 === '#5') {
                qualStyler3rd(M3, 'M3');
                qualStyler7th(M7, 'M7');
            } else {
                qualStyler3rd(M3, 'M3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(M7, 'M7');
            }
            
        } else if (displayQual === 'm') {
            if (displayEx1 === '#5') {
                qualStyler3rd(m3, 'm3');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
            }
            
        } else if (displayQual === 'm6') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(M6, 'M6');
        } else if (displayQual === 'm7') {
            if (displayEx1 === '#5') {
                qualStyler3rd(m3, 'm3');
                qualStyler7th(m7, 'm7');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(m7, 'm7');
            }
        } else if (displayQual === 'min/M7') {
            if (displayEx1 === '#5') {
                qualStyler3rd(m3, 'm3');
                qualStyler7th(M7, 'M7');
            } else {
                qualStyler3rd(m3, 'm3');
                qualStyler5th(P5, 'P5');
                qualStyler7th(M7, 'M7');
            }
            
        } else if (displayQual === 'm7b5') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(d5, 'b5');
            qualStyler7th(m7, 'm7');
            
        } else if (displayQual === 'dim') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(d5, 'b5');
           
        } else if (displayQual === 'dim7') {
            qualStyler3rd(m3, 'm3');
            qualStyler5th(d5, 'b5');
            qualStyler7th(M6, 'd7');
           
        } else if (displayQual === 'aug') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(m6, '#5');
        } else if (displayQual === 'aug7') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(m6, '#5');
            qualStyler7th(m7, 'm7');
        } else if (displayQual === 'sus2') {
            qualStyler3rd(M2, 'M2');
            qualStyler5th(P5, 'P5');
        } else if (displayQual === 'sus4') {
            qualStyler3rd(P4, 'P4');
            qualStyler5th(P5, 'P5');

        } else if (displayQual === '7') {
            qualStyler3rd(M3, 'M3');
            qualStyler5th(P5, 'P5');
            qualStyler7th(m7, 'm7');
        }
    }

    //Displays Extension Markers
    const noteMrkExStyle = (ex) => {
        let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
        let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
        let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
        let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
        let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
        let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
        let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
        let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
        let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
        let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
        let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

        const exStyler = (el, tx) => {
            for (let i = 0; i < el.length; i++) {
                el[i].style.display = "block"
                colorEx1(el[i]);
                //el[i].innerHTML = tx;
            }
            colorKeyDisp(DOM.keyEx1, tx)
        }

        if (ex === 'b9') {
            exStyler(m2, 'b9');
        } else if (ex === '9') {
            exStyler(M2, '9');
        } else if (ex === '#9') {
            exStyler(m3, '#9');
        } else if (ex === '11') {
            exStyler(P4, '11');
        } else if (ex === '#11') {
            exStyler(d5, '#11');
        } else if (ex === '#5') {
            exStyler(m6, '#5');
        } else if (ex === 'b13') {
            exStyler(m6, 'b13');
        } else if (ex === '13') {
            exStyler(M6, '13');
        }
    }

    //Displays text inside color key markers
    const colorKeyDisp = (node, tx) => {
        
        document.getElementById(node).textContent = tx;
    }
    
    // clears Color Key div text
    const colorClear = () => {
        document.getElementById(DOM.key3).textContent = "";
        document.getElementById(DOM.key5).textContent = "";
        document.getElementById(DOM.key7).textContent = "";
        document.getElementById(DOM.keyEx1).textContent = "";
        document.getElementById(DOM.keyEx2).textContent = "";
    }

    return {
        getDomStrings: () => DOM,

        //Display Chord Text from random generator
        getChordDisplay: () => {
            displayRoot = display(model.genChord().key, document.getElementById(DOM.rootDisp))
            displayQual = display(model.genChord().qual, document.getElementById(DOM.qualDisp))
            displayEx1 = display(model.genEx().ex1, document.getElementById(DOM.ex1Disp))
            //console.log(displayEx1);
        },

        //Display Chord Text From Chord Menu Choices
        menuChordTextDisp: () => {
            const dispRt = document.getElementById(DOM.rootDisp);
            const dispQ = document.getElementById(DOM.qualDisp);
            const dispEx1 = document.getElementById(DOM.ex1Disp);
            const dispEx2 = document.getElementById(DOM.ex2Disp);

            textDispClear(dispRt, dispQ, dispEx1, dispEx2);
            
            selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex];
            
            selectQ = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex];
            
            selectEx1 = document.querySelector(DOM.ex1Sel).options[document.querySelector(DOM.ex1Sel).selectedIndex];
    
            selectEx2 = document.querySelector(DOM.ex2Sel).options[document.querySelector(DOM.ex2Sel).selectedIndex];
    
            if(selectRt.value !== "sel") {
                display(selectRt.text, dispRt)
            }
            
            if (selectQ.text !== 'none') {
                display(selectQ.text, dispQ)
            }
            
            if (selectEx1.text !== 'none') {
                display(selectEx1.text, dispEx1)
            }
            if (selectEx2.text !== 'none') {
                display(selectEx2.text, dispEx2)
            }


        },
        

        //Display Note Markers corresponding to Chord menu selections
        menuRootDisp: () => {
            markerReset();
            const select = document.querySelector(DOM.rtSel)
    
            displayRoot = select.options[select.selectedIndex].text;
            
            
            //console.log(displayRoot);
        },

        menuQualDisp: () => {
            markerReset();
            const select = document.querySelector(DOM.qSel)
            displayQual = select.options[select.selectedIndex].text;
            //console.log(displayQual);
        },

        menuExDisp: () => {
            markerReset();
            const select1 = document.querySelector(DOM.ex1Sel)
            const select2 = document.querySelector(DOM.ex2Sel)
            displayEx1 = select1.options[select1.selectedIndex].text;
            displayEx2 = select1.options[select1.selectedIndex].text;
            //console.log(displayEx);
        },

        //Sets Menu options to default !NOT UPDATING REAL TIME, ONLY ON PAGE INIT!
        menuDispClear: () => {
            selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex].value = "sel";
            //[document.querySelector('.menu-style.rt').selectedIndex];
                
            selectQ = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex].value = "none";
            
            selectEx1 = document.querySelector(DOM.ex1Sel).options[document.querySelector(DOM.ex1Sel).selectedIndex].value = "none";

        },

        //Display note markers
        mrkDisp: () => {
            rootArr(displayRoot); 
            DOMNoteArr();
            rootMrkDisplay();
            noteMrkQualStyle();  
            noteMrkExStyle(displayEx1); 
            //noteMrkExStyle(displayEx2); 
        },

        colorChangeKeyMenu: () => {
            
        }

            
    }

})();

///////VIEW/////////////
const view = ((mod, scaleCtrl) => {
    const DOM = scaleCtrl.getDomStrings();
    
    const colorKeyEventListen = () => {
        
        document.getElementById("drop1").addEventListener('click', function () {
            console.log('color drop1')
        });
        document.getElementById("drop2").addEventListener('click', function () {
            console.log('color drop2')
        });
        document.getElementById("drop3").addEventListener('click', function () {
            console.log('color drop3')
        });
        document.getElementById("drop4").addEventListener('click', function () {
            console.log('color drop4')
        });
        document.getElementById("drop5").addEventListener('click', function () {
            console.log('color drop5')
        });
        document.getElementById("drop6").addEventListener('click', function () {
            console.log('color drop6')
        });
        document.getElementById("drop7").addEventListener('click', function () {
            console.log('color drop7')
        });
        document.getElementById("drop8").addEventListener('click', function () {
            console.log('color drop8')
        });
    }

    const eventListeners = () => {
        //Scale Random Button
        document.getElementById(DOM.btnRand).addEventListener('click', function() {
            scaleCtrl.getChordDisplay();
            scaleCtrl.mrkDisp();
            //ctrl.menuDispClear();
        });
        //Scale Generate Button
        document.getElementById(DOM.btnMenu).addEventListener('click', function() {
            scaleCtrl.menuChordTextDisp();
            scaleCtrl.menuRootDisp();
            scaleCtrl.menuQualDisp();
            scaleCtrl.menuExDisp();
            scaleCtrl.mrkDisp();
        });

        colorKeyEventListen();
    }

    return {
        init: () => {
            console.log('app start')
            //ctrl.menuDispClear();
            eventListeners();
        }
    }
})(model, scaleController);

view.init();