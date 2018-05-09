# CashTransfer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


=================== C O R D O V A : ==============================================================

1. ng build --target=production --environment=prod --output-path cordova-android/www/

2. in file cash-transfer\cordova-android\www\index.html:
    2.1 replace   <base href="/">  by  <base href="./">
    2.2 uncomment lines:
            <script type="text/javascript" charset="utf-8" src="cordova.js"></script>
            <script>
              document.addEventListener("deviceready", function(){
                navigator.splashscreen.hide();
              },true);
            </script>
    
3. in folder cash-transfer\cordova-android\www  replace image links:
    from ../../../../../assets/img/ => ... /assets/img/
    BY assets/img/
    

4. from the folder "cordova-android":      cordova run android


cordova run android

cordova run browser

cordova emulate android

cordova build

cordova build android --release
