import { MainController } from "./mainController";

export function MainComponent(): ng.IComponentOptions {
    return {
      templateUrl: '_main.html',
      controller: MainController,
      bindings: {
          input: '<'
      }
    };
}