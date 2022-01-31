# typedoc-ngx-plugin

A small [TypeDoc](https://typedoc.org/) plugin that is intended to create more useful documentation for [Angular](https://angular.io) Libraries. Using this plugin will detect the Angular `@Output` decorator in your TypeDoc reflections, and change the reflection kind from a Class property to an Event. This eliminates the need to use the JSDoc `@event` notation in your comments, and will correctly classify undocumented Angular events.

## TODO

This plugin is very much a work in progress. The intention is to also use the Angular `@Input` decorator in TypeDoc's reflections. The Inputs will be categorized similar to Events, such that they will present as a separate category on your Component or Directive class's TypeDoc output.
