/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */
/* prettier-ignore */

import "./baeta-directives/directives.baeta";

import "./client/client.mutation";

import "./client/client.query";

import "./log/log.mutation";

import "./log/log.query";

import "./message/message.mutation";

import "./message/message.query";

import "./scalars/scalars.resolver";

import "./baeta-directives/directives.baeta";

import {getBaetaDirectivesModule} from "./baeta-directives/typedef";

import {getClientModule} from "./client/typedef";

import {getLogModule} from "./log/typedef";

import {getMessageModule} from "./message/typedef";

import {getScalarsModule} from "./scalars/typedef";

export const modules = [getBaetaDirectivesModule(), getClientModule(), getLogModule(), getMessageModule(), getScalarsModule()];