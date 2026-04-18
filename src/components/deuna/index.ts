/**
 * Deuna Negocios component library — organized following Atomic Design.
 *
 *   atoms/      → AmountText · Avatar · Badge · BusinessMascot · Button
 *                 Divider · Emoji · IconButton · Input · PercentPill
 *                 ProgressBar · SpinnerRing
 *   molecules/  → CampaignTypeCard · Card · PeopleStack · StatsChart
 *   organisms/  → BusinessHeader · PopupModal
 *
 * Edit a token in `globals.css` to change branding globally, an atom to
 * change a primitive (button, chip, mascot…), a molecule for composition,
 * or an organism for screen-level layout. Nothing cross-depends sideways.
 */

export * from "./atoms";
export * from "./molecules";
export * from "./organisms";
