import { INVALID_MIN, INVALID_PARAM, LIMIT_VALUES, LOSER, NOT_COTAIND_VALID_ELEMENTS, REGEX_NUMBER, REQUIRES_PARAMS, SHOULD_ITEM_NUMBERS, STRING_WITH_INVALID_FORMAT, WINNER } from "../constants/constants";

// <------ VARIABLES ------> 
// length == N
// levelFinn == P
// arrayViallains = A

export const Fight = (valueOne,valueTwo) => {
    let {length,levelFinn,levelJake} = getValues(valueOne);
    validLengthArray(length);
    validLevelsHeroes(levelFinn,levelJake);
    let arrayViallains = getArrayLevelVillains(length,valueTwo);
    validLevesVillains(arrayViallains);
    return meetingFight({levelFinn,levelJake,arrayViallains}) ? WINNER : LOSER;
}

export const validLengthArray = (length) => {
    let max = Math.pow(10,5);
    if(!validLimit({min:1,max,val:length})) {
        throw new Error(LIMIT_VALUES)
    }
}

export const validLevelsHeroes = (levelFinn,levelJake) => {
    if(![levelFinn,levelJake].every( level => validLimit({min:0,max:Math.pow(10,5),val:level}))) {
        throw new Error(LIMIT_VALUES)
    }
}

export const validLevesVillains = (arrayViallains) => {
    if(!arrayViallains.every( villain => validLimit({min:Math.pow(-10,9),max:Math.pow(10,9),val:villain}) )) {
        throw new Error(LIMIT_VALUES)
    }
}

export const meetingFight = ({levelFinn,levelJake,arrayViallains}) => {
    let useJake = true;
    arrayViallains.sort((a,b) => a-b );
    let defeatedVillains = [];
    for (let index = 0; index < arrayViallains.length; index++) {
        const villain = arrayViallains[index];
        if(levelFinn > villain) {
            levelFinn = levelFinn + villain;
            defeatedVillains.push(villain);
            continue;
        } else if(villain > levelFinn && useJake) {
            useJake = false;
            if(plusPowers(levelFinn,levelJake) > villain) {
                levelFinn = levelFinn + villain
                defeatedVillains.push(villain);
                continue;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    return defeatedVillains.length === arrayViallains.length;
}

export const plusPowers = (levelFinn,levelJake) => ((levelFinn + levelJake) * 2)

export const getValues = (rowOne) => {
    if(typeof rowOne !== 'string') {
        throw new Error(REQUIRES_PARAMS);
    };
    rowOne = rowOne.trim();
    let rowOneParse = rowOne.split(' ');
    if(rowOneParse.length !== 3) {
        throw new Error(STRING_WITH_INVALID_FORMAT);
    }
    validAllNumbers(rowOneParse);
    rowOneParse = rowOneParse.map(item => Number(item));
    let [length,levelFinn,levelJake] = rowOneParse;
    return {length,levelFinn,levelJake}
}

export const getArrayLevelVillains = (length,villains) => {
    villains = villains.trim();
    let villainsParse = villains.split(' ');
    if(villainsParse.length !== length) {
        throw new Error(NOT_COTAIND_VALID_ELEMENTS)
    }
    validAllNumbers(villainsParse);
    return villainsParse.map(item => Number(item));
}

export const validLimit = ({min,max,val}) => {
    [min,max,val].forEach(item => {
        if(item === null || item === undefined) {
            throw new Error(REQUIRES_PARAMS);
        }
    })
    validAllNumbers([min,max,val]);
    if(min>max) {
        throw new Error(INVALID_MIN);
    }
    return val >= min && val <= max;
}


const isNumber = (number) => {
    return REGEX_NUMBER.test(number);
};

export const validAllNumbers = (args) => {
    if(!Array.isArray(args)) {
        throw new Error(INVALID_PARAM);
    } 
    if(!args.every(item => isNumber(item))) {
        throw new Error(SHOULD_ITEM_NUMBERS);
    }
}

