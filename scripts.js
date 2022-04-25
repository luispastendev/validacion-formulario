const form = {
    validator: {},
    data: {
        name: {
            value: '',
            error: '',
            class: ''
        },
        age: {
            value: '',
            error: '',
            class: ''
        }
    },
    init() {
        for (const item in this.data) {
            this.$watch('data.' + item + '.value', value => {
                this.liveValidate({[item]: value});
            });    
        }

        this.validator = new Validator();
        this.validator.setRules({
            name: 'required',
            age: 'required|is_valid_age'
        });
    },
    liveValidate(data) {

        if (!this.validator.run(data)) {
            this.setErrors();
        } else {
            this.cleanErrors(data);
        }
    },
    setErrors() {
        const errors = this.validator.getErrors();
            
        for (const field in this.data) {
            if (field in errors) {
                let messages = ``
                for (const rule in errors[field]) {
                    messages += errors[field][rule] + `<br>`;
                }
                this.data[field].error = messages;
                this.setClass(field);
            } 
        }
    },
    cleanErrors(data) {
        for (const field in data) {
            this.data[field].error = '';
            this.setClass(field);
        }
    },
    getValues () {
        output = {};
        for (const val in this.data) {
            output[val] = this.data[val].value
        }
        return output;
    },
    setClass(key) {
        this.data[key].class = this.data[key].error.length > 0 ? 'is-invalid' : 'is-valid';
    },
    submit() {
        if (!this.validator.run(this.getValues())) {
            this.setErrors();
        } else {
            console.info('submitting...')
        }

    },
}

