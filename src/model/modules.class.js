import Module from "./module.class.js";
import { getDBModules } from "../services/api.js";

export default class Modules {
  constructor() {
    this.data = [];
  }

  async populate() {
    const data = await getDBModules();
    this.data = data.map(
      (item) =>
        new Module(item.code, item.cliteral, item.vliteral, item.courseId)
    );
  }

  toString() {
    let text = `Modules: ${this.data.length}`;
    this.data.forEach((item) => {
      text += `\n${item.toString()}`;
    });

    return text;
  }

  getModuleByCode(moduleCode) {
    const module = this.data.find((item) => item.code === moduleCode);
    if (!module) {
      throw new Error(`No existe el módulo con code ${moduleCode}`);
    }
    return module;
  }
}
