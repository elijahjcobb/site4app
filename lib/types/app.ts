import type { Meta } from "@/db"

export interface AppleAppResponse {
  resultCount: number
  results: AppleApp[]
}

export interface AppleApp {
  features: string[]
  isGameCenterEnabled: boolean
  supportedDevices: string[]
  screenshotUrls: string[]
  ipadScreenshotUrls: string[]
  appletvScreenshotUrls: any[]
  artworkUrl60: string
  artworkUrl512: string
  artworkUrl100: string
  artistViewUrl: string
  advisories: string[]
  kind: string
  releaseNotes: string
  genreIds: string[]
  description: string
  trackId: number
  trackName: string
  currency: string
  sellerName: string
  isVppDeviceBasedLicensingEnabled: boolean
  bundleId: string
  releaseDate: string
  currentVersionReleaseDate: string
  minimumOsVersion: string
  trackCensoredName: string
  languageCodesISO2A: string[]
  fileSizeBytes: string
  sellerUrl: string
  formattedPrice: string
  contentAdvisoryRating: string
  averageUserRatingForCurrentVersion: number
  userRatingCountForCurrentVersion: number
  averageUserRating: number
  trackViewUrl: string
  trackContentRating: string
  primaryGenreName: string
  primaryGenreId: number
  artistId: number
  artistName: string
  genres: string[]
  price: number
  version: string
  wrapperType: string
  userRatingCount: number
}

export function appleAppToAppMeta(app: AppleApp, id: string): Meta {
  return {
    id,
    apple_id: `${app.trackId}`,
    developer_id: `${app.artistId}`,
    name: app.trackName,
    developer: app.artistName,
    version: app.version,
    description: app.description,
    icon: app.artworkUrl512,
    icon_small: app.artworkUrl100,
    screenshots: app.screenshotUrls,
    genre: app.primaryGenreName,
    release_date: new Date(app.releaseDate),
    currency: app.currency,
    formatted_price: app.formattedPrice,
    price: app.price,
    rating: app.averageUserRating,
    rating_count: app.userRatingCount,
    age_restriction: app.contentAdvisoryRating,
    created_at: new Date(),
    updated_at: new Date(),
  }
}
