import type { MapAction } from "@/lib/techto/map-actions";

export const EV_CHARGING_DEMO_PROMPT =
  "Where should shared EV-charging hubs be placed to unlock the most EV adoption among apartment residents?";

export const EV_CHARGING_DEMO_DELAY_MS = 10_000;
export const EV_CHARGING_DEMO_FLIGHT_MS = 1_200;
export const EV_CHARGING_DEMO_FLIGHT_START_MS =
  EV_CHARGING_DEMO_DELAY_MS - EV_CHARGING_DEMO_FLIGHT_MS;
export const EV_CHARGING_DEMO_CENTER: [number, number] = [-79.375, 43.67];

/**
 * The normal single-marker focus uses base zoom 14, then localized 3D adds
 * 2.25. This demo stays 0.75 zoom level farther back without changing any
 * other map interaction.
 */
export const EV_CHARGING_DEMO_BASE_ZOOM = 13.25;

export const EV_CHARGING_DEMO_RESPONSE = `The map is centred on the recommended site with a single marker and annotation.

## Recommendation

Implement Toronto’s first shared neighbourhood EV-charging hub in **North St. James Town, neighbourhood 074**, near the centre of the residential tower cluster at approximately **-79.375, 43.670**.

The pilot should launch with **six Level 2 charging ports**, with the site pre-wired and designed to expand to **10–12 Level 2 ports and two DC fast-charging ports** as demand grows.

North St. James Town is one of the strongest locations in Toronto for this type of investment. Its combination of extremely high residential density, limited access to private charging, moderate household income and a compact walkable service area creates a clear opportunity for shared charging infrastructure to generate strong utilization and meaningful community impact.

The next neighbourhoods considered for expansion should be **Taylor-Massey/Crescent Town, neighbourhood 061**, and **Yonge-Doris, neighbourhood 151**.

## Why North St. James Town

### Toronto’s highest-density residential cluster

North St. James Town has approximately **18,535 residents within only 0.42 km²**, producing a population density of roughly **44,063 residents per km²**.

This creates a large potential user base concentrated within a short walking distance of the proposed hub. A single site could serve thousands of nearby residents without requiring drivers to travel outside their neighbourhood.

### A major need for shared charging

The neighbourhood is dominated by high-rise rental and apartment buildings where many residents do not have access to a private garage, dedicated parking outlet or personal EV charger.

A shared neighbourhood hub directly addresses this barrier by giving residents a reliable and affordable place to charge close to home. This makes EV ownership significantly more practical for households that would otherwise be excluded from the transition to electric vehicles.

### Strong affordability and equity impact

The neighbourhood’s median household income is approximately **$59,200**. Residents are less likely to be able to personally fund private charger installations, building electrical upgrades or expensive condominium retrofits.

A publicly accessible charging hub creates a lower-cost alternative and ensures that EV adoption is not limited to residents of newer or higher-income condominium developments.

### Compact and walkable service area

The entire neighbourhood fits within a few hundred metres of a centrally located hub. The proposed location is also approximately **40 metres from surface transit** and **280 metres from rapid transit**, making it well connected to the surrounding community.

This allows the charging hub to operate as part of a broader neighbourhood mobility network rather than as an isolated parking facility.

### Stronger community impact than downtown alternatives

Other high-density neighbourhoods may already benefit from commercial parking garages, newer residential buildings or greater access to private charging installations.

North St. James Town offers a stronger opportunity for the city to create additional charging access where it can make the greatest difference to residents.

## Sustainability and community value

The proposed hub would:

* Remove one of the largest barriers to EV adoption for apartment residents.
* Encourage overnight and off-peak charging.
* Reduce reliance on higher-cost public fast charging.
* Allow each charging port to support multiple households.
* Improve access to lower-cost electric transportation.
* Support Toronto’s emissions-reduction and transportation-electrification goals.
* Establish a repeatable model for other high-density neighbourhoods.

Smart-charging technology should be included from launch to prioritize overnight charging, balance electricity demand across ports and reduce pressure on the grid.

## Key neighbourhood indicators

| Indicator                   |               North St. James Town |
| --------------------------- | ---------------------------------: |
| Neighbourhood number        |                                074 |
| Population                  |                             18,535 |
| Population density          | Approximately 44,063 residents/km² |
| Median household income     |                            $59,200 |
| Area                        |                           0.42 km² |
| Distance to rapid transit   |                            0.28 km |
| Distance to surface transit |                            0.04 km |

These indicators demonstrate that North St. James Town has the population concentration, accessibility and charging-access need required to support a successful shared charging hub.

## Recommended pilot design

The initial deployment should include:

* **Six networked Level 2 charging ports**
* **7–11 kW of charging capacity per port**
* Dynamic load management across all ports
* Resident-focused pricing with lower overnight rates
* At least one accessible charging space
* Electrical capacity for expansion to at least 12 Level 2 ports
* Infrastructure prepared for two future DC fast-charging ports
* Real-time charger availability through a mobile or web platform
* Integrated payment, reservation and usage-monitoring systems

The site should also include lighting, visible signage, security coverage, snow-clearing access and designated waiting spaces.

## Strong first-year KPIs

### Charger utilization

* Reach **25% average port occupancy within six months**.
* Reach **35–40% average port occupancy within 12 months**.
* Reach **50% overnight occupancy between 7:00 p.m. and 7:00 a.m.**
* Maintain charger uptime above **98%**.
* Achieve peak-period occupancy above **70% during high-demand evenings**.

At 35% average occupancy, six ports would produce approximately **50 occupied charging hours per day**, demonstrating strong and consistent community demand.

### Resident adoption

* Register at least **600 local user accounts during the first year**.
* Reach **250–300 active monthly users by month 12**.
* Generate at least **4,000 charging sessions during the first year**.
* Achieve a returning-user rate above **60%**.
* Ensure at least **65% of users live within North St. James Town or an adjacent neighbourhood**.
* Convert at least **100 residents without home charging into regular hub users**.

### Electricity delivered

* Deliver approximately **100–140 MWh of electricity during the first full year**.
* Ensure at least **70% of electricity is delivered during off-peak periods**.
* Maintain average charging sessions between **4 and 6 hours**.
* Keep failed or interrupted sessions below **1.5% of total sessions**.

Delivering 120 MWh annually could support approximately **600,000–750,000 kilometres of electric driving**, depending on vehicle efficiency.

### EV adoption impact

* Support a **15–20% increase in local EV registrations within two years**.
* Enable approximately **75–125 additional EV purchases or leases within the surrounding area**.
* Have at least **30% of surveyed users report that the hub influenced their decision to purchase or retain an EV**.
* Have at least **60% of surveyed non-EV residents report that nearby charging makes their next vehicle more likely to be electric**.

### Environmental impact

* Support the avoidance of approximately **100–160 tonnes of transportation-related carbon emissions annually** once the site reaches stable utilization.
* Increase the share of charging completed during off-peak hours to at least **70%**.
* Deliver at least **800 MWh of charging energy over the first seven years**.
* Support more than **four million kilometres of electric driving over the first seven years**.

### Customer experience

* Maintain an average satisfaction rating above **4.5 out of 5**.
* Keep median wait times below **10 minutes**.
* Keep sessions involving waits longer than 20 minutes below **5%**.
* Maintain fewer than **two complaints per 1,000 charging sessions**.
* Resolve at least **95% of operational issues within one business day**.
* Achieve a recommendation score above **80% among active users**.

## Financial and operational value

The hub should be designed to achieve:

* At least **75% operating-cost recovery during the first year**.
* Full recovery of electricity, maintenance, networking and payment-processing costs by **year two**.
* Positive annual operating cash flow by **year three**.
* A projected capital payback period of approximately **8–10 years**.
* A reduction of at least **35% in public subsidy per delivered kWh between year one and year two**.
* At least **20% lower charging costs for regular users compared with consistent reliance on commercial DC fast charging**.
* A positive municipal return over a **15–20-year operating period**.

Federal and provincial infrastructure funding should be used to reduce the city’s initial capital contribution and accelerate expansion.

## Expansion triggers

The site should expand from six ports to 10–12 Level 2 ports when:

* Average port occupancy exceeds **40% for three consecutive months**.
* Evening occupancy exceeds **70% on at least 10 days per month**.
* Monthly active users exceed **275**.
* More than **10% of sessions involve a wait or unavailable charger**.
* Charger uptime remains above **98%**.
* Electricity demand can be accommodated through load management or a service upgrade.

Two DC fast-charging ports should be added when:

* Level 2 occupancy remains above **45% for six consecutive months**.
* Monthly active users exceed **400**.
* Demand from taxis, delivery drivers, ride-hailing vehicles and residents requiring shorter sessions is demonstrated.
* The fast-charging ports are projected to complete at least **10 sessions per day each**.
* The expanded site is projected to maintain positive operating cash flow.

## Implementation priorities

The city should proceed with:

1. A Toronto Hydro capacity and connection assessment.
2. Identification of a suitable Green P, Toronto Community Housing or municipal parking location.
3. A resident outreach and early-registration campaign.
4. Vendor procurement for six networked Level 2 chargers.
5. Installation of load-management, payment and usage-monitoring systems.
6. Launch of a discounted overnight charging program.
7. Quarterly reporting on utilization, user adoption, emissions impact and financial performance.

## Final recommendation

North St. James Town should be selected for the first shared residential EV-charging pilot.

Its exceptionally high population density, large apartment population, limited private charging access and compact geography create the conditions for strong utilization and measurable public value. A six-port Level 2 pilot can serve immediate community needs while creating a scalable foundation for a larger charging network.

With a target of **600 registered users, 4,000 annual sessions, 35–40% first-year occupancy, 100–140 MWh of electricity delivered and up to 160 tonnes of annual emissions reductions**, the project has the potential to become a high-impact model for equitable EV infrastructure across Toronto.`;

export function matchesEvChargingDemoPrompt(question: string): boolean {
  return question.trim() === EV_CHARGING_DEMO_PROMPT;
}

/** The marker label is the annotation, so the map renders only one point. */
export function buildEvChargingDemoMapActions(durationMs: number): MapAction[] {
  return [
    { type: "clear_map_overlays", what: "all" },
    {
      type: "fly_to_center",
      center: EV_CHARGING_DEMO_CENTER,
      zoom: EV_CHARGING_DEMO_BASE_ZOOM,
      durationMs: Math.max(0, Math.min(10_000, Math.round(durationMs))),
    },
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
  ];
}
