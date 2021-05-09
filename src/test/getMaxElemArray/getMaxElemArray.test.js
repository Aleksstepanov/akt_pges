/* eslint-disable no-undef */
import getMaxElemArray from "./getMaxElemArray.js";

test("max elem [32]", () => {
  expect(getMaxElemArray([32])).toBe(32);
});

test("max elem [32, 33, 2, 1]", () => {
  expect(getMaxElemArray([32, 33, 2, 1])).toBe(33);
});
