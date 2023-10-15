import Ajv from "ajv";
import addFormats from "ajv-formats";
import { playlistTrackSchema } from "./playlistTrack.schema";

const ajv = new Ajv({ allErrors: true});

// Add support for error messages
require("ajv-errors")(ajv, {singleError: false});

// Add support for validating URIs
addFormats(ajv)

// Export the validator
export const playlistValidator = ajv.compile(playlistTrackSchema);
