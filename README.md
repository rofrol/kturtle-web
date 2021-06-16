# kturtle-web

Result:

![](/screenshot.png)

A simple language interpreter similar to [KTurtle](https://docs.kde.org/stable5/en/kturtle/kturtle/commands.html). The goal of the interpreter is to take in a set of commands, and execute them on a graphical canvas such as shown below (screenshot from KTurtle).

![image](https://user-images.githubusercontent.com/28787/121644842-d48dd400-ca93-11eb-88d2-f7ec1280b345.png)

The turtle initially starts in the middle of the canvas with the pen state set to width 1 and color to black. When the turtle moves and the pen is down, the turtle leaves a trail behind it. Each command is either moving the turtle, changing the pen state or pen color.

Subset of commands to implement:

- [x] `forward` - go forward and draw a line along the path if the pen is down
- [x] `backward` - go backward and draw a line along the path if the pen is down
- [x] `turnleft <D>` - turn left by D degrees
- [x] `turnright <D>` - turn right by D degrees
- [x] `direction <D>` - set turtle in a specific direction by D being degrees and 0 degrees being up
- [x] `center` - move turtle to the center **without** drawing anything
- [x] `go <X>, <Y>` - move turtle to position X, Y **without** drawing anything
- [x] `gox <X>` - move turtle on the X axis to position X **without** drawing anything
- [x] `goy <Y>`- move turtle on the Y axis to position Y **without** drawing anything
- [x] `penup` - set pen state to up (off)
- [x] `pendown` - set pen state to down (on)
- [x] `penwidth <W>` - set pen width to W (in pixels)
- [x] `pencolor <R>,<G>,<B>` - set pen color to R, G, B

### Requirements

- [x] For technologies use Angular 12 and TypeScript - implement it as a web application.
- [x] Use an existing UI framework and make it look good and usable to the best of your abilities.
- [ ] (Optional but nice to have) Allow journey of the turtle to be animated with configurable speed
- [ ] (Optional but nice to have) Syntax highlighting
- [x] Use RxJS to react to changes in the code and on every change (with debounce) restart rendering
- [ ] Whenever requirements are not clear - use your best judgement to make the application cool

## Angular and this project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
