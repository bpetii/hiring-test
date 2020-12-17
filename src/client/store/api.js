import { createAction } from "@reduxjs/toolkit";

/**
 * @type import('@reduxjs/toolkit').ActionCreatorWithPreparedPayload
 */
export const apiCallBegan = createAction("api/CallBegan");

/**
 * @type import('@reduxjs/toolkit').ActionCreatorWithPreparedPayload
 */
export const apiCallSuccess = createAction("api/CallSuccess");

/**
 * @type import('@reduxjs/toolkit').ActionCreatorWithPreparedPayload
 */
export const apiCallFailed = createAction("api/CallFailed");
