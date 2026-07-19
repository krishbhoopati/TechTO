import { describe, expect, it } from "vitest";

import { buildChatReportHtml } from "@/lib/export/chat-report";
import {
  buildEvChargingDemoMapActions,
  EV_CHARGING_DEMO_BASE_ZOOM,
  EV_CHARGING_DEMO_CENTER,
  EV_CHARGING_DEMO_PROMPT,
  EV_CHARGING_DEMO_RESPONSE,
  matchesEvChargingDemoPrompt,
} from "@/lib/planner/ev-charging-demo";
import { parseMapActions } from "@/lib/techto/map-actions";

describe("hardcoded EV-charging demo", () => {
  it("matches only the exact trimmed prompt", () => {
    expect(matchesEvChargingDemoPrompt(EV_CHARGING_DEMO_PROMPT)).toBe(true);
    expect(matchesEvChargingDemoPrompt(`  ${EV_CHARGING_DEMO_PROMPT}\n`)).toBe(true);
    expect(
      matchesEvChargingDemoPrompt(
        "Where should shared EV charging hubs be placed to unlock the most EV adoption among apartment residents?",
      ),
    ).toBe(false);
    expect(matchesEvChargingDemoPrompt(EV_CHARGING_DEMO_PROMPT.toLowerCase())).toBe(false);
    expect(matchesEvChargingDemoPrompt(`${EV_CHARGING_DEMO_PROMPT}!`)).toBe(false);
  });

  it("builds a Toronto-safe, one-marker camera action batch", () => {
    const actions = buildEvChargingDemoMapActions(1_200);
    const parsed = parseMapActions(actions);

    expect(parsed.ok).toBe(true);
    expect(actions.filter((action) => action.type === "show_candidate_markers")).toEqual([
      {
        type: "show_candidate_markers",
        candidates: [
          {
            candidateId: "ev-hub-north-st-james-town",
            coordinates: EV_CHARGING_DEMO_CENTER,
            rank: 1,
            label: "Shared EV hub · North St. James Town (074)",
          },
        ],
      },
    ]);
    expect(actions.filter((action) => action.type === "annotate")).toHaveLength(0);
    expect(actions).toContainEqual({
      type: "fly_to_center",
      center: EV_CHARGING_DEMO_CENTER,
      zoom: EV_CHARGING_DEMO_BASE_ZOOM,
      durationMs: 1_200,
    });
  });

  it("renders the complete supplied answer in the PDF report", () => {
    const html = buildChatReportHtml({
      title: "TechTO planning answer",
      messages: [
        { role: "user", content: EV_CHARGING_DEMO_PROMPT },
        { role: "assistant", content: EV_CHARGING_DEMO_RESPONSE },
      ],
      exportedAt: new Date("2026-07-19T12:00:00-04:00"),
    });

    expect(html).toContain("The map is centred on the recommended site");
    expect(html).toContain("North St. James Town, neighbourhood 074");
    expect(html).toContain("<table>");
    expect(html).toContain("4,000 annual sessions");
    expect(html).toContain("equitable EV infrastructure across Toronto");
    expect(html).toContain("Decision-support limitation");
  });
});
