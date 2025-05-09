import { DuneClient } from '@duneanalytics/client-sdk';
import { NextResponse } from 'next/server';

const dune = new DuneClient(process.env.DUNE_API_KEY!);

type DuneRow = {
  total_addresses: number | string;
  datil_tv_floor_price: number | string;
  datil_tv: number | string;
};
// Single query ID
const QUERY_ID = 4185193;

// Define the mapping from Dune column names to your desired variable names
const fieldMapping = {
  total_addresses: 'totalDataPoints',
  datil_tv_floor_price: 'totalVolume',
  datil_tv: 'totalValue',
};

// Function to format numbers to millions with M+ suffix
const formatToMillions = (value: number): string => {
  if (value >= 1000000) {
    // Convert to millions and round to integer
    const millions = Math.floor(value / 1000000);
    return `${millions}M+`;
  }
  // Handle smaller numbers
  return value.toLocaleString();
};

export async function GET(request: Request) {
  try {
    // Check for debug parameter
    const url = new URL(request.url);
    const debug = url.searchParams.get('debug') === 'true';

    // Get the latest result from the query
    const result = await dune.getLatestResult({ queryId: QUERY_ID });

    // Check if result or result.result is undefined
    if (!result || !result.result || !result.result.rows) {
      console.warn('Dune result was empty or malformed:', result);

      return NextResponse.json({
        totalValue: '$50M+',
        totalVolume: '$154M+',
        totalDataPoints: '1M+',
        status: 'fallback',
      });
    }

    // Extract the rows from the result
    const rows = result.result?.rows as DuneRow[] | undefined;

    if (!rows || rows.length === 0) {
      console.warn('Dune result was empty or malformed:', result);

      return NextResponse.json({
        totalValue: '$50M+',
        totalVolume: '$154M+',
        totalDataPoints: '1M+',
        status: 'fallback',
      });
    }

    // Since we know we have a single row with multiple columns, get the first row
    const row = rows[0];

    // Initialize our response object with the mapped fields
    const rawMetrics: Record<string, number | null> = {};
    const formattedMetrics: Record<string, string> = {};

    // Map each field according to our mapping
    Object.entries(fieldMapping).forEach(([duneField, targetField]) => {
      let value = null;

      if (duneField in row) {
        const rawValue = row[duneField as keyof DuneRow];
        if (typeof rawValue === 'number') {
          value = rawValue;
        } else if (typeof rawValue === 'string' && !isNaN(Number(rawValue))) {
          value = Number(rawValue);
        }
      }

      rawMetrics[targetField] = value;

      // Format the value for display with M+ suffix
      if (value !== null) {
        // Add $ prefix for value and volume fields
        if (targetField === 'totalValue' || targetField === 'totalVolume') {
          formattedMetrics[targetField] = '$' + formatToMillions(value);
        } else {
          formattedMetrics[targetField] = formatToMillions(value);
        }
      } else {
        // Default values if null
        formattedMetrics[targetField] =
          targetField === 'totalDataPoints' ? '0M+' : '$0M+';
      }
    });

    // Add debug information if requested
    if (debug) {
      return NextResponse.json({
        formatted: formattedMetrics,
        raw: rawMetrics,
        originalRow: row,
      });
    }

    // Return the formatted metrics for display
    return NextResponse.json(formattedMetrics);
  } catch (err) {
    console.error('Dune API error:', err);
    // Return default values in case of error
    return NextResponse.json({
      totalValue: '$50M+',
      totalVolume: '$154M+',
      totalDataPoints: '1M+',
    });
  }
}
