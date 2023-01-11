import { describe, it, expect } from 'vitest';
import { INVALID_MIN, LIMIT_VALUES, NOT_COTAIND_VALID_ELEMENTS, REQUIRES_PARAMS, SHOULD_ITEM_NUMBERS, STRING_WITH_INVALID_FORMAT } from '../constants/constants';
import { Fight, getArrayLevelVillains, getValues, validAllNumbers, validLevelsHeroes, validLevesVillains, validLimit } from '../src/fin';

describe('Finn', () => {

    it('should valid parameters',() => {
        try {
            expect(() => getValues()).toThrow();
        } catch (error) {
            expect(REQUIRES_PARAMS).toEqual(error.message);  
        }
        
    });

    it('should valid first input', () => {
        try {
            getValues('10 10 10 10');
        } catch (error) {
            expect(STRING_WITH_INVALID_FORMAT).toEqual(error.message);  
        }
    })

    it('should valid firts input all numbers', () => {
        try {
            getValues('10 10 :D');
        } catch (error) {
            expect(SHOULD_ITEM_NUMBERS).toEqual(error.message);  
        }
    });

    it('should valid return of getValues',() => {
        let {length,levelFinn,levelJake} = getValues('4 2 1');
        expect(length).toBe(4);
        expect(levelFinn).toBe(2);
        expect(levelJake).toBe(1);
    }) 

    it('should valid string of levels villains', () => {
        try {
            getArrayLevelVillains(4,'10 20 20');
        } catch (error) {
            expect(NOT_COTAIND_VALID_ELEMENTS).toEqual(error.message);  
        }
    })

    it('should valid return getArrayLevelVillains', () => {
        let levelVillains = getArrayLevelVillains(3,'10 20 30');
        let [firstVillain,,thirdVillain] = levelVillains;
        expect(levelVillains.length).toBe(3);
        expect(firstVillain).toBe(10);
        expect(thirdVillain).toBe(30);
    })

    it('should valid validations',() => {
        try {
            Fight('4 200000000000000000000000 1','2 1 11 15');
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);
        }
    });

    it('should valid validations case 2',() => {
        try {
            Fight('4 1 200000000000000000000000','2 1 11 15');
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);
        }
    });

    it('should valid validations case 3',() => {
        try {
            Fight('200000 1 1','2 1 11 15');
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);
        }
    });

    it('should valid validations case 4',() => {
        try {
            Fight('4 1 1','20000000000000 1 11 15');
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);
        }
    });

    it('should valid validLevelsHeroes',() => {
        try {
            validLevelsHeroes([-10,1]);
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);   
        }
    });

    it('should valid validLevesVillains',() => {
        try {
            validLevesVillains([-20000000000000,1]);
        } catch (error) {
            expect(LIMIT_VALUES).toBe(error.message);   
        }
    });


    /* TODO: PRUEBA FINAL */
    it('should valid Fight',() => {
        let result = Fight('4 2 1','2 1 11 15');
        expect(result).toBe('SI');
        result = Fight('1 2 1','19');
        expect(result).toBe('NO');
    });



    describe('Functions', () => {

        it('should valid input in validLimit',() => {
            try {
                validLimit({min:1,max:':D',val:'10'})
            } catch (error) {
                expect(SHOULD_ITEM_NUMBERS).toEqual(error.message);   
            }
        });

        it('should valid input in validLimit case 2',() => {
            try {
                validLimit({min:1,max:2,val:':('})
            } catch (error) {
                expect(SHOULD_ITEM_NUMBERS).toEqual(error.message);   
            }
        });

        it('should valid input in validLimit case 2',() => {
            try {
                validLimit({min:null,max:2,val:':('})
            } catch (error) {
                expect(REQUIRES_PARAMS).toEqual(error.message);   
            }
        });
    
        it('should valid min', ()  => {
            try {
                validLimit({min:13,max:10,val:12})
            } catch (error) {
                expect(INVALID_MIN).toEqual(error.message);   
            }
        });

        it('should valid validAllNumbers', () => {
            try {
                validAllNumbers(['1',10,':D'])
            } catch (error) {
                expect(SHOULD_ITEM_NUMBERS).toEqual(error.message);   
            }
            
        });

    });

});