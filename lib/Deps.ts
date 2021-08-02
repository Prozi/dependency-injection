/**
 * Created by Tom on 02/07/2015.
 */

export import Context = require("./Context");
export import Dependency = require("./annotations/Dependency");
import Inject = require("./annotations/Inject");
export const Injection = Inject.Injection;
export const NamedInjection = Inject.NamedInjection;
export const AutoInject = Inject.AutoInject;
export const DirectLoad = Inject.DirectLoad;
export import Injectable = require("./annotations/InjectableAnnotation");
export import Config = require("./Config");
