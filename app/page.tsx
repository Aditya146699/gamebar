import Link from "next/link";
export default function Home() {
  return (
  <div className="flex items-center p-2 flex-wrap justify-center">

<Link href="/game1">
<div className="flex flex-col items-center p-2">
<img src="game1.png" alt="" className="w-60"/>
Tic-Tac-Toe
</div>
</Link>

<Link href="/game2">
<div className="flex flex-col items-center p-2">
<img src="game2.png" alt="" className="w-60 h-60"/>
Memory Cards
</div>
</Link>

<Link href="/game3">
<div className="flex flex-col items-center p-2">
<img src="game3.png" alt="" className="w-60 h-60"/>
Hangman
</div>
</Link>

<Link href="/game4">
<div className="flex flex-col items-center p-2">
<img src="game4.png" alt="" className="w-60 h-60"/>
Rock Paper Scissors</div>
</Link>

<Link href="/game5">
<div className="flex flex-col items-center p-2">
<img src="game5.png" alt="" className="w-60 h-60"/>
Connect 4
</div>
</Link>


   </div>
  );
}
