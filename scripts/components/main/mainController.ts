  export class MainController implements ng.IComponentController {

    private input: number;
    private x: number;

    constructor(private scope: ng.IScope) {}

    public $onInit(): void {
        this.x = this.input;
    }
}

MainController.$inject = ['$scope'];
