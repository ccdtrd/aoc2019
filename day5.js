const _ = require('lodash');


const int_code = (code, input) => {
    const set = code.split(',').map(x => Number.parseInt(x));

    const get = (pos, mode) => {
        if (mode === 0) {
            return set[pos];
        }
        return pos;
    }

    const execute_instruction = (instruction) => {
        const { pos } = instruction;

        const opt_mode = set.slice(pos)[0].toString().padStart(5, '0');
        const opt = Number.parseInt(opt_mode.substring(opt_mode.length - 2));
        let modes = opt_mode.substring(0, opt_mode.length - 2).split('').map(x => Number.parseInt(x));

        if (opt === 1 || opt === 2) {
            const [, in1, in2, out] = set.slice(pos);
            const opp = opt === 1 ? _.add : _.multiply;

            const one = get(in1, modes[2]);
            const two = get(in2, modes[1]);

            set[out] = opp(one, two);
            return { pos: pos + 4 };

        } else if (opt === 3) {
            const [, in1] = set.slice(pos);
            set[in1] = input;

            return { pos: pos + 2 };

        } else if (opt === 4) {
            const [, in1] = set.slice(pos);

            modes[2] === 0 ? console.log(set[in1]) : console.log(in1);
            return { pos: pos + 2 };
        } else if (opt === 5) {
            const [, in1, in2] = set.slice(pos);

            const one = get(in1, modes[2]);
            const two = get(in2, modes[1]);

            if (one !== 0) {
                return { pos: two };
            }
            return { pos: pos + 3 };

        } else if (opt === 6) {
            const [, in1, in2] = set.slice(pos);

            const one = get(in1, modes[2]);
            const two = get(in2, modes[1]);

            if (one === 0) {
                return { pos: two };
            }
            return { pos: pos + 3 };

        } else if (opt === 7 || opt === 8) {
            const [, in1, in2, out] = set.slice(pos);
            const opp = opt === 7 ? _.lt : _.eq;

            const one = get(in1, modes[2]);
            const two = get(in2, modes[1]);

            set[out] = opp(one, two) ? 1 : 0;
            return { pos: pos + 4 };
        }

        return { halt: true };
    }

    let register = { pos: 0 };
    do {
        register = { ...register, ...execute_instruction(register) };
    } while (!_.has(register, 'halt'));

}

const input = '3,225,1,225,6,6,1100,1,238,225,104,0,1101,37,61,225,101,34,121,224,1001,224,-49,224,4,224,102,8,223,223,1001,224,6,224,1,224,223,223,1101,67,29,225,1,14,65,224,101,-124,224,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1102,63,20,225,1102,27,15,225,1102,18,79,224,101,-1422,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1102,20,44,225,1001,69,5,224,101,-32,224,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,15,10,225,1101,6,70,225,102,86,40,224,101,-2494,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1102,25,15,225,1101,40,67,224,1001,224,-107,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,2,126,95,224,101,-1400,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1002,151,84,224,101,-2100,224,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,677,224,1002,223,2,223,1006,224,329,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,344,101,1,223,223,8,677,677,224,1002,223,2,223,1006,224,359,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,374,101,1,223,223,7,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,404,1001,223,1,223,7,677,677,224,1002,223,2,223,1006,224,419,1001,223,1,223,1008,677,226,224,1002,223,2,223,1005,224,434,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,449,1001,223,1,223,1008,226,226,224,1002,223,2,223,1006,224,464,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,479,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,494,1001,223,1,223,107,226,226,224,1002,223,2,223,1006,224,509,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,524,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,539,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,554,1001,223,1,223,1107,226,226,224,102,2,223,223,1005,224,569,101,1,223,223,1108,677,226,224,1002,223,2,223,1006,224,584,1001,223,1,223,1007,677,226,224,1002,223,2,223,1005,224,599,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,614,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,629,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,659,1001,223,1,223,108,677,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226';
// const input = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
// const input = '3,9,7,9,10,9,4,9,99,-1,8';

const part1_compute = int_code(input, 5);
// console.log(part1_compute);
// 13933662
