import { MainComponent } from "./components/main/mainComponent";
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";

var mdl: ng.IModule = angular.module('SampleApp', ['ui.router', 'ngMaterial']);

mdl.component('mainComponent', MainComponent());

mdl.config(['$compileProvider', '$mdThemingProvider', (compileProvider: ng.ICompileProvider, themingProvider: angular.material.IThemingProvider) => {
	compileProvider.debugInfoEnabled(false);
	compileProvider.commentDirectivesEnabled(false);
	compileProvider.cssClassDirectivesEnabled(false);

	themingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	themingProvider.theme('dark-orange').backgroundPalette('orange').dark();
	themingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
	themingProvider.theme('dark-blue').backgroundPalette('blue').dark();
}]);

mdl.config([
	'$stateProvider', '$locationProvider',
	(stateProvider: angular.ui.IStateProvider, locationProvider: ng.ILocationProvider) => {

		locationProvider.html5Mode(true);

		stateProvider.state({
			name: 'main',
			url: '/:num?',
			component: 'mainComponent',
			resolve: {
				input: ['$stateParams', (stateParams: ng.ui.IStateParamsService) => {
					return stateParams['num'] || 1;
				}]
			}
		});
	}
]);