import { JSONSchemaType } from "ajv";
import { PlaylistTrack } from "../models/playlistTrack.model";


export const playlistTrackSchema: JSONSchemaType<PlaylistTrack> = {
    //   $schema: "http://json-schema.org/draft/2020-12/schema#",
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
        },
        type: {
            type: "string",
            enum: ["video", "image"],
        },
        url: {
            type: "string",
            format: "uri",
        },
        duration: {
            type: "integer",
            minimum: 1,
        },
    },
    required: ["name", "type", "url", "duration"],
    additionalProperties: false,
    errorMessage: {
        properties: {
            name: "Name must be a string with at least 1 character",
            type: "Type must be either 'video' or 'image'",
            url: "URL must be a valid URI",
            duration: "Duration must be a positive integer",
        },
        required: {
            name: "Name is required",
            type: "Type is required",
            url: "URL is required",
            duration: "Duration is required",
        },
        _: "Invalid request body",
    }
};

