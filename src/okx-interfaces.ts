export interface OKXTickerResponse {
  code: string;
  msg: string;
  data: Array<{
    instId: string;
    last: string;
    askPx: string;
    bidPx: string;
    open24h: string;
    high24h: string;
    low24h: string;
    volCcy24h: string;
    vol24h: string;
    ts: string;
  }>;
}

export interface OKXCandlestickResponse {
  code: string;
  msg: string;
  data: Array<{
    time: string;
    open: string;
    high: string;
    low: string;
    close: string;
    vol: string;
    volCcy: string;
  }>;
}