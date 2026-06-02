import { redirect } from 'next/navigation';

// The trust model is now folded into the white paper (§6, The architecture).
export default function HowItWorksRedirect() {
  redirect('/stablecoins#sec-architecture');
}
