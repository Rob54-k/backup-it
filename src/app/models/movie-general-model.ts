export class MovieGeneralModel {
  public favorite: boolean = false;

  static xerox(json: any, template: any): any {
    if (!json) return;

    let tmpObject = template;

    for (let property in tmpObject) {
      if (json.hasOwnProperty(property)) {
        tmpObject[property] = json[property];
      }
    }
    return tmpObject;
  }
}
