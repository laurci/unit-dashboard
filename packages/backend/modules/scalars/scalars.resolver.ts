import {DateTimeResolver} from "graphql-scalars";
import { getScalarsModule } from "./typedef";

const {Scalar} = getScalarsModule();

Scalar.DateTime(DateTimeResolver);