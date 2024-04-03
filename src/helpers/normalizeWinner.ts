export default function normalizeWinner(winner: string) {
  switch (winner) {
    case "Home":
      return "HOME_TEAM";
      break;
    case "Away":
      return "AWAY_TEAM";
      break;
    case "Draw":
      return "DRAW";
      break;
    default:
      null;
  }
}
