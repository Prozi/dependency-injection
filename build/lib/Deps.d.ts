/**
 * Created by Tom on 02/07/2015.
 */
export import Context = require("./Context");
export import Dependency = require("./annotations/Dependency");
import Inject = require("./annotations/Inject");
export declare const Injection: typeof Inject.Injection;
export declare const NamedInjection: typeof Inject.NamedInjection;
export declare const AutoInject: typeof Inject.AutoInject;
export declare const DirectLoad: typeof Inject.DirectLoad;
export import Injectable = require("./annotations/InjectableAnnotation");
export import Config = require("./Config");
