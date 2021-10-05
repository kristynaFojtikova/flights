

import { findConnection } from '../src/findConnection';
import SampleFlightsData from '../testData/SampleFlightsData';

describe('Find connection', () => {
  test('Find only direct flights', () => {
    const output = [["JFK", "ATL", 600]];
    expect(
      findConnection("JFK", "ATL", SampleFlightsData, 1),
    ).toEqual(output);
  });
});

describe('Find connection', () => {
  test('Find the cheapest', () => {
    const output = [
      [ 'HKG', 'JFK', 45 ],
      [ 'JFK', 'SFO', 300 ],
      [ 'SFO', 'ORD', 87 ],
      [ 'ORD', 'ATL', 23 ],
      [ 'ATL', 'LAX', 12 ]
    ];
    expect(
      findConnection("HKG", "LAX", SampleFlightsData, 5),
    ).toEqual(output);
  });
});

describe('Find connection', () => {
  test('Find the cheapest with 3 connections', () => {
   const output = [
     ['HKG', 'JFK', 45],
     ['JFK', 'SFO', 300],
     ['SFO', 'LAX', 84]
    ];
    expect(
      findConnection("HKG", "LAX", SampleFlightsData, 3),
    ).toEqual(output);
  });
});

describe('Fail', () => {
  test('No connection found', () => {
   const output = null;
    expect(
      findConnection("HKG", "PRG", SampleFlightsData, 3),
    ).toEqual(output);
  });
});


