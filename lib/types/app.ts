import type { Database } from "#/db/types";

export interface AppleAppResponse {
  resultCount: number;
  results: AppleApp[];
}

export interface AppleApp {
  features: string[];
  isGameCenterEnabled: boolean;
  supportedDevices: string[];
  screenshotUrls: string[];
  ipadScreenshotUrls: string[];
  appletvScreenshotUrls: any[];
  artworkUrl60: string;
  artworkUrl512: string;
  artworkUrl100: string;
  artistViewUrl: string;
  advisories: string[];
  kind: string;
  releaseNotes: string;
  genreIds: string[];
  description: string;
  trackId: number;
  trackName: string;
  currency: string;
  sellerName: string;
  isVppDeviceBasedLicensingEnabled: boolean;
  bundleId: string;
  releaseDate: string;
  currentVersionReleaseDate: string;
  minimumOsVersion: string;
  trackCensoredName: string;
  languageCodesISO2A: string[];
  fileSizeBytes: string;
  sellerUrl: string;
  formattedPrice: string;
  contentAdvisoryRating: string;
  averageUserRatingForCurrentVersion: number;
  userRatingCountForCurrentVersion: number;
  averageUserRating: number;
  trackViewUrl: string;
  trackContentRating: string;
  primaryGenreName: string;
  primaryGenreId: number;
  artistId: number;
  artistName: string;
  genres: string[];
  price: number;
  version: string;
  wrapperType: string;
  userRatingCount: number;
}

export type App = Database["public"]["Tables"]["app"]["Row"];

export function appleAppToApp(
  app: AppleApp,
  owner_id: string,
  slug: string
): Database["public"]["Tables"]["app"]["Insert"] {
  return {
    owner_id,
    slug,
    app_id: `${app.trackId}`,
    developer_id: `${app.artistId}`,
    name: app.trackName,
    developer: app.artistName,
    version: app.version,
    description: app.description,
    icon: app.artworkUrl512,
    icon_small: app.artworkUrl100,
    screenshots: app.screenshotUrls,
    genre: app.primaryGenreName,
    release_date: app.releaseDate,
    currency: app.currency,
    formatted_price: app.formattedPrice,
    price: app.price,
    rating: app.averageUserRating,
    rating_count: app.userRatingCount,
    age_restriction: app.contentAdvisoryRating,
  };
}
