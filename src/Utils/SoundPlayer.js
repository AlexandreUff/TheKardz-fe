import WinnerURL from "../sounds/Winner.mp3"
import LoserURL from "../sounds/Loser.mp3"
import DropCardsURL from "../sounds/Drop_Cards.mp3"
import TimerReadURL from "../sounds/Timer_Read.mp3"
import TimerRoundURL from "../sounds/Timer_Round.mp3"
import TurnCardsURL from "../sounds/Turn_Cards.mp3"
class SoundPlayer {
    static Winner = new Audio(WinnerURL)
    static Loser = new Audio(LoserURL)
    static DropCards = new Audio(DropCardsURL)
    static TimerRead = new Audio(TimerReadURL)
    static TimerRound = new Audio(TimerRoundURL)
    static TurnCards = new Audio(TurnCardsURL)
}

export default SoundPlayer