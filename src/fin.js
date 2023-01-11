import { INVALID_MIN, INVALID_PARAM, NOT_COTAIND_VALID_ELEMENTS, REQUIRES_PARAMS, SHOULD_ITEM_NUMBERS, STRING_WITH_INVALID_FORMAT } from "../constants/constants";

// <------ VARIABLES ------> 
// length == N
// levelFinn == P
// arrayViallains = A

export const Fight = () => {
    let {length,levelFinn,levelJake} = getValues('4 2 1');
    let arrayViallains = getArrayLevelVillains(length,'2 1 11 15');
}

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
    return (min <= val <= min);
}

export const validAllNumbers = (args) => {
    if(!Array.isArray(args)) {
        throw new Error(INVALID_PARAM);
    } 
    if(!args.every(item => Number(item))) {
        throw new Error(SHOULD_ITEM_NUMBERS);
    }
}

