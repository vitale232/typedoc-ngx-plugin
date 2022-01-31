import {
  Application,
  Context,
  Converter,
  LogLevel,
  ReferenceType,
  Reflection,
  ReflectionKind,
} from 'typedoc';

export function ngxPluginSubscribe(app: Readonly<Application>) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_: Context, rfl: Reflection) => {
      if (setOutputDecoratorsAsEvent(rfl))
        app.logger.log(
          `typedoc-ngx-plugin detected an Angular @Output! Marked the reflection \`${
            rfl.parent?.name ? rfl.parent.name + '.' : ''
          }${rfl.name}\` as an event.`,
          LogLevel.Info
        );
    }
  );
}

function setOutputDecoratorsAsEvent(reflection: Reflection) {
  const outputDecorator = reflection?.decorators?.find(
    (d) =>
      d.name === 'Output' &&
      (d.type as ReferenceType | undefined)?.package === '@angular/core'
  );
  if (outputDecorator == null) {
    return false;
  } else {
    reflection.kind = ReflectionKind.Event;
    return true;
  }
}
