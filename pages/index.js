'use client';

import React, { useState, useEffect } from 'react';

function App() {

const [workDuration, setWorkDuration] = useState(25);

const [breakDuration, setBreakDuration] = useState(5);

const [flag, setFlag] = useState(false);

const [worksecond, setWorkSecond] = useState(1500);

const [breaksecond, setBreakSecond] = useState(300);

const [type, setType] = useState('work');

const [resetFlag, setResetFalg] = useState(true);

useEffect(() => {

if (flag && type === 'work') {

if (worksecond > 0) {

const timer = setTimeout(() => setWorkSecond(worksecond - 1), 1000);

return () => clearTimeout(timer);

}

if (worksecond === 0) {

alert('work duration is over');

setType('break');

setWorkSecond(workDuration * 60);

}

}

if (flag && type === 'break') {

if (breaksecond > 0) {

const timer = setTimeout(() => setBreakSecond(breaksecond - 1), 1000);

return () => clearTimeout(timer);

}

if (breaksecond === 0) {

alert('break duration is over');

setType('work');

setBreakSecond(breakDuration * 60);

}

}

}, [flag, type, worksecond, breaksecond, workDuration, breakDuration]);

const reset = () => {

setResetFalg(true);

setFlag(false);

setType('work');

setWorkDuration(25);

setBreakDuration(5);

setBreakSecond(300);

setWorkSecond(1500);

};

const convertToStandardFormat = (sec) => {

let m = parseInt(sec / 60).toString();

let s = parseInt(sec % 60).toString();

if (m.length === 1) m = '0' + m;

if (s.length === 1) s = '0' + s;

return m + ':' + s;

};

const validateData = (data) => {

if (!isNaN(data) && parseInt(data) >= 0) {

return parseInt(data);

} else return '';

};

const setDuration = (e) => {

e.preventDefault();

if (breakDuration + workDuration <= 0) {

reset();

return;

}

setResetFalg(false);

setType('work');

setWorkSecond(wo


