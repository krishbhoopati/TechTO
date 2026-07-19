import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MapChatBar } from "@/components/chat/MapChatBar";
import {
  EV_CHARGING_DEMO_BASE_ZOOM,
  EV_CHARGING_DEMO_CENTER,
  EV_CHARGING_DEMO_PROMPT,
} from "@/lib/planner/ev-charging-demo";
import { useMapStore } from "@/store/useMapStore";

function installMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("MapChatBar EV-charging demo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    installMatchMedia(false);
    useMapStore.getState().reset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    useMapStore.getState().reset();
  });

  function installChatFetch() {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        thread: { threadId: "test-thread", messages: [] },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  async function submitDemo(onCityPlanQuestion = vi.fn()) {
    render(
      <MapChatBar
        enablePlanningRun={false}
        enableCityPlanRun
        onCityPlanQuestion={onCityPlanQuestion}
      />,
    );
    await act(async () => Promise.resolve());

    fireEvent.change(screen.getByTestId("city-copilot-input"), {
      target: { value: EV_CHARGING_DEMO_PROMPT },
    });
    fireEvent.click(screen.getByTestId("city-copilot-send"));
    return onCityPlanQuestion;
  }

  it("arrives at 10 seconds, reveals the answer, and bypasses the planner", async () => {
    const fetchMock = installChatFetch();
    const onCityPlanQuestion = await submitDemo();

    expect(
      screen.getByTestId("city-copilot-send").querySelector(".lucide-loader-circle"),
    ).not.toBeNull();
    expect(screen.queryByText("Recommendation", { exact: true })).not.toBeInTheDocument();
    expect(useMapStore.getState().cameraTarget).toBeNull();

    act(() => vi.advanceTimersByTime(8_799));
    expect(useMapStore.getState().cameraTarget).toBeNull();

    act(() => vi.advanceTimersByTime(1));
    expect(useMapStore.getState().cameraTarget).toEqual({
      center: EV_CHARGING_DEMO_CENTER,
      zoom: EV_CHARGING_DEMO_BASE_ZOOM,
      durationMs: 1_200,
      focusOffsetMode: "expanded-chat",
    });
    expect(useMapStore.getState().candidateMarkers).toHaveLength(1);
    expect(useMapStore.getState().agentOverlays).toHaveLength(0);
    expect(useMapStore.getState().highlightedNeighbourhoodIds).toHaveLength(0);

    act(() => vi.advanceTimersByTime(1_199));
    expect(screen.queryByText("Recommendation", { exact: true })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText("Recommendation", { exact: true })).toBeInTheDocument();
    expect(screen.getByText(/600 registered users, 4,000 annual sessions/)).toBeInTheDocument();
    expect(
      screen.getByTestId("city-copilot-send").querySelector(".lucide-loader-circle"),
    ).toBeNull();
    expect(onCityPlanQuestion).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/chat");
  });

  it("jumps and reveals together at 10 seconds when reduced motion is enabled", async () => {
    installMatchMedia(true);
    installChatFetch();
    await submitDemo();
    expect(window.matchMedia).toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(9_999));
    expect(useMapStore.getState().cameraTarget).toBeNull();
    expect(screen.queryByText("Recommendation", { exact: true })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(useMapStore.getState().cameraTarget).toEqual({
      center: EV_CHARGING_DEMO_CENTER,
      zoom: EV_CHARGING_DEMO_BASE_ZOOM,
      durationMs: 0,
      focusOffsetMode: "expanded-chat",
    });
    expect(screen.getByText("Recommendation", { exact: true })).toBeInTheDocument();
  });

  it("cancels the pending demo when the chat unmounts", async () => {
    installChatFetch();
    const { unmount } = render(
      <MapChatBar
        enablePlanningRun={false}
        enableCityPlanRun
        onCityPlanQuestion={vi.fn()}
      />,
    );
    await act(async () => Promise.resolve());
    fireEvent.change(screen.getByTestId("city-copilot-input"), {
      target: { value: EV_CHARGING_DEMO_PROMPT },
    });
    fireEvent.click(screen.getByTestId("city-copilot-send"));

    unmount();
    act(() => vi.advanceTimersByTime(10_000));

    expect(useMapStore.getState().cameraTarget).toBeNull();
    expect(useMapStore.getState().candidateMarkers).toHaveLength(0);
  });
});
