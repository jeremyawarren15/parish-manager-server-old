const { assignFieldsToHours } = require("../../resolvers/hourResolverHelper");

describe("Does nothing if array is empty", () => {
  const dbHours = [];

  const modifiedHours = assignFieldsToHours(dbHours);

  test("Returns empty string if input is empty", () =>
    expect(modifiedHours).toStrictEqual([]));
  test("Array has length of 0 if input is an empty array", () =>
    expect(modifiedHours.length).toBe(0));
});

describe("Assigning fields to one hour", () => {
  const hour = { id: 1, day: 1, time: 4 };
  const dbHours = [hour];

  const modifiedHours = assignFieldsToHours(dbHours);
  const testHour = modifiedHours[0];

  test("Hour should not be null", () => expect(testHour).toBeDefined());
  test("dayString should not be null", () =>
    expect(testHour.dayString).toBeDefined());
  test("dayString should be Monday", () =>
    expect(testHour.dayString).toStrictEqual("Monday"));
  test("timeString should not be null", () =>
    expect(testHour.timeString).toBeDefined());
  test("timeString should be 4PM", () =>
    expect(testHour.timeString).toStrictEqual("4-5AM"));
  test("committedAdorers should not be null", () =>
    expect(testHour.committedAdorers).toBeDefined());
  test("Length of array should not change", () =>
    expect(modifiedHours.length).toBe(1));
  test("Committed Adorers is always 0 (will change)", () =>
    expect(testHour.committedAdorers).toBe(0));
});

// Maybe should have some tests for multiple hours,
// but I don't think that's necessary
