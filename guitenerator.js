////////// CHORD MODEL ///////////
const chordModel = (() => {
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

const scaleModel = (() => {
    
    const key = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G','G#/Ab']
    let scaleDispText;
    const getScaleDispText = () => {
        scaleDispText = document.querySelector('.select-style.q').options[document.querySelector('.select-style.q').selectedIndex].textContent;
        
        console.log(scaleDispText);
    }


})();


                      /////////// SCALE CONTROLLER      ///////////

const scaleController = (() => {
    const key = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G','G#/Ab']
    let displayRoot, displayQual;
    let rootArrAfter, rootArrBefore, fullRootArr, rootIndex;
    let scaleMenuChoice;
    let DOMNotes = [];
    let rootNote = document.querySelectorAll(DOMNotes[0]);
    let selectRt, selectQ;
    
    function Scale (name, rt, second, third, fourth, fifth, sixth, seventh) {
        this.name = name;
        this.rt = rt;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.fifth = fifth;
        this.sixth = sixth;
        this.seventh = seventh;
    }

    function Interval (name, node) {
        this.name = name;
        this.node = node;
    }

    let rt = new Interval('R', 0)
    let m2 = new Interval('m2', 1);
    let M2 = new Interval('M2', 2);;
    let m3 = new Interval('m3', 3);
    let M3 = new Interval('M3', 4);
    let P4 = new Interval('P4', 5);
    let sh4 = new Interval('#4', 6);
    let d5 = new Interval('d5', 6);
    let P5 = new Interval('P5', 7);
    let sh5 = new Interval('#5', 8);
    let m6 = new Interval('m6', 8);
    let M6 = new Interval('M6', 9);
    let d7 = new Interval('d7', 9);
    let m7 = new Interval('m7', 10);
    let M7 = new Interval('M7', 11);

    const ionian = new Scale('Ionian', rt, M2, M3, P4, P5, M6, M7)
    const dorian = new Scale('Dorian', rt, M2, m3, P4, P5, M6, m7)
    const phrygian = new Scale('Phrygian', rt, m2, m3, P4, P5, m6, m7)
    const lydian = new Scale('Lydian', rt, M2, M3, sh4, P5, M6, M7)
    const mixolydian = new Scale('Mixolydian', rt, M2, M3, P4, P5, M6, m7)
    const aeolian = new Scale('Aeolian', rt, M2, m3, P4, P5, m6, m7)
    const locrian = new Scale('Locrian', rt, m2, m3, P4, d5, m6, m7)

    const scales = [ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian]

    //Scale Degree Colors
    const color0 = 'rgb(156, 156, 156)'//Default Grey
    const color1 = '#fc5549'// Red
    const color2 = '#9bd5fc'
    const color3 = '#6497f7'
    const color4 = '#54a3e5'
    const color5 = '#4cc6d3'
    const color6 = '#90f1fc'
    const color7 = 'rgb(248, 138, 34)'
    const colorArr = [color0, color1, color2, color3, color4, color5, color6, color7]
    
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
        colorKeyR: "color-key-root",
        colorKey2: "color-key-2nd",
        colorKey3: "color-key-3rd",
        colorKey4: "color-key-4th",
        colorKey5: "color-key-5th",
        colorKey6: "color-key-6th",
        colorKey7: "color-key-7th",
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
        return disp.textContent = el
    }

    //Clears Chord text display
    const textDispClear = (rt) => {
        rt.textContent = '';
    }

    //Returns Marker display, html, color to default each click
    const markerReset = () => {
        const mrk = document.querySelectorAll('.mrk');
        for (let i = 0; i < 78; i++) {
            mrk[i].style.display = "none";
            //mrk[i].innerHTML = "";
            colorDefault(mrk[i]);
            //mrk[i].style.backgroundColor = "#e01854";
        }
    } 

    //Defines New Root Array starting from curently displayed Root Note 
    const rootArr = (rt) => {
        rootIndex = key.indexOf(rt);
        rootArrAfter = key.slice(rootIndex)
        rootArrBefore = key.slice(0, rootIndex)
        fullRootArr = rootArrAfter.concat(rootArrBefore)
    }

    //Sets colors for note markers
    const colorDefault = (note) => {
        note.style.backgroundColor = "rgb(156, 156, 156)"//red
    }
    
    const color2nd = (note) => {
        let dropMenu = document.getElementsByTagName("a")
        
        note.style.backgroundColor = dropMenu[1].parentNode.parentNode.style.backgroundColor
    }

    const colorEx1 = (note) => {
        note.style.backgroundColor = "#4cc6d3"//teal
    }

    const displayRootSet = () => {
        displayRoot = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex].text
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
        }

        if (displayRoot === 'C') {
            for (let i = 0; i < 6; i++) {
                mrkDisp(noteC[i])
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
        const m2 = {
            node: document.querySelectorAll(`${DOMNotes[1]}`),
            name: 'm2',
        };
        
        const M2 = {
            node: document.querySelectorAll(`${DOMNotes[2]}`),
            name: 'M2'
        };

        const m3 = {
            node: document.querySelectorAll(`${DOMNotes[3]}`),
            name: 'm3'
        };
        const M3 = {
            node: document.querySelectorAll(`${DOMNotes[4]}`),
            name: 'M3'
        };
        
        const P4 = {
            node: document.querySelectorAll(`${DOMNotes[5]}`),
            name: 'P4'
        };
        
        const sh4 = {
            node: document.querySelectorAll(`${DOMNotes[6]}`),
            name: '#4'
        };
    
        const d5 = {
            node: document.querySelectorAll(`${DOMNotes[6]}`),
            name: 'd5'
        };
        
        const P5 = {
            node: document.querySelectorAll(`${DOMNotes[7]}`),
            name: 'P5'
        };
        const sh5 = {
            node: document.querySelectorAll(`${DOMNotes[8]}`),
            name: '#5'
        };
        
        const m6 = {
            node: document.querySelectorAll(`${DOMNotes[8]}`),
            name: 'm6'
        };
        
        const M6 = {
            node: document.querySelectorAll(`${DOMNotes[9]}`),
            name: 'M6'
        };

        const d7 = {
            node: document.querySelectorAll(`${DOMNotes[9]}`),
            name: 'd7'
        };
        
        const m7 = {
            node: document.querySelectorAll(`${DOMNotes[10]}`),
            name: 'm7'
        };
        
        let M7 = {
            node: document.querySelectorAll(`${DOMNotes[11]}`),
            name: 'M7'
        };

        const qualStyler2nd = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey2, el.name);
        }
        
        const qualStyler3rd = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey3, el.name);
        }

        const qualStyler4th = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey4, el.name);
        }


        const qualStyler5th = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey5, el.name);
        }

        const qualStyler6th = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey6, el.name);
        }

        const qualStyler7th = (el) => {
            let nodeArr = el.node 
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].style.display = "block"
            }
            colorKeyDisp(DOM.colorKey7, el.name);
        }

        const masterStyler = (sec, thi, fo, fi, six, sev) => {
            qualStyler2nd(sec)
            qualStyler3rd(thi);
            qualStyler4th(fo);
            qualStyler5th(fi);
            qualStyler6th(six);
            qualStyler7th(sev);
        }

        colorClear();
        
        if (displayQual === 'Ionian') {
            masterStyler(M2, M3, P4, P5, M6, M7);

        } else if (displayQual === 'Dorian') {
            masterStyler(M2, m3, P4, P5, M6, m7);

        } else if (displayQual === 'Phrygian') {
            masterStyler(m2, m3, P4, P5, m6, m7);

        } else if (displayQual === 'Lydian') {
            masterStyler(M2, M3, sh4, P5, M6, M7);

        } else if (displayQual === 'Mixolydian') {
            masterStyler(M2, M3, P4, P5, M6, m7);

        } else if (displayQual === 'Aeolian') {
            masterStyler(M2, m3, P4, P5, m6, m7);

        } else if (displayQual === 'Locrian') {
            masterStyler(m2, m3, P4, d5, m6, m7);
        }
    }

    //Displays Scale Degree Text inside diamond key
    const scaleDegDiamondDisp = (scale) => {
        diamondTextClear();
        for (let i = 0; i < scale.length; i++) {
            if (scaleMenuChoice === scale[i].name) {
                document.getElementById(DOM.colorKeyR).textContent = scale[i].rt.name
                document.getElementById(DOM.colorKey2).textContent = scale[i].second.name
                document.getElementById(DOM.colorKey3).textContent = scale[i].third.name
                document.getElementById(DOM.colorKey4).textContent = scale[i].fourth.name
                document.getElementById(DOM.colorKey5).textContent = scale[i].fifth.name
                document.getElementById(DOM.colorKey6).textContent = scale[i].sixth.name
                document.getElementById(DOM.colorKey7).textContent = scale[i].seventh.name
            }
        }
        
        //document.getElementById(node).textContent = tx;
    }
    
    // clears Color Key div text
    const diamondTextClear = () => {
        document.getElementById(DOM.colorKey2).textContent = "";
        document.getElementById(DOM.colorKey3).textContent = "";
        document.getElementById(DOM.colorKey4).textContent = "";
        document.getElementById(DOM.colorKey5).textContent = "";
        document.getElementById(DOM.colorKey6).textContent = "";
        document.getElementById(DOM.colorKey7).textContent = "";
    }

    const dispScaleRootMarker = (scale) => {
        markerReset();
        for (let i = 0; i < scales.length; i++) {
            if (scale[i].name === scaleMenuChoice) {
                let rt = document.querySelectorAll(DOMNotes[scale[i].rt.node]);

                for (let i =  0; i < rt.length; i++) {
                        rt[i].style.display = "block" 
                }
            }
        }
    }

    const dispScaleNoteMarkers = (scale) => { 
        markerReset();

        for (let i = 0; i < scales.length; i++) {
            if (scale[i].name === scaleMenuChoice) {
                let rt = document.querySelectorAll(DOMNotes[scale[i].rt.node]);
                let sec = document.querySelectorAll(DOMNotes[scale[i].second.node]);
                let thi = document.querySelectorAll(DOMNotes[scale[i].third.node]);
                let fo = document.querySelectorAll(DOMNotes[scale[i].fourth.node]);
                let fi = document.querySelectorAll(DOMNotes[scale[i].fifth.node]);
                let six = document.querySelectorAll(DOMNotes[scale[i].sixth.node]);
                let sev = document.querySelectorAll(DOMNotes[scale[i].seventh.node]);
                
                for (let i =  0; i < rt.length; i++) {
                    rt[i].style.display = "block" 
                    rt[i].style.backgroundColor = colorArr[1];
                }
                for (let i =  0; i < sec.length; i++) {
                    sec[i].style.display = "block" 
                }
                for (let i =  0; i < thi.length; i++) {
                    thi[i].style.display = "block"
                }
                for (let i =  0; i < fo.length; i++) {
                    fo[i].style.display = "block" 
                }
                for (let i =  0; i < fi.length; i++) {
                    fi[i].style.display = "block" 
                }
                for (let i =  0; i < six.length; i++) {
                    six[i].style.display = "block" 
                }
                for (let i =  0; i < sev.length; i++) {
                    sev[i].style.display = "block" 
                }
                    
            
            }
        }
    }

    return {
        getDomStrings: () => DOM,

        //Display Chord Text From Chord Menu Choices
        scaleRootTextDisp: () => {
            const dispRt = document.getElementById(DOM.rootDisp);

            textDispClear(dispRt);
            
            selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex];
    
            if (selectRt.value !== "sel") {
                display(selectRt.text, dispRt)
             }
        },

        dispScaleName: (scale) => {
            scaleMenuChoice = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex].textContent;
            
            for (let i = 0; i < scales.length; i++) {
                if (scale[i].name === scaleMenuChoice) {
                    displayQual = scale[i].name;
                    document.getElementById(DOM.qualDisp).textContent = scale[i].name
                }
            }
        },

        //Display Note Markers corresponding to Chord menu selections
        menuRootDisp: () => {
            markerReset();
            const select = document.querySelector(DOM.rtSel)
            displayRoot = select.options[select.selectedIndex].text;
        },

        menuQualDisp: () => {
            markerReset();
            const select = document.querySelector(DOM.qSel)
            displayQual = select.options[select.selectedIndex].text;
            //console.log(displayQual);
        },

        //Sets Menu options to default !NOT UPDATING REAL TIME, ONLY ON PAGE INIT!
        menuDispClear: () => {
            selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex].value = "sel";
            //[document.querySelector('.menu-style.rt').selectedIndex];
                
            selectQ = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex].value = "none";
            
            selectEx1 = document.querySelector(DOM.ex1Sel).options[document.querySelector(DOM.ex1Sel).selectedIndex].value = "none";

        },

        //Master Display Function 
        masterDisp: () => {
            displayRootSet();
            rootArr(displayRoot); 
            DOMNoteArr();
            //dispScaleRootMarker(scales);
            dispScaleNoteMarkers(scales);
            scaleDegDiamondDisp(scales);
        },

        //Sets Colors for Color Key
        diamondKeyColorChanger: () => {

            let drop = document.getElementsByTagName("a");
            
            //Change Diamond Color
            for (let i = 0; i < drop.length; i++) {
                drop[i].addEventListener('click', function() {
                    if (drop[i].id === "drop0") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[0];
                        
                        document.querySelector(DOM.a).style.backgroundColor = `${drop[i].parentNode.parentNode.style.backgroundColor}`

                        console.log(document.querySelector(DOM.a).style.backgroundColor)
                    } else if (drop[i].id === "drop1") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[1];
                        document.querySelector(DOM.a).style.backgroundColor = `${drop[i].parentNode.parentNode.style.backgroundColor}`

                        console.log(document.querySelector(DOM.a).style.backgroundColor)
                    } else if (drop[i].id === "drop2") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[2];
                    } else if (drop[i].id === "drop3") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[3];
                    } else if (drop[i].id === "drop4") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[4];
                    } else if (drop[i].id === "drop5") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[5];
                    } else if (drop[i].id === "drop6") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[6];
                    } else if (drop[i].id === "drop7") {
                        drop[i].parentNode.parentNode.style.backgroundColor = colorArr[7];
                    }
                });
                
            }
        },  

        getDOMNotes: () => DOMNotes,

        getScales: () => scales

    }

})();



///////VIEW/////////////
const view = ((mod, scaleCtrl) => {
    const scales = scaleCtrl.getScales();
    const DOM = scaleCtrl.getDomStrings();
    

    const eventListeners = () => {
        //Scale Random Button
        document.getElementById(DOM.btnRand).addEventListener('click', function() {
            scaleCtrl.getChordDisplay();
            scaleCtrl.mrkDisp();
            //ctrl.menuDispClear();
        });
        //Scale Generate Button
        document.getElementById(DOM.btnMenu).addEventListener('click', function() {
            scaleCtrl.scaleRootTextDisp();
            scaleCtrl.dispScaleName(scales);
            scaleCtrl.masterDisp();
        });

        scaleCtrl.diamondKeyColorChanger();
    }

    return {
        init: () => {
            console.log('app start')
            //ctrl.menuDispClear();
            eventListeners();
        }
    }
})(chordModel, scaleController);

view.init();


//    CHORD CONTROLLERCopy Paste from scale controller - Will be converted to    generate chords

// const chordController = (() => {
//     let displayRoot, displayQual, displayEx1, displayEx2;
//     let rootArrAfter, rootArrBefore, fullRootArr, rootIndex;
//     let DOMNotes = [];
//     let  selectRt, selectQ, selectEx1, selectEx2;
    
//     const DOM = {
//         rootDisp: "root-disp",
//         qualDisp: "qual-disp",
//         ex1Disp: "ex1-disp",
//         rtSel: '.select-style.rt',
//         qSel: '.select-style.q',
//         ex1Sel: '.select-style.ex1',
//         ex2Sel: '.select-style.ex2',
//         btnRand: "btn-rand-gen",
//         btnMenu: "btn-menu-gen",
//         btnColorDrop: '.btn-color-drop',
//         keyR: "key-r",
//         key3: "key-3",
//         key5: "key-5",
//         key7: "key-7",
//         keyEx1: "key-ex1",
//         keyEx2: "key-ex2",
//         colorKeyR: "color-key-root",
//         colorKey2: "color-key-2nd",
//         colorKey3: "color-key-3rd",
//         colorKey4: "color-key-4th",
//         colorKey5: "color-key-5th",
//         colorKey6: "color-key-6th",
//         colorKey7: "color-key-7th",
//         c: '.sc-note-c',
//         cSh: '.sc-note-c-sh',
//         d: '.sc-note-d',
//         dSh: '.sc-note-d-sh',
//         e: '.sc-note-e',
//         f: '.sc-note-f',
//         fSh: '.sc-note-f-sh',
//         g: '.sc-note-g',
//         gSh: '.sc-note-g-sh',
//         a: '.sc-note-a',
//         aSh: '.sc-note-a-sh',
//         b: '.sc-note-b',
//     }

    

//     //Sets DOM Nodes to display Chord Element
//     const display = (el, disp) => {
//         return disp.textContent = el}

//     //Clears Chord text display
//     const textDispClear = (rt, q, ex1, ex2) => {
//         rt.textContent = '';
//         q.textContent = '';
//         ex1.textContent = '';
//     }



//     //Returns Marker display, html, color to default each click
//     const markerReset = () => {
//         const mrk = document.querySelectorAll('.mrk');
//         for (let i = 0; i < 78; i++) {
//             mrk[i].style.display = "none";
//             mrk[i].innerHTML = "";
//             colorRoot(mrk[i]);
//             //mrk[i].style.backgroundColor = "#e01854";
//         }
//     } 

//     //Defines New Root Array starting from curently displayed Root Note 
//     const rootArr = (rt) => {
//         rootIndex = chordModel.getArr().keyArr.indexOf(rt);
//         rootArrAfter = chordModel.getArr().keyArr.slice(rootIndex)
//         rootArrBefore = chordModel.getArr().keyArr.slice(0, rootIndex)
//         fullRootArr = rootArrAfter.concat(rootArrBefore)
//     }

//     //Sets colors for note markers
//     const colorRoot = (note) => {
//         note.style.backgroundColor = "#fc5549"//red
//     }

//     const color3rd = (note) => {
//         note.style.backgroundColor = "#9bd5fc"//blue
//     }

//     const color5th = (note) => {
//         note.style.backgroundColor = "#6497f7"//blue
//     }

//     const color7th = (note) => {
//         note.style.backgroundColor = "#54a3e5"//blue
//     }

//     const colorEx1 = (note) => {
//         note.style.backgroundColor = "#4cc6d3"//teal
//     }

//     const colorEx2 = (note) => {
//         note.style.backgroundColor = "#90f1fc"//teal
//     }

    
    
//     //Reorders array of DOM Nodes starting with displayed Root Note
//     const DOMNoteArr = () => {

//         const noteArr = [DOM.a, DOM.aSh, DOM.b, DOM.c, DOM.cSh, DOM.d, DOM.dSh, DOM.e, DOM.f, DOM.fSh, DOM.g, DOM.gSh]

//         if (fullRootArr[0] === 'A') {
//             DOMNotes = noteArr
//         } else if (fullRootArr[0] === 'A#/Bb') {
//             before = noteArr.slice(1)
//             after = noteArr.slice(0, 1)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'B') {
//             before = noteArr.slice(2)
//             after = noteArr.slice(0, 2)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'C') {
//             before = noteArr.slice(3)
//             after = noteArr.slice(0, 3)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'C#/Db') {
//             before = noteArr.slice(4)
//             after = noteArr.slice(0, 4)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'D') {
//             before = noteArr.slice(5)
//             after = noteArr.slice(0, 5)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'D#/Eb') {
//             before = noteArr.slice(6)
//             after = noteArr.slice(0, 6)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'E') {
//             before = noteArr.slice(7)
//             after = noteArr.slice(0, 7)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'F') {
//             before = noteArr.slice(8)
//             after = noteArr.slice(0, 8)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'F#/Gb') {
//             before = noteArr.slice(9)
//             after = noteArr.slice(0, 9)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'G') {
//             before = noteArr.slice(10)
//             after = noteArr.slice(0, 10)
//             DOMNotes = before.concat(after)
//         } else if (fullRootArr[0] === 'G#/Ab') {
//             before = noteArr.slice(11)
//             after = noteArr.slice(0, 11)
//             DOMNotes = before.concat(after)
//         }
//     }

//     //Displays Root Markers
//     const rootMrkDisplay = () => {
//         markerReset();
        
//         let noteC = document.querySelectorAll(DOM.c);
//         let noteCSh = document.querySelectorAll(DOM.cSh);
//         let noteD = document.querySelectorAll(DOM.d);
//         let noteDSh = document.querySelectorAll(DOM.dSh);
//         let noteE = document.querySelectorAll(DOM.e);
//         let noteF = document.querySelectorAll(DOM.f);
//         let noteFSh = document.querySelectorAll(DOM.fSh);
//         let noteG = document.querySelectorAll(DOM.g);
//         let noteGSh = document.querySelectorAll(DOM.gSh);
//         let noteA = document.querySelectorAll(DOM.a);
//         let noteASh = document.querySelectorAll(DOM.aSh);
//         let noteB = document.querySelectorAll(DOM.b);
        
//         const mrkDisp = (nt) => {
            
//             nt.style.display = "block"
//             //nt.innerHTML = "R"
//         }

//         if (displayRoot === 'C') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteC[i])
//                 // noteC[i].style.display = "block";
//                 // noteC[i].innerHTML = "R";
//             }               
//         } else if (displayRoot === 'C#/Db') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteCSh[i])
//             }
//         } else if (displayRoot === 'D') {
//             for (let i = 0; i < 7; i++) {
//                 mrkDisp(noteD[i])
//             }                
//         } else if (displayRoot === 'D#/Eb') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteDSh[i])
//             }
//         } else if (displayRoot === 'E') {
//             for (let i = 0; i < 8; i++) {
//                 mrkDisp(noteE[i])
//             }
//         } else if (displayRoot === 'F') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteF[i])
//             }
//         } else if (displayRoot === 'F#/Gb') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteFSh[i])
//             }
//         } else if (displayRoot === 'G') {
//             for (let i = 0; i < 7; i++) {
//                 mrkDisp(noteG[i])
//             }
//         } else if (displayRoot === 'G#/Ab') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteGSh[i])
//             }
//         } else if (displayRoot === 'A') {
//             for (let i = 0; i < 7; i++) {
//                 mrkDisp(noteA[i])
//             }
//         } else if (displayRoot === 'A#/Bb') {
//             for (let i = 0; i < 6; i++) {
//                 mrkDisp(noteASh[i])
//             }
//         } else if (displayRoot === 'B') {
//             for (let i = 0; i < 7; i++) {
//                 mrkDisp(noteB[i])
//             }
//         }
//     }
    
//     //Displays Quality Markers
//     const noteMrkQualStyle = () => {
//         let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
//         let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
//         let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
//         let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
//         let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
//         let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
//         let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
//         let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
//         let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
//         let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
//         let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

//         const qualStyler3rd = (el, tx) => {
//             for (let i = 0; i < el.length; i++) {
//                 el[i].style.display = "block"
//                 color3rd(el[i]);
//                 //el[i].innerHTML = tx;
//             }
//             colorKeyDisp(DOM.key3, tx);
//         }

//         const qualStyler5th = (el, tx) => {
//             for (let i = 0; i < el.length; i++) {
//                 el[i].style.display = "block"
//                 color5th(el[i]);
//                 //el[i].innerHTML = tx;
//             }
//             colorKeyDisp(DOM.key5, tx);
//         }

//         const qualStyler7th = (el, tx) => {
//             for (let i = 0; i < el.length; i++) {
//                 el[i].style.display = "block"
//                 color7th(el[i]);
//                 //el[i].innerHTML = tx;
//             }
//             colorKeyDisp(DOM.key7, tx);
//         }

//         colorClear();
        
//         if (displayQual === 'M') {
//            qualStyler3rd(M3, 'M3');
//            qualStyler5th(P5, 'P5');
//         } else if (displayQual === 'M6') {
//             qualStyler3rd(M3, 'M3');
//             qualStyler5th(P5, 'P5');
//             qualStyler7th(M6, 'M6');
//         } else if (displayQual === 'M7') {
//             if(displayEx1 === '#5') {
//                 qualStyler3rd(M3, 'M3');
//                 qualStyler7th(M7, 'M7');
//             } else {
//                 qualStyler3rd(M3, 'M3');
//                 qualStyler5th(P5, 'P5');
//                 qualStyler7th(M7, 'M7');
//             }
            
//         } else if (displayQual === 'm') {
//             if (displayEx1 === '#5') {
//                 qualStyler3rd(m3, 'm3');
//             } else {
//                 qualStyler3rd(m3, 'm3');
//                 qualStyler5th(P5, 'P5');
//             }
            
//         } else if (displayQual === 'm6') {
//             qualStyler3rd(m3, 'm3');
//             qualStyler5th(P5, 'P5');
//             qualStyler7th(M6, 'M6');
//         } else if (displayQual === 'm7') {
//             if (displayEx1 === '#5') {
//                 qualStyler3rd(m3, 'm3');
//                 qualStyler7th(m7, 'm7');
//             } else {
//                 qualStyler3rd(m3, 'm3');
//                 qualStyler5th(P5, 'P5');
//                 qualStyler7th(m7, 'm7');
//             }
//         } else if (displayQual === 'min/M7') {
//             if (displayEx1 === '#5') {
//                 qualStyler3rd(m3, 'm3');
//                 qualStyler7th(M7, 'M7');
//             } else {
//                 qualStyler3rd(m3, 'm3');
//                 qualStyler5th(P5, 'P5');
//                 qualStyler7th(M7, 'M7');
//             }
            
//         } else if (displayQual === 'm7b5') {
//             qualStyler3rd(m3, 'm3');
//             qualStyler5th(d5, 'b5');
//             qualStyler7th(m7, 'm7');
            
//         } else if (displayQual === 'dim') {
//             qualStyler3rd(m3, 'm3');
//             qualStyler5th(d5, 'b5');
           
//         } else if (displayQual === 'dim7') {
//             qualStyler3rd(m3, 'm3');
//             qualStyler5th(d5, 'b5');
//             qualStyler7th(M6, 'd7');
           
//         } else if (displayQual === 'aug') {
//             qualStyler3rd(M3, 'M3');
//             qualStyler5th(m6, '#5');
//         } else if (displayQual === 'aug7') {
//             qualStyler3rd(M3, 'M3');
//             qualStyler5th(m6, '#5');
//             qualStyler7th(m7, 'm7');
//         } else if (displayQual === 'sus2') {
//             qualStyler3rd(M2, 'M2');
//             qualStyler5th(P5, 'P5');
//         } else if (displayQual === 'sus4') {
//             qualStyler3rd(P4, 'P4');
//             qualStyler5th(P5, 'P5');

//         } else if (displayQual === '7') {
//             qualStyler3rd(M3, 'M3');
//             qualStyler5th(P5, 'P5');
//             qualStyler7th(m7, 'm7');
//         }
//     }

//     //Displays Extension Markers
//     const noteMrkExStyle = (ex) => {
//         let m2 = document.querySelectorAll(`${DOMNotes[1]}`);
//         let M2 = document.querySelectorAll(`${DOMNotes[2]}`);
//         let m3 = document.querySelectorAll(`${DOMNotes[3]}`);
//         let M3 = document.querySelectorAll(`${DOMNotes[4]}`);
//         let P4 = document.querySelectorAll(`${DOMNotes[5]}`);
//         let d5 = document.querySelectorAll(`${DOMNotes[6]}`);
//         let P5 = document.querySelectorAll(`${DOMNotes[7]}`);
//         let m6 = document.querySelectorAll(`${DOMNotes[8]}`);
//         let M6 = document.querySelectorAll(`${DOMNotes[9]}`);
//         let m7 = document.querySelectorAll(`${DOMNotes[10]}`);
//         let M7 = document.querySelectorAll(`${DOMNotes[11]}`);

//         const exStyler = (el, tx) => {
//             for (let i = 0; i < el.length; i++) {
//                 el[i].style.display = "block"
//                 colorEx1(el[i]);
//                 //el[i].innerHTML = tx;
//             }
//             colorKeyDisp(DOM.keyEx1, tx)
//         }

//         if (ex === 'b9') {
//             exStyler(m2, 'b9');
//         } else if (ex === '9') {
//             exStyler(M2, '9');
//         } else if (ex === '#9') {
//             exStyler(m3, '#9');
//         } else if (ex === '11') {
//             exStyler(P4, '11');
//         } else if (ex === '#11') {
//             exStyler(d5, '#11');
//         } else if (ex === '#5') {
//             exStyler(m6, '#5');
//         } else if (ex === 'b13') {
//             exStyler(m6, 'b13');
//         } else if (ex === '13') {
//             exStyler(M6, '13');
//         }
//     }

//     //Displays text inside color key markers
//     const colorKeyDisp = (node, tx) => {
//         document.getElementById(node).textContent = tx;
//     }
    
//     // clears Color Key div text
//     const colorClear = () => {
//         document.getElementById(DOM.key3).textContent = "";
//         document.getElementById(DOM.key5).textContent = "";
//         document.getElementById(DOM.key7).textContent = "";
//         document.getElementById(DOM.keyEx1).textContent = "";
//         document.getElementById(DOM.keyEx2).textContent = "";
//     }

//     return {
//         getDomStrings: () => DOM,

//         //Display Chord Text from random generator
//         getChordDisplay: () => {
//             displayRoot = display(chordModel.genChord().key, document.getElementById(DOM.rootDisp))
//             displayQual = display(chordModel.genChord().qual, document.getElementById(DOM.qualDisp))
//             displayEx1 = display(chordModel.genEx().ex1, document.getElementById(DOM.ex1Disp))
//             //console.log(displayEx1);
//         },

//         //Display Chord Text From Chord Menu Choices
//         menuChordTextDisp: () => {
//             const dispRt = document.getElementById(DOM.rootDisp);
//             const dispQ = document.getElementById(DOM.qualDisp);
//             const dispEx1 = document.getElementById(DOM.ex1Disp);
//             const dispEx2 = document.getElementById(DOM.ex2Disp);

//             textDispClear(dispRt, dispQ, dispEx1, dispEx2);
            
//             selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex];
            
//             selectQ = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex];
            
//             selectEx1 = document.querySelector(DOM.ex1Sel).options[document.querySelector(DOM.ex1Sel).selectedIndex];
    
//             selectEx2 = document.querySelector(DOM.ex2Sel).options[document.querySelector(DOM.ex2Sel).selectedIndex];
    
//             if(selectRt.value !== "sel") {
//                 display(selectRt.text, dispRt)
//             }
            
//             if (selectQ.text !== 'none') {
//                 display(selectQ.text, dispQ)
//             }
            
//             if (selectEx1.text !== 'none') {
//                 display(selectEx1.text, dispEx1)
//             }
//             if (selectEx2.text !== 'none') {
//                 display(selectEx2.text, dispEx2)
//             }


//         },
        

//         //Display Note Markers corresponding to Chord menu selections
//         menuRootDisp: () => {
//             markerReset();
            
//             const select = document.querySelector(DOM.rtSel)
//             displayRoot = select.options[select.selectedIndex].text;
            
            
//             //console.log(displayRoot);
//         },

//         menuQualDisp: () => {
//             markerReset();
//             const select = document.querySelector(DOM.qSel)
//             displayQual = select.options[select.selectedIndex].text;
//             //console.log(displayQual);
//         },

//         menuExDisp: () => {
//             markerReset();
//             const select1 = document.querySelector(DOM.ex1Sel)
//             const select2 = document.querySelector(DOM.ex2Sel)
//             displayEx1 = select1.options[select1.selectedIndex].text;
//             displayEx2 = select1.options[select1.selectedIndex].text;
//             //console.log(displayEx);
//         },

//         //Sets Menu options to default !NOT UPDATING REAL TIME, ONLY ON PAGE INIT!
//         menuDispClear: () => {
//             selectRt = document.querySelector(DOM.rtSel).options[document.querySelector(DOM.rtSel).selectedIndex].value = "sel";
//             //[document.querySelector('.menu-style.rt').selectedIndex];
                
//             selectQ = document.querySelector(DOM.qSel).options[document.querySelector(DOM.qSel).selectedIndex].value = "none";
            
//             selectEx1 = document.querySelector(DOM.ex1Sel).options[document.querySelector(DOM.ex1Sel).selectedIndex].value = "none";

//         },

//         //Display note markers
//         mrkDisp: () => {
//             rootArr(displayRoot); 
//             DOMNoteArr();
//             rootMrkDisplay();
//             noteMrkQualStyle();  
//             noteMrkExStyle(displayEx1); 
//             //noteMrkExStyle(displayEx2); 
//         },

//         //Sets Colors for Color Key
//         colorKeyChanger: () => {
//             const color0 = 'rgb(156, 156, 156)'
//             const color1 = '#fc5549'
//             const color2 = '#9bd5fc'
//             const color3 = '#6497f7'
//             const color4 = '#54a3e5'
//             const color5 = '#4cc6d3'
//             const color6 = '#90f1fc'
//             const color7 = 'rgb(248, 138, 34)'
//             const colorArr = [color0, color1, color2, color3, color4, color5, color6, color7]
//             let drop = document.getElementsByTagName("a");
            
//             for (let i = 0; i < drop.length; i++) {
//                 drop[i].addEventListener('click', function() {
//                     if (drop[i].id === "drop0") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[0];
//                     }
//                     if (drop[i].id === "drop1") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[1];
//                     }
//                     if (drop[i].id === "drop2") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[2];
//                     }
//                     if (drop[i].id === "drop3") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[3];
//                     }
//                     if (drop[i].id === "drop4") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[4];
//                     }
//                     if (drop[i].id === "drop5") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[5];
//                     }
//                     if (drop[i].id === "drop6") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[6];
//                     }
//                     if (drop[i].id === "drop7") {
//                         drop[i].parentNode.parentNode.style.backgroundColor = colorArr[7];
//                     }
//                 });
//             }
//         },

            
//     }

// })();