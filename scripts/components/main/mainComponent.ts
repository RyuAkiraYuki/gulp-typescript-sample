import { MainController } from "./mainController";

export function MainComponent(): ng.IComponentOptions {
    return {
      template: '_main.html',
      controller: MainController,
      bindings: {
          input: '<'
      }
    };
}