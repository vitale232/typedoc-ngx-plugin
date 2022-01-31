import { Application } from 'typedoc';
import { ngxPluginSubscribe } from './event-handler';

/** Called by TypeDoc when loading this plugin */
export function load(app: Application) {
  ngxPluginSubscribe(app);
}
