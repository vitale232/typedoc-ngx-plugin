# typedoc-ngx-plugin

A small [TypeDoc](https://typedoc.org/) plugin that is intended to create more useful documentation for [Angular](https://angular.io) Libraries.

Using this plugin will detect the Angular `@Output` decorator in your TypeDoc reflections, and change the reflection kind from a Class property to an Event. This eliminates the need to use the JSDoc `@event` notation in your comments, and will correctly classify undocumented Angular events.

While we work through the TODO list, some temporary functionality is provided for Angular Inputs. This package auto-adds the unofficial "@input" JSDoc comment tags to Angular Component and Directive class properties that are decorated with the `@Input` decorator. This has the effect of informing doc readers which properties are accepted as inputs, but it does not have the desired effect of grouping the Input class properties separately from other class props.

## TODO

This plugin is very much a work in progress. The intention is to also use the Angular `@Input` decorator in TypeDoc's reflections. The Inputs will be categorized similar to Events, such that they will present as a separate category on your Component or Directive class's TypeDoc output.
