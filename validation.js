class Validator {
    libRules = '';
    rules = {};
    errors = {};

    constructor() {
        this.libRules = new Rules();
    }

    setRules(rules) {
        this.rules = rules;
        // return this;
    }

    run(data) {
        this.errors = {};
        for (const field in data) {
            if (field in this.rules) {
                this.callRules(this.rules[field], data[field], field);
            }
        }
        return !(Object.keys(this.errors).length > 0);
    }

    callRules(rules, data, field) {
        const matchs = rules.split('|');
        matchs.forEach(match => {
            if (typeof this.libRules[match] !== 'function') {
                throw `${match} no es una regla`;
            }
            if (!this.libRules[match](data)) {
                this.errors[field] = {
                    ...this.errors[field],
                    [match]: this.messages(match)
                }
            }
        });
    }

    messages(key) {
        const messages = {
            required: 'Campo requerido',
            is_valid_age: 'El campo debe tener una edad valida'
        }
        return messages[key];
    }

    getErrors() {
        return this.errors;
    }

}

class Rules {
    required(data) {
        data = data.toString();
        return data.trim() !== '';
    }
    is_valid_age(data) {
        return /^[1-9]?[0-9]{1}$|^100$/.test(data);
    }
}

// setRules(rules)
// run(data)  true / false
// getErrors 

// const validator = new Validator();
// validator.setRules({
//     name: 'required',
//     age: 'required|is_valid_age'
// });

// if (!validator.run({
//         name: 'sdfg',
//         age: 101
//     })) {
//     console.log(validator.getErrors());
// }