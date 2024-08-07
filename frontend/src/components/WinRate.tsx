'use client'
import { useState } from "react";

export default function WinRatePage ({home, dict}:{home: Home, dict: any}) {
    const [totalMatch, setTotalMatch] = useState(0);
    const [totalWinrate, setTotalWinrate] = useState(0);
    const [targetWinrate, setTargetWinrate] = useState(0);
    const [targetWinrate2, setTargetWinrate2] = useState(0);
    const [result, setResult] = useState(0);
    const calculateWinrate = () => {
        const res = rumus(totalMatch, totalWinrate, targetWinrate);
        setResult(res);
        setTargetWinrate2(targetWinrate);
    }

    function rumus(tMatch: number, tWr: number, wrReq: number) {
        let tWin = tMatch * (tWr / 100);
        let tLose = tMatch - tWin;
        let sisaWr = 100 - wrReq;
        let wrResult = 100 / sisaWr;
        let seratusPersen = tLose * wrResult;
        let final = seratusPersen - tMatch;
        return Math.round(final);
      }

      return (
        <div className="mx-auto w-full max-w-xl space-y-8 px-4 pb-48 pt-24">
                <div>
                    <a href="">
                        <img className="mx-auto h-32 w-auto" src={home.url_logo} alt="" />
                    </a>
                    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                        {dict.calcwr} Win Rate
                    </h2>
                    <p className="mt-2 text-center text-sm text-foreground">
                        {dict.calcwr2}
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="space-y-6 rounded-md shadow-sm">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="total-match" className="block text-xs font-medium text-foreground">{dict.calcwr3}</label>
                            <div className="flex flex-col items-start">
                                <input type="number" placeholder={`${dict.calcwr4}: 223`} required onChange={(e) => setTotalMatch(parseInt(e.target.value))} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="total-match" className="block text-xs font-medium text-foreground">{dict.calcwr5}</label>
                            <div className="flex flex-col items-start">
                                <input type="number" placeholder={`${dict.calcwr4}: 43`} required onChange={(e) => setTotalWinrate(parseInt(e.target.value))} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="total-match" className="block text-xs font-medium text-foreground">{dict.calcwr6}</label>
                            <div className="flex flex-col items-start">
                                <input type="number" placeholder={`${dict.calcwr4}: 89`} required onChange={(e) => setTargetWinrate(parseInt(e.target.value))} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <button onClick={calculateWinrate} className="items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 group relative flex w-full">
                            {dict.calcwr7}
                        </button>
                    </div>
                        {result !== 0 &&(
                            <div className="rounded-md border border-transparent bg-muted p-4 text-center text-sm font-semibold uppercase ring-1 ring-primary">
                                You need about <strong className="text-primary">{result} Win without Lose</strong> to get a <strong className="text-primary">{targetWinrate2}% Win Rate</strong>
                            </div>
                        )}
                </div>
            </div>
      )
}