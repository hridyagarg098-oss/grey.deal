import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // use service key for inserts
)

// This runs after Apify finishes a scrape.
// Apify calls this as a webhook, or you run it manually.
export async function syncApifyResults(apifyDataset: any[]) {
  const mapped = apifyDataset
    .filter(item => item.price && item.city) // skip incomplete rows
    .map(item => ({
      city: normalizeCity(item.city),
      locality: item.locality || item.area || '',
      property_name: item.projectName || item.title || null,
      builder: item.builder || item.developer || null,
      bhk: parseInt(item.bedrooms) || null,
      area_sqft: parseInt(item.areaMin) || null,
      price: parsePrice(item.price),
      price_per_sqft: item.pricePerSqft ? parseInt(item.pricePerSqft) : null,
      property_type: 'apartment',
      purpose: item.listingType === 'rent' ? 'rent' : 'buy',
      listing_url: item.url || null,
      images: item.images || [],
      source: 'apify_99acres',
      source_id: item.id || null,
      is_verified: false,
    }))

  // Upsert — update if source_id already exists, insert if new
  const { error } = await supabase
    .from('properties')
    .upsert(mapped, { onConflict: 'source_id' })

  if (error) console.error('Sync error:', error)
  else console.log(`Synced ${mapped.length} listings`)
}

// Helper: parse "₹ 75.5 L" → 7550000
function parsePrice(raw: string): number | null {
  if (!raw) return null
  const cleaned = raw.replace(/[₹,\s]/g, '').toLowerCase()

  if (cleaned.includes('cr')) {
    return Math.round(parseFloat(cleaned) * 10_000_000)
  }
  if (cleaned.includes('l')) {
    return Math.round(parseFloat(cleaned) * 100_000)
  }
  return parseInt(cleaned) || null
}

// Helper: normalize city names
function normalizeCity(raw: string): string {
  const map: Record<string, string> = {
    bengaluru: 'Bangalore',
    bangalore: 'Bangalore',
    mumbai: 'Mumbai',
    'delhi ncr': 'Delhi',
    delhi: 'Delhi',
    gurugram: 'Gurgaon',
    gurgaon: 'Gurgaon',
    hyderabad: 'Hyderabad',
    pune: 'Pune',
    chennai: 'Chennai',
  }
  const lower = raw.toLowerCase().trim()
  return map[lower] || raw.trim()
}
