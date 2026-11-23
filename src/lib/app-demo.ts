import stripedKnit from "@/assets/pieces/striped-knit.jpg";
import knitSweater from "@/assets/pieces/knit-sweater.jpg";
import darkJeans from "@/assets/pieces/dark-jeans.jpg";
import scarfImg from "@/assets/pieces/scarf.jpg";
import look1 from "@/assets/looks/striped-easy.jpg";
import look2 from "@/assets/looks/cozy-day.jpg";

/** A small slice of the real "$100 Capsule" app, used as a free try-it preview. */
export type PieceStatus = "" | "own" | "buy";

export type DemoPiece = { id: string; name: string; price: number; note: string; img: string };
export type DemoLook = { id: string; name: string; number: string; pieceIds: string[]; img: string };

export const DEMO_BUDGET = 100;

export const demoPieces: DemoPiece[] = [
  { id: "striped-knit", name: "Striped knit", price: 6, note: "Adds interest to neutrals", img: stripedKnit },
  { id: "knit-sweater", name: "Knit sweater", price: 10, note: "Warmth and a polished look", img: knitSweater },
  { id: "dark-jeans", name: "Dark jeans", price: 14, note: "The everyday foundation", img: darkJeans },
  { id: "scarf", name: "Scarf", price: 3, note: "Color, warmth, polish", img: scarfImg },
];

export const demoLooks: DemoLook[] = [
  { id: "striped-easy", name: "Striped and easy", number: "01", pieceIds: ["striped-knit", "dark-jeans"], img: look1 },
  { id: "cozy-day", name: "Cozy day", number: "02", pieceIds: ["knit-sweater", "dark-jeans", "scarf"], img: look2 },
];

export type DemoState = Record<string, PieceStatus>;

/** Tap once: own it. Twice: will buy. Third tap clears. */
export function nextStatus(current: PieceStatus): PieceStatus {
  if (current === "") return "own";
  if (current === "own") return "buy";
  return "";
}

export function hasPiece(state: DemoState, id: string): boolean {
  const s = state[id] ?? "";
  return s === "own" || s === "buy";
}

/** Owned pieces cost $0; only "will buy" pieces count against the budget. */
export function spent(state: DemoState, pieces: DemoPiece[] = demoPieces): number {
  return pieces.reduce((sum, p) => (state[p.id] === "buy" ? sum + p.price : sum), 0);
}

export function missingPieces(state: DemoState, look: DemoLook): string[] {
  return look.pieceIds.filter((id) => !hasPiece(state, id));
}

export function isLookReady(state: DemoState, look: DemoLook): boolean {
  return missingPieces(state, look).length === 0;
}
