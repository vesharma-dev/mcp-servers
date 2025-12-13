import type { State } from "../types/geo.types.js";
import type {
  AlertsResponse,
  PointsResponse,
  ForecastResponse,
  ForecastPeriod,
} from "../types/weather.types.js";
import { formatAlert, makeNWSRequest } from "../helpers/weather.helpers.js";
import { NWS_API_BASE } from "../constants/config.constants.js";

type ToolTextContent = {
  [x: string]: unknown;
  type: "text";
  text: string;
};

export interface AlertsToolResult {
  [x: string]: unknown;
  content: ToolTextContent[];
  isError?: boolean;
}

export interface ForecastToolResult {
  [x: string]: unknown;
  content: ToolTextContent[];
  isError?: boolean;
}

// Get weather alerts for a state
export async function getAlerts(state: State): Promise<AlertsToolResult> {
  const stateCode = state.toUpperCase();
  const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
  const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

  if (!alertsData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve alerts data",
        },
      ],
      isError: true,
    };
  }

  const features = alertsData.features || [];
  if (features.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No active alerts for ${stateCode}`,
        },
      ],
    };
  }

  const formattedAlerts = features.map(formatAlert);
  const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join(
    "\n"
  )}`;

  return {
    content: [
      {
        type: "text",
        text: alertsText,
      },
    ],
  };
}

// Get weather forecast for a location
export async function getForecast(
  latitude: number,
  longitude: number
): Promise<ForecastToolResult> {
  // Get grid point data
  const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(
    4
  )},${longitude.toFixed(4)}`;
  const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

  if (!pointsData) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
        },
      ],
      isError: true,
    };
  }

  const forecastUrl = pointsData.properties?.forecast;
  if (!forecastUrl) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to get forecast URL from grid point data",
        },
      ],
      isError: true,
    };
  }

  // Get forecast data
  const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
  if (!forecastData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve forecast data",
        },
      ],
      isError: true,
    };
  }

  const periods = forecastData.properties?.periods || [];
  if (periods.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "No forecast periods available",
        },
      ],
    };
  }

  // Format forecast periods
  const formattedForecast = periods.map((period: ForecastPeriod) =>
    [
      `${period.name || "Unknown"}:`,
      `Temperature: ${period.temperature || "Unknown"}°${
        period.temperatureUnit || "F"
      }`,
      `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
      `${period.shortForecast || "No forecast available"}`,
      "---",
    ].join("\n")
  );

  const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join(
    "\n"
  )}`;

  return {
    content: [
      {
        type: "text",
        text: forecastText,
      },
    ],
  };
}
