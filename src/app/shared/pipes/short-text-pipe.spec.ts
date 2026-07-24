import { beforeEach, describe, expect, it } from 'vitest';

import { ShortTextPipe } from './short-text-pipe';

describe('ShortTextPipe', () => {
  let pipe: ShortTextPipe;

  beforeEach(() => {
    pipe = new ShortTextPipe();
  });

  it('should return the text unchanged if within the limit', () => {
    expect(pipe.transform('Hello world', 20)).toBe('Hello world');
  });

  it('should truncate and append "..." if text exceeds the limit', () => {
    expect(pipe.transform('Hello world', 5)).toBe('Hello...');
  });

  it('should use 200 as the default limit when none is provided', () => {
    const value = 'a'.repeat(201);

    expect(pipe.transform(value)).toBe('a'.repeat(200) + '...');
  });

  it('should treat text exactly at the limit as "within the limit"', () => {
    expect(pipe.transform('Hello', 5)).toBe('Hello');
  });
}); 