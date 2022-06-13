import React, { useState } from 'react';
import './css/Editor.css';


//calculates position for adding tags into innerHtml
const calculatePosition = ( start, end, text ) => {
    //calculation for end of the tag
    let isTag = false;
    let wantedPosition = 0;
    let splited = text.split("");
    let i;
    for (i in splited) {
        if (wantedPosition === end) {
            break;
        }
        if (splited[i] === '<') {
            isTag = true;
            continue;
        }
        if (splited[i] === '>') {
            isTag = false;
            continue;
        }
        if (isTag == false) {
            wantedPosition++;
        }
    }

    let endPosition = i;
    if (splited.length === ++i) {
        endPosition = i;
    }



    wantedPosition = 0;
    let j 
    for (j in splited) {
        if (wantedPosition === start) {
            break;
        }
        if (splited[j] === '<') {
            isTag = true;
            continue;
        }
        if (splited[j] === '>') {
            isTag = false;
            continue;
        }
        if (isTag === false) {
            wantedPosition++;
        }
    }
    //for starting tag to be inside
    while (splited[j] == '<') {
        while (splited[++j] != '>') { }
        j++;
    }


    let startPosition = j;
    return { startPosition, endPosition };
}

export default calculatePosition