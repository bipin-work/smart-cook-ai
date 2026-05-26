import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  // Replace the real setTimeout/clearTimeout with controllable fakes.
  // Without this, the test would have to actually wait 500ms for setTimeout
  // to fire — slow and flaky. With fake timers, we control the clock.
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    // Even before any time passes, the hook is initialized with the input
    // value (look at line 4 of useDebounce.ts).
    expect(result.current).toBe("hello");
  });

  it("does not update before the delay elapses", () => {
    // `rerender` lets you simulate a parent re-rendering with new props —
    // which is how this hook is actually used: the input value changes,
    // and we want the debounced output to lag behind.
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    // `act` is required whenever we trigger React state updates from the
    // test (here, by advancing timers which fires the setTimeout callback,
    // which calls setDebounceValue). RTL warns loudly if you forget.
    act(() => {
      jest.advanceTimersByTime(499);
    });

    // Still the old value — we're 1ms short of the delay.
    expect(result.current).toBe("first");
  });

  it("updates to the latest value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("second");
  });

  it("resets the timer if the value changes again before the delay", () => {
    // This is the actual *purpose* of debouncing — fast successive changes
    // should collapse into one update. If a refactor accidentally breaks
    // this (say, missing the cleanup function), this test catches it.
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });
    act(() => jest.advanceTimersByTime(300));

    rerender({ value: "third" });
    act(() => jest.advanceTimersByTime(300));

    // Total elapsed: 600ms. But the timer reset at 300ms, so we're really
    // only 300ms into the latest debounce — should still be "first".
    expect(result.current).toBe("first");

    act(() => jest.advanceTimersByTime(200));
    // Now 500ms since the last change — should flip to "third".
    expect(result.current).toBe("third");
  });
});
