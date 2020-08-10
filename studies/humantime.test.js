const humanTime = require('../src/humantime');

const constantNow = new Date('2020-08-01T09:00:00');

describe('Actual time', () => {
  it('should return correct times for real time', () => {
    const now = Date.now();
    const aMinuteAgo = now - 56 * 1000;
    const anHourAgo = now - 61 * 60 * 1000;
    const yesterday = now - 85000 * 1000;

    expect(humanTime(aMinuteAgo)).toBe('Just now');
    expect(humanTime(anHourAgo)).toBe('An hour ago');
    expect(humanTime(yesterday)).toBe('Yesterday');
  });
});

describe('Constant Short times', () => {
  it('should return just now for constant now', () => {
    const time1 = new Date('2020-08-01T08:58:31');
    const time2 = new Date('2020-08-01T08:59:00');
    const time3 = new Date('2020-08-01T08:59:30');

    expect(humanTime(time1, constantNow)).toBe('Just now');
    expect(humanTime(time2, constantNow)).toBe('Just now');
    expect(humanTime(time3, constantNow)).toBe('Just now');
  });

  it('should return A few minutes ago', () => {
    const time1 = new Date('2020-08-01T08:57:30');
    const time2 = new Date('2020-08-01T08:57:00');
    const time3 = new Date('2020-08-01T08:56:31');

    expect(humanTime(time1, constantNow)).toBe('A few minutes ago');
    expect(humanTime(time2, constantNow)).toBe('A few minutes ago');
    expect(humanTime(time3, constantNow)).toBe('A few minutes ago');
  });

  it('should return N minutes ago', () => {
    const time1 = new Date('2020-08-01T07:54:00');
    const time2 = new Date('2020-08-01T07:53:00');
    const time3 = new Date('2020-08-01T07:52:00');

    expect(humanTime(time1, constantNow)).toBe('66 minutes ago');
    expect(humanTime(time2, constantNow)).toBe('67 minutes ago');
    expect(humanTime(time3, constantNow)).toBe('68 minutes ago');
  });

  it('should return half an hour ago', () => {
    const time1 = new Date('2020-08-01T08:28:31');
    const time2 = new Date('2020-08-01T08:30:00');
    const time3 = new Date('2020-08-01T08:31:29');

    expect(humanTime(time1, constantNow)).toBe('Half an hour ago');
    expect(humanTime(time2, constantNow)).toBe('Half an hour ago');
    expect(humanTime(time3, constantNow)).toBe('Half an hour ago');
  });

  it('should return an hour ago', () => {
    const time1 = new Date('2020-08-01T08:01:29');
    const time2 = new Date('2020-08-01T08:00:00');
    const time3 = new Date('2020-08-01T07:55:01');

    expect(humanTime(time1, constantNow)).toBe('An hour ago');
    expect(humanTime(time2, constantNow)).toBe('An hour ago');
    expect(humanTime(time3, constantNow)).toBe('An hour ago');
  });
});

describe('Constant Rest of today', () => {
  it('should return this morning', () => {
    const afternoon = new Date('2020-08-01T15:00:00');

    const time1 = new Date('2020-08-01T08:00:00');
    const time2 = new Date('2020-08-01T11:00:00');
    const time3 = new Date('2020-08-01T11:59:59');

    expect(humanTime(time1, afternoon)).toBe('This morning');
    expect(humanTime(time2, afternoon)).toBe('This morning');
    expect(humanTime(time3, afternoon)).toBe('This morning');
  });

  it('should return N hours ago', () => {
    const time1 = new Date('2020-08-01T07:00:00');
    const time2 = new Date('2020-08-01T06:00:00');
    const time3 = new Date('2020-08-01T00:00:01');

    expect(humanTime(time1, constantNow)).toBe('2 hours ago');
    expect(humanTime(time2, constantNow)).toBe('3 hours ago');
    expect(humanTime(time3, constantNow)).toBe('9 hours ago');
  });
});

describe('Constant Yesterday', () => {
  it('should return yesterday', () => {
    const time1 = new Date('2020-07-31T00:00:01');
    const time2 = new Date('2020-07-31T12:00:00');
    const time3 = new Date('2020-07-31T23:59:59');

    expect(humanTime(time1, constantNow)).toBe('Yesterday');
    expect(humanTime(time2, constantNow)).toBe('Yesterday');
    expect(humanTime(time3, constantNow)).toBe('Yesterday');
  });

  it('should NOT return yesterday', () => {
    const time1 = new Date('2020-07-30T23:59:59');

    expect(humanTime(time1, constantNow)).not.toBe('Yesterday');
  });
});

describe('Constant Last few weeks', () => {
  it('should return a week ago', () => {
    const time1 = new Date('2020-07-25T23:59:59');
    const time2 = new Date('2020-07-25T12:00:00');
    const time3 = new Date('2020-07-24T00:00:01');

    expect(humanTime(time1, constantNow)).toBe('A week ago');
    expect(humanTime(time2, constantNow)).toBe('A week ago');
    expect(humanTime(time3, constantNow)).toBe('A week ago');
  });

  it('should return a fortnight ago', () => {
    const time1 = new Date('2020-07-18T23:59:59');
    const time2 = new Date('2020-07-18T12:00:00');
    const time3 = new Date('2020-07-17T00:00:01');

    expect(humanTime(time1, constantNow)).toBe('A fortnight ago');
    expect(humanTime(time2, constantNow)).toBe('A fortnight ago');
    expect(humanTime(time3, constantNow)).toBe('A fortnight ago');
  });

  it('should return N days ago', () => {
    const time1 = new Date('2020-07-15T12:00:00');
    const time2 = new Date('2020-07-09T12:00:00');
    const time3 = new Date('2020-07-05T12:00:00');

    expect(humanTime(time1, constantNow)).toBe('17 days ago');
    expect(humanTime(time2, constantNow)).toBe('23 days ago');
    expect(humanTime(time3, constantNow)).toBe('27 days ago');
  });

  it('should return N weeks ago', () => {
    const time1 = new Date('2020-07-02T12:00:00');
    const time2 = new Date('2020-06-20T12:00:00');
    const time3 = new Date('2020-06-14T12:00:00');

    expect(humanTime(time1, constantNow)).toBe('5 weeks ago');
    expect(humanTime(time2, constantNow)).toBe('6 weeks ago');
    expect(humanTime(time3, constantNow)).toBe('7 weeks ago');
  });
});

describe('Constant Longer ago', () => {
  it('should return N months ago', () => {
    const time1 = new Date('2020-06-01T08:58:31');
    const time2 = new Date('2020-02-12T08:59:00');
    const time3 = new Date('2019-04-12T08:59:30');

    expect(humanTime(time1, constantNow)).toBe('2 months ago');
    expect(humanTime(time2, constantNow)).toBe('6 months ago');
    expect(humanTime(time3, constantNow)).toBe('16 months ago');
  });

  it('should return N years ago', () => {
    const time1 = new Date('2018-12-01T08:58:31');
    const time2 = new Date('2018-01-12T08:59:00');
    const time3 = new Date('2017-01-12T08:59:30');

    expect(humanTime(time1, constantNow)).toBe('2 years ago');
    expect(humanTime(time2, constantNow)).toBe('3 years ago');
    expect(humanTime(time3, constantNow)).toBe('4 years ago');
  });
});
