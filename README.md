# Recycling Monitor

An interactive 3D globe visualising municipal waste recycling rates across 32 countries, built with React, Three.js and [react-globe.gl](https://github.com/vasturiano/react-globe.gl).

![recycling globe](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemNhdHBzYzhxN3VyNDN3cDQ5M282bmh0anN1ajl3Y2dnbDAxcHAzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OcdBzXdTXBoAXWzV7N/giphy.gif)

## What you're looking at

### The globe points

Each dot represents a country. Its size and colour reflect the national municipal waste recycling rate:

| Colour       | Rate   |
| ------------ | ------ |
| Green        | ≥ 50%  |
| Yellow-green | 35–50% |
| Yellow       | 20–35% |
| Orange       | 10–20% |
| Red          | < 10%  |

### What about the arcs you say?

The animated arcs show cross-border waste shipments between European countries, derived from Eurostat bilateral shipment statistics. Arc thickness scales with estimated volume (thousand tonnes). Each arc is coloured by how the receiving country treats the waste:

| Colour | Treatment                                                             |
| ------ | --------------------------------------------------------------------- |
| Green  | Recovery — recycling or energy recovery (R-codes)                     |
| Red    | Disposal — landfill or incineration without energy recovery (D-codes) |
| Amber  | Mixed or unknown treatment                                            |

Germany and the Netherlands are the largest recovery hubs; Luxembourg ships the most waste per capita (≈ 625 kg/cap). Nordic countries exchange significant volumes for energy recovery, while some Central/Eastern European flows go to German and Austrian facilities for material recovery.

## Getting started

```bash
npm i
npm run dev
```

## License

Licensed under MIT
