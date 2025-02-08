export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-25'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skikP2QXc2zRjD9S2mObHvSwUhCWRP9whUWcbkdQONyKb6z9Nwge5f9T011t39O9YEVNhQ0Di2MVoto5MBC5Q9xs6spKGmgM8SlmfhXamyUfNc9oHkfYOYsM3GhokEwKsalwMG1odFf7MaOJ8p2SlhDHaLgIc75gKVIteFvYhvWOYYQTtBsd",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
