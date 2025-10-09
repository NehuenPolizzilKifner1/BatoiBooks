import Module from './module.class.js';
export default class Modules {
    constructor (){
        this.data = [];
    }

    populate(modulesArray){
        this.data = modulesArray.map(m => new Module(m.code, m.cliteral, m.vliteral, m.courseId));
    }

    getModuleById(code){
        const module = this.data.find(m => m.code === code);
        if (!module) throw new Error(`Module with code "${code}" not found`);
        return module;
    }

    toString(){
        return this.data.map(m => m.toString()).join('\n');
    }
}

