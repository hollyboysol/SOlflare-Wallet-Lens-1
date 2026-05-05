const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.eitherway.ai';

export const DIALECT_PROXY = `${API_BASE_URL}/api/dialect`;
export const SOLANA_RPC_PROXY = `${API_BASE_URL}/api/solana/rpc`;
export const PROXY_API = (url) => `${API_BASE_URL}/api/proxy-api?url=${encodeURIComponent(url)}`;
export const HELIUS_RPC_URL = import.meta.env.VITE_HELIUS_RPC_URL || `${API_BASE_URL}/api/solana/rpc/mainnet`;

// Get Helius API key from RPC URL
export const getHeliusApiKey = () => {
  const url = import.meta.env.VITE_HELIUS_RPC_URL || '';
  const match = url.match(/api-key=([^&]+)/) || url.match(/\/([a-f0-9-]{36})\/?$/);
  return match ? match[1] : null;
};

export const TOKEN_MINTS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  JitoSOL: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
  JTO: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
};

export const TOKEN_ICONS = {
  SOL: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  USDC: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  USDT: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  JUP: 'https://static.jup.ag/jup/icon.png',
  BONK: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
  JitoSOL: 'https://storage.googleapis.com/token-metadata/JitoSOL-256.png',
  WIF: 'https://coin-images.coingecko.com/coins/images/33566/small/dogwifhat.jpg',
  RAY: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
  mSOL: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
  bSOL: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png',
  JTO: 'https://storage.googleapis.com/token-metadata/JitoSOL-256.png',
};

export const TX_CATEGORIES = {
  all: { label: 'All', bg: 'bg-brand-dark text-brand-muted border-brand-border' },
  swap: { label: 'Swap', color: '#60a5fa', bg: 'bg-blue-900/30 text-blue-300 border-blue-800/30' },
  transfer: { label: 'Transfer', color: '#60a5fa', bg: 'bg-blue-900/30 text-blue-300 border-blue-800/30' },
  stake: { label: 'Stake', color: '#a78bfa', bg: 'bg-purple-900/30 text-purple-300 border-purple-800/30' },
  nft: { label: 'NFT', color: '#f472b6', bg: 'bg-pink-900/30 text-pink-300 border-pink-800/30' },
  defi: { label: 'DeFi', color: '#34d399', bg: 'bg-green-900/30 text-green-300 border-green-800/30' },
  unknown: { label: 'Other', color: '#9ca3af', bg: 'bg-gray-900/30 text-gray-300 border-gray-800/30' },
};
